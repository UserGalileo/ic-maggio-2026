import { Routes } from '@angular/router';
import { First } from './components/first-component';
import { Sum } from './components/sum';

export const routes: Routes = [
  { path: 'first', component: First },
  {
    path: 'second',
    loadComponent: () => import('./components/second-component'),
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes'),
  },
  { path: '', component: Sum },
  { path: '**', redirectTo: '/first' },
];
