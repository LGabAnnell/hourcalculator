import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDatepickerModule, } from '@angular/material/datepicker'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app-routes';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { autoClockReducer, manualReducer, totalTimeReducer, userReducer } from './store/reducers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DurationToStringPipe } from './pipes/duration-to-string';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

export const autoClocks = autoClockReducer
export const manualClocks = manualReducer
export const timeChange = totalTimeReducer
export const userChange = userReducer

export const materialImports = [
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
    MatDialogModule,
    MatDividerModule
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialImports,
    StoreModule.forRoot({
      autoClocks,
      manualClocks,
      timeChange,
      userChange
    }),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
