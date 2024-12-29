import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _Toaster = inject(ToastrService);
  const platformId = inject(PLATFORM_ID); // Correctly inject PLATFORM_ID

  let userToken: string | null = null;

  // Check if running on a browser platform
  if (isPlatformBrowser(platformId)) {
    userToken = localStorage.getItem('token'); // Only access localStorage in the browser
  }

  if (userToken) {
    return true; // Allow access if token exists
  } else {
    _Router.navigate(['/login']); // Navigate to login
    return false; // Deny access
  }
};
