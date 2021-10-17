import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from 'src/app/app.module';
import { AutoClockComponent } from './auto-clock/auto-clock.component';
import { StartPauseCalculationComponent } from './start-pause-calculation/start-pause-calculation.component';
import { StartStopCalculationComponent } from './start-stop-calculation/start-stop-calculation.component';
import { TotalTimeChooserComponent } from './total-time-chooser/total-time-chooser.component';
import { RouterModule } from '@angular/router';
import { routes } from './main-module.routes';
import { DurationToStringPipe } from 'src/app/pipes/duration-to-string';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [
    MainComponent,
    AutoClockComponent,
    StartPauseCalculationComponent,
    StartStopCalculationComponent,
    TotalTimeChooserComponent,
    DurationToStringPipe
  ],
  imports: [
    CommonModule,
    ...materialImports,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
