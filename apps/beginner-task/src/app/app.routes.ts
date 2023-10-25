import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('@users/feature-users-list').then(c => c.UsersListComponent)
  }
];
