import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.minLength(3)),
      password: new FormControl('')
    });
  }

  submit(): void {
    const subscription = this.userService.login(this.formGroup.get('username').value, this.formGroup.get('password').value)
      .subscribe(
        () => { this.router.navigateByUrl('remote'); }, 
        () => { subscription?.unsubscribe(); },
        () => { subscription?.unsubscribe(); });
  }
}
