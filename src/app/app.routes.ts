import { Routes } from '@angular/router';

export const routes: Routes = [
  /** path ==>> ''*/
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      /** path: ''*/
      {
        path: '',

        loadComponent: () =>
          import('../app/pages/blank-layout/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      /** path: about*/
      {
        path: 'about',
        loadComponent: () =>
          import('../app/pages/blank-layout/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
      /** path: news-letters*/
      {
        path: 'news-letters',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/news-letters/news-letters.component'
          ).then((m) => m.NewsLettersComponent),
      },
      /** path: privacy-policy*/
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/privacy-policy/privacy-policy.component'
          ).then((m) => m.PrivacyPolicyComponent),
      },
      /** path: contact-us*/
      {
        path: 'contact-us',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/contact-us/contact-us.component'
          ).then((m) => m.ContactUsComponent),
      },
    ],
  },
  /** path: protocols*/
  {
    path: 'protocols',
    loadComponent: () =>
      import('../app/pages/protocol-layout/protocol-layout.component').then(
        (m) => m.ProtocolLayoutComponent
      ),
    children: [
      /** path ==>> /protocols-categories*/
      {
        path: 'protocols-categories',
        loadComponent: () =>
          import(
            '../app/pages/protocol-layout/protocol-categories/protocol-categories.component'
          ).then((m) => m.ProtocolCategoriesComponent),
      },
      {
        path: 'sub-protocols-categories/:id',
        loadComponent: () =>
          import(
            '../app/pages/protocol-layout/sub-protocols/sub-protocols.component'
          ).then((m) => m.SubProtocolsComponent),
      },
      {
        path: 'questions/:id',
        loadComponent: () =>
          import(
            '../app/pages/protocol-layout/protocol-questions/protocol-questions.component'
          ).then((m) => m.ProtocolQuestionsComponent),
      },
    ],
  },
  /** path: login*/
  {
    path: 'login',
    loadComponent: () =>
      import('../app/auth/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
  },
  /** path: ***/
  {
    path: '**',
    loadComponent: () =>
      import('../app/core/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
