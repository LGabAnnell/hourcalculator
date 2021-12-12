import { Route } from '@angular/router';
import { AuthGuardService } from '../remote/services/authguard.service';
import { BadgeClockComponent } from './badge-clock/badge-clock.component';
import { MainComponent } from './main.component';
import { StartPauseCalculationComponent } from './start-pause-calculation/start-pause-calculation.component';

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
        component: StartPauseCalculationComponent
      },
      {
        path: 'badge',
        component: BadgeClockComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];
