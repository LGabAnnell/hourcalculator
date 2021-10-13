import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RemoteClockComponent } from "./remote-clock/remote-clock.component";
import { AuthGuardService } from "./services/authguard.service";

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteClockComponent,
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