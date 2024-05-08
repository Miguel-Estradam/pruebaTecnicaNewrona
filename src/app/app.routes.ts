import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './modules/auth/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './modules/dashboard/layouts/dashboard-layout/dashboard-layout.component';
import { routes as rutas } from './utils/rutes';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    redirectTo: '/dashboard/' + rutas.dashboard[0].path,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: rutas.auth,
    ...canActivate(() => redirectLoggedInTo(['/dashboard'])),
  },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: rutas.dashboard,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
