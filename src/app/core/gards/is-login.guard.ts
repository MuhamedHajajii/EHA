import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const cookies = inject(CookieService);
  const _Toaster = inject(ToastrService);
  const userToken = cookies.check('token');

  if (userToken) {
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
