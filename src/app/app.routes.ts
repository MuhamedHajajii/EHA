import { Routes } from '@angular/router';
import { isLoginGuard } from './core/gards/is-login.guard';
import { loaderResolverResolver } from './core/resolver/loader-resolver.resolver';

export const routes: Routes = [
  /** path ==>> ''*/
  {
    path: '',
    loadComponent: () =>
      import('../app/pages/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    resolve: {
      loader: loaderResolverResolver,
    },
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
      {
        path: 'news-letters/:id',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/news-letters/news-letters.component'
          ).then((m) => m.NewsLettersComponent),
      },
      {
        path: 'latest/:id',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/news-letters/present-news/present-news.component'
          ).then((m) => m.PresentNewsComponent),
      },
      /** path: privacy-policy*/
      {
        path: 'guidelines',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/guidelines/guidelines.component'
          ).then((m) => m.GuidelinesComponent),
      },
      {
        path: 'articles/:id',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/guidelines/read-guideline/read-guideline.component'
          ).then((m) => m.ReadGuidelineComponent),
      },
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
      {
        path: 'contact-us-success',
        loadComponent: () =>
          import(
            '../app/pages/blank-layout/contact-us/contact-us-form/success-message/success-message.component'
          ).then((m) => m.SuccessMessageComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            '../app/auth/auth-layout/account-setting/account-setting.component'
          ).then((m) => m.AccountSettingComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '../app/auth/auth-layout/account-setting/change-account-settings/change-account-settings.component'
              ).then((m) => m.ChangeAccountSettingsComponent),
          },
          {
            path: 'change-privacy',
            loadComponent: () =>
              import(
                '../app/auth/auth-layout/account-setting/privacy-settings/privacy-settings.component'
              ).then((m) => m.PrivacySettingsComponent),
          },
        ],
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
    canActivate: [isLoginGuard],
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
            '../app/pages/protocol-layout/protocol-questions-page/protocol-questions-page.component'
          ).then((m) => m.ProtocolQuestionsPageComponent),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('../app/pages/history-layout/history-layout.component').then(
            (m) => m.HistoryLayoutComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '../app/pages/history-layout/patients-history/patients-history.component'
              ).then((m) => m.PatientsHistoryComponent),
          },
          {
            path: 'user',
            loadComponent: () =>
              import(
                '../app/pages/history-layout/user-history/user-history.component'
              ).then((m) => m.UserHistoryComponent),
          },
        ],
      },
      {
        path: 'protocol-history/:id',
        loadComponent: () =>
          import(
            '../app/pages/history-layout/protocol-history-page/protocol-history-page.component'
          ).then((m) => m.ProtocolHistoryPageComponent),
      },
      {
        path: 'patient-history/:id',
        loadComponent: () =>
          import(
            '../app/pages/history-layout/patient-history-questions/patient-history-questions.component'
          ).then((m) => m.PatientHistoryQuestionsComponent),
      },
      {
        path: 'bookmark',

        loadComponent: () =>
          import(
            '../app/pages/bookmarks-layout/bookmarks-layout.component'
          ).then((m) => m.BookmarksLayoutComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '../app/pages/bookmarks-layout/book-mark-history/book-mark-history.component'
              ).then((m) => m.BookMarkHistoryComponent),
          },
          {
            path: 'guideline',
            loadComponent: () =>
              import(
                '../app/pages/bookmarks-layout/guideline-history/guideline-history.component'
              ).then((m) => m.GuidelineHistoryComponent),
          },
          {
            path: 'guideline',
            loadComponent: () =>
              import(
                './pages/bookmarks-layout/guideline-history/guideline-history.component'
              ).then((m) => m.GuidelineHistoryComponent),
          },
          {
            path: 'bookmarks',

            loadComponent: () =>
              import(
                './pages/bookmarks-layout/book-mark-history/book-mark-history.component'
              ).then((m) => m.BookMarkHistoryComponent),
          },
        ],
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
    children: [
      {
        path: '',

        loadComponent: () =>
          import(
            './auth/auth-layout/login/login-form/login-form.component'
          ).then((m) => m.LoginFormComponent),
      },
      {
        path: 'reset',

        loadComponent: () =>
          import(
            './auth/auth-layout/login/email-forget-password/email-forget-password.component'
          ).then((m) => m.EmailForgetPasswordComponent),
      },
      {
        path: 'otp',

        loadComponent: () =>
          import(
            './auth/auth-layout/login/forget-password-otp/forget-password-otp.component'
          ).then((m) => m.ForgetPasswordOtpComponent),
      },
    ],
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
