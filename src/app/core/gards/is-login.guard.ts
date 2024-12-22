import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const cookies = inject(CookieService);

  const userToken = cookies.check('token');

  if (userToken) {
    console.log(userToken);
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
