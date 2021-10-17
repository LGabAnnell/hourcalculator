import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private store: Store, private userService: UserService, private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.minLength(3)),
      password: new FormControl('')
    });
  }

  submit(): void {
    const subscription = this.userService.login(this.formGroup.get('username').value, this.formGroup.get('password').value)
      .subscribe(
        () => {
          this.userService.getUserName().toPromise().then(user => {
            this.store.dispatch({
              type: 'User changed!',
              user: user
            });
          })
          this.router.navigateByUrl('remote'); 
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
