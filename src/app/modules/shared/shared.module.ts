import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateChooserComponent } from './date-chooser/date-chooser.component';
import { materialImports } from 'src/app/app.module';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DurationToStringPipe } from 'src/app/pipes/duration-to-string';
import { MomentToStringPipe } from 'src/app/pipes/moment-to-string.pipe';



@NgModule({
  declarations: [
    DateChooserComponent,
    DurationToStringPipe,
    MomentToStringPipe,
  ],
  imports: [
    CommonModule,
    ...materialImports
  ],
  exports: [
    DateChooserComponent,
    DurationToStringPipe,
    MomentToStringPipe,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ch-FR' },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY'
        }
      }
    }
  ]
})
export class SharedModule { }
