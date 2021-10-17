import { Route } from "@angular/router";
import { AutoClockComponent } from "./auto-clock/auto-clock.component";
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
      }
    ]
  }
]