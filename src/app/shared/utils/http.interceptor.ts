import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
      headers = headers.set('Access-Control-Allow-Origin', 'http://localhost;http://localhost:8100');
      headers = headers.set('Access-Control-Allow-Credentials', 'true');

      req = req.clone({
        headers,
      });
    } else {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
     
      headers = headers.set('Access-Control-Allow-Origin', 'http://localhost;http://localhost:8100');
      headers = headers.set('Access-Control-Allow-Credentials', 'true');

      req = req.clone({
        headers,
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}
