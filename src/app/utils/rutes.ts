import { title } from 'process';
import { LoginComponent } from '../modules/auth/pages/login/login.component';
import { RestorePasswordComponent } from '../modules/auth/pages/restore-password/restore-password.component';
import { UsersComponent } from '../modules/dashboard/pages/users/users.component';
import { WorkersComponent } from '../modules/dashboard/pages/workers/workers.component';

export const routes = {
  auth: [{ path: 'login', component: LoginComponent, title: 'Login' }],
  dashboard: [
    // { path: '', component: HomeDashboard },
    {
      path: 'workers',
      component: WorkersComponent,
      title: 'Operarios',
    },
    {
      path: 'users',
      component: UsersComponent,
      title: 'Usuarios',
    },
  ],
};
