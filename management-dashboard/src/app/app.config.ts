import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlingInterceptor } from './shared/interceptors/error-handling.interceptor';
import { loaderInterceptor } from './shared/interceptors/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
    provideHttpClient(withInterceptors([loaderInterceptor])),
  ], // Provide HttpClientModule here
};
