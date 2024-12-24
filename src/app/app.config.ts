import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { IMAGE_CONFIG } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { routes } from './app.routes';
import { spinnerLoadingInterceptor } from './core/interceptors/spinner-loading.interceptor';
import { provideToastr } from 'ngx-toastr';
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({ positionClass: 'toast-top-right', timeOut: 4000 }),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([spinnerLoadingInterceptor])
    ),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
};
