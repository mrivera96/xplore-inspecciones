import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const currentUser = this.authService.getCurrentUser();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    if (currentUser && currentUser.access_token) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set(
        'Authorization',
        `Bearer ${currentUser.access_token}`
      );
      headers = headers.set(
        'Access-Control-Allow-Origin',
        '*'
      );
      headers = headers.set('Access-Control-Allow-Credentials', 'true');

      req = req.clone({
        headers,
      });
    } else {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      headers = headers.set(
        'Access-Control-Allow-Origin',
        '*'
      );
      headers = headers.set('Access-Control-Allow-Credentials', 'true');

      req = req.clone({
        headers,
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(req).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status != HttpStatusCode.Unauthorized) {
              return;
            }
            this.authService.logout();
          }
        }
      )
    );
  }
}
