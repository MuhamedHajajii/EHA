import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/pages/blank-layout/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/auth/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../app/core/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
