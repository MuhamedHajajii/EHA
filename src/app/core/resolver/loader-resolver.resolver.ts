import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize, of } from 'rxjs';

export const loaderResolverResolver: ResolveFn<boolean> = (route, state) => {
  const spinner = inject(NgxSpinnerService);
  console.log('resolver Works');
  // Show spinner
  spinner.show();
  return true;
  // // Simulate a delay and hide the spinner after resolution
  // return of(true).pipe(
  //   delay(1000) // Simulate a 1-second delay
  //   // finalize(() => spinner.hide())
  // );
};
