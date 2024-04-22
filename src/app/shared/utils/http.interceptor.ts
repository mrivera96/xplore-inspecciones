import {
  HttpHandler,
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
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${currentUser.access_token}`
        ),
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}
