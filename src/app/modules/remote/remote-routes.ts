import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserInfoComponent } from './user-info/user-info.component.';
import { AuthGuardService } from './services/authguard.service';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: UserInfoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]
