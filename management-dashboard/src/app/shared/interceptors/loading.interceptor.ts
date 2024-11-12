// src/app/interceptors/loader.interceptor.ts
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  // Show loader when the request starts
  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      // Hide loader when the request completes
      loaderService.hide();
    })
  );
};
