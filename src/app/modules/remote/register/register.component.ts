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

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {
  }

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

    this.userService.registerNewUser(this.formGroup.get('username').value, this.formGroup.get('password').value)
      .subscribe(() => {
        this.router.navigateByUrl('remote/login');
      }, (error: HttpErrorResponse) => {
        if (error.status === 409) {
          const formSub = this.dialog.open(UsernameTakenComponent, {
            data: { username: this.formGroup.get('username').value }
          }).afterClosed().subscribe(() => {

            for (const p in this.formGroup.controls) {
              if (this.formGroup.controls.hasOwnProperty(p))
                this.formGroup.controls[p].setValue('');
            }
          });
        }
      });
  }

  getError(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      return 'Il faut y mettre une valeur';
    }

    if (formControl.hasError('minlength')) {
      return 'Un minimum de ' + formControl.errors.minlength.requiredLength + ' charactère(s) est requis';
    }

    return '';
  }
}

@Component({
  template: `
    <h4 mat-dialog-title>
      Error
    </h4>
    <mat-dialog-content>Le nom d'utilisateur {{ data.username }} est déjà utilisé!</mat-dialog-content>
    <mat-dialog-actions>
      <button flex mat-raised-button color="primary" (click)="dialogRef.close()">Ok</button>
    </mat-dialog-actions>
  `
})
export class UsernameTakenComponent {
  username: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { username: string },
              public dialogRef: MatDialogRef<UsernameTakenComponent>) {
  }
}
