import {  NgModule } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { StartPauseCalculationComponent } from './start-pause-calculation/start-pause-calculation.component';
import { StartStopCalculationComponent } from './start-stop-calculation/start-stop-calculation.component';
import { AutoClockComponent } from './auto-clock/auto-clock.component';

export const routes: Routes = [
    {
        path: '',
        component: StartStopCalculationComponent
    },
    {
        path: 'auto',
        component: AutoClockComponent
    },
    {
        path: 'pause',
        component: StartPauseCalculationComponent
    }
];