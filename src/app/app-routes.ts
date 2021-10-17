import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
    },
    {
        path: 'remote',
        loadChildren: () => import('./modules/remote/remote.module').then(m => m.RemoteModule)
    }
];