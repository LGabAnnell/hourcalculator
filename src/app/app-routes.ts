import { Routes } from '@angular/router';
import { AuthGuardService } from './modules/remote/services/authguard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'remote',
    loadChildren: () => import('./modules/remote/remote.module').then(m => m.RemoteModule)
  },
  {
    path: 'week',
    loadChildren: () => import('./modules/weekly/weekly.module').then(m => m.WeeklyModule),
    canActivate: [AuthGuardService]
  }
];
