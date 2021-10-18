import { Route } from "@angular/router";
import { AuthGuardService } from "../remote/services/authguard.service";
import { AutoClockComponent } from "./auto-clock/auto-clock.component";
import { BadgeClockComponent } from "./badge-clock/badge-clock.component";
import { MainComponent } from "./main.component";
import { StartPauseCalculationComponent } from "./start-pause-calculation/start-pause-calculation.component";
import { StartStopCalculationComponent } from "./start-stop-calculation/start-stop-calculation.component";

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        component: StartStopCalculationComponent
      },
      {
        path: 'pause',
        component: StartPauseCalculationComponent
      },
      {
        path: 'auto',
        component: AutoClockComponent
      },
      {
        path: 'badge',
        component: BadgeClockComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
]