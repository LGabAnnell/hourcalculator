import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from 'src/app/app.module';
import { StartPauseCalculationComponent } from './start-pause-calculation/start-pause-calculation.component';
import { TotalTimeChooserComponent } from './total-time-chooser/total-time-chooser.component';
import { RouterModule } from '@angular/router';
import { routes } from './main-module.routes';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { BadgeClockComponent } from './badge-clock/badge-clock.component';



@NgModule({
  declarations: [
    MainComponent,
    StartPauseCalculationComponent,
    TotalTimeChooserComponent,
    BadgeClockComponent,
  ],
  imports: [
    CommonModule,
    ...materialImports,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MainModule { }
