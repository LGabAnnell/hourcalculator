import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userChange } from 'src/app/store/actions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  @ViewChild('username')
  username: ElementRef<HTMLInputElement>;

  returnUrl: string;
  constructor(private store: Store, private route: ActivatedRoute, private userService: UserService, private router: Router,
    private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.minLength(3)),
      password: new FormControl('')
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {
    setTimeout(() => this.username.nativeElement.click());
  }

  submit() {
    const subscription = this.userService.login(this.formGroup.get('username').value, this.formGroup.get('password').value)
      .subscribe(
        () => {
          this.userService.getUserName().toPromise().then(user => {
            this.store.dispatch(userChange({
              user
            }));
          });
          this.router.navigateByUrl(this.returnUrl); 
        }, 
        () => { 
          subscription?.unsubscribe();
          this.snack.open('Username or password were incorrect', null, {
            duration: 2000
          });
        },
        () => { subscription?.unsubscribe(); });
  }
}
