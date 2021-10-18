import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteClockComponent } from './remote-clock/remote-clock.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { remoteRoutes } from './remote-routes';
import { materialImports } from 'src/app/app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent, UsernameTakenComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RemoteClockComponent,
    LoginComponent,
    RegisterComponent,
    UsernameTakenComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    ReactiveFormsModule,
    ...materialImports,
    SharedModule,
  ]
})
export class RemoteModule { }
