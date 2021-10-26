import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from 'src/app/app.module';
import { WeekTimesComponent } from './week-times/week-times.component';
import { RouterModule } from '@angular/router';
import { routes } from './weekly.routes';
import { WeekPickerComponent } from './week-picker/week-picker.component';



@NgModule({
  declarations: [WeekTimesComponent, WeekPickerComponent],
  imports: [
    CommonModule,
    materialImports,
    RouterModule.forChild(routes)
  ]
})
export class WeeklyModule { }
