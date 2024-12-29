import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const BYPASS_SPINNER = new HttpContextToken(() => false);

export const spinnerLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // Check if the request has the bypass spinner context
  if (!req.context.get(BYPASS_SPINNER)) {
    spinner.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (!req.context.get(BYPASS_SPINNER)) {
        setTimeout(() => {
          spinner.hide();
        }, 2000);
      }
    })
  );
};
