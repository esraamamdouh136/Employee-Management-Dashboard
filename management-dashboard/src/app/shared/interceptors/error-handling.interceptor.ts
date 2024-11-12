// src/app/interceptors/error-handling.interceptor.ts
import {
    HttpEvent,
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable, catchError, throwError } from 'rxjs';
  
  export const errorHandlingInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> => {
    const router = inject(Router); // Using inject() instead of constructor
  
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
  
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 401) {
            router.navigate(['/login']);
          }
          if (error.status === 404) {
            router.navigate(['/not-found']);
          }
        }
  
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  };
  