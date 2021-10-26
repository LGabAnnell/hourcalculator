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
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app-routes';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { autoClockReducer, manualReducer, simpleDateReducer, startPauseReducer, totalTimeReducer, userReducer } from './store/reducers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MomentToStringPipe } from './pipes/moment-to-string.pipe';
import { MatSortModule } from '@angular/material/sort';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

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
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatBottomSheetModule
];

@NgModule({
  declarations: [
    AppComponent,
    BottomNavigationComponent,
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
      userChange,
      simpleDateChange: simpleDateReducer,
      startPause: startPauseReducer
    }),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
