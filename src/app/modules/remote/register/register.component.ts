import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  userAlreadyExists: boolean = false;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  submit(): void {
    this.userAlreadyExists = false;
    this.formGroup.updateValueAndValidity({ onlySelf: false })
    if (!this.formGroup.valid) {
      return;
    }

    const subscription = this.userService.registerNewUser(this.formGroup.get('username').value, this.formGroup.get('password').value)
      .subscribe(() => {
        this.router.navigateByUrl('remote/login');
      }, (error: HttpErrorResponse) => {
        subscription?.unsubscribe();
        if (error.status === 409) {
          const formSub = this.dialog.open(UsernameTakenComponent, {
            data: { username: this.formGroup.get('username').value }
          }).afterClosed().pipe(finalize(() => { formSub?.unsubscribe(); })).subscribe(() => {
            for (let p in this.formGroup.controls) {
              this.formGroup.controls[p].setValue('');
            }
          });
        }
      }, () => {
        subscription?.unsubscribe()
      });
  }

  getError(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      return 'Field is required';
    }

    if (formControl.hasError('minlength')) {
      return 'A minimum length of ' + formControl.errors.minlength.requiredLength + ' is required';
    }

    return '';
  }
}

@Component({
  template: `
  <h4 mat-dialog-title>
    Error
  </h4>
  <mat-dialog-content>Username {{ data.username }} is already taken!</mat-dialog-content>
  <mat-dialog-actions>
    <button flex mat-raised-button color="primary" (click)="dialogRef.close()">Ok</button>
  </mat-dialog-actions>
`})
export class UsernameTakenComponent {
  username: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { username: string },
    public dialogRef: MatDialogRef<UsernameTakenComponent>) { }
}