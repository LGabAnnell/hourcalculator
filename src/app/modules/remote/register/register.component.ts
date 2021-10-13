import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    const subscription = this.userService.registerNewUser(this.formGroup.get('username').value, this.formGroup.get('password').value)
      .subscribe((res) => { 
        console.log(res);
        this.router.navigateByUrl('remote/login'); 
      }, () => { subscription?.unsubscribe() }, () => { subscription?.unsubscribe() });
  }
}
