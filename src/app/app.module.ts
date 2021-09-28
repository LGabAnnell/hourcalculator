import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDatepickerModule,  } from '@angular/material/datepicker'
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartStopCalculationComponent } from './start-stop-calculation/start-stop-calculation.component';
import { StartPauseCalculationComponent } from './start-pause-calculation/start-pause-calculation.component';
import { AutoClockComponent } from './auto-clock/auto-clock.component';
import { routes } from './app-routes';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { autoClockReducer, manualReducer, totalTimeReducer } from './store/reducers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TotalTimeChooserComponent } from './total-time-chooser/total-time-chooser.component';

export const autoClocks = autoClockReducer
export const manualClocks = manualReducer
export const timeChange = totalTimeReducer

@NgModule({
  declarations: [
    AppComponent,
    StartStopCalculationComponent,
    StartPauseCalculationComponent,
    AutoClockComponent,
    TotalTimeChooserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    StoreModule.forRoot({
      autoClocks,
      manualClocks,
      timeChange
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ch-FR' },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY'
      }
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
