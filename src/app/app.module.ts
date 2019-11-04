import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule, MatInputModule, MatFormFieldModule, MatButtonModule,
MatCardModule, MatIconModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartStopCalculationComponent } from './start-stop-calculation/start-stop-calculation.component';
import { StartPauseCalculationComponent } from './start-pause-calculation/start-pause-calculation.component';
import { AutoClockComponent } from './auto-clock/auto-clock.component';
import { routes } from './app-routes';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AutoReducer, ManualReducer } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    StartStopCalculationComponent,
    StartPauseCalculationComponent,
    AutoClockComponent
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
    StoreModule.forRoot({
      autoClocks: AutoReducer,
      manualClocks: ManualReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
