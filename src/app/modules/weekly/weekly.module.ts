import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from 'src/app/app.module';
import { WeekTimesComponent } from './week-times/week-times.component';
import { RouterModule } from '@angular/router';
import { routes } from './weekly.routes';
import { WeekPickerComponent } from './week-picker/week-picker.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [WeekTimesComponent, WeekPickerComponent],
  imports: [
    CommonModule,
    materialImports,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class WeeklyModule { }
