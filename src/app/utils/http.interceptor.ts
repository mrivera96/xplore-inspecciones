import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable, inject } from '@angular/core';
  import { LocalService } from '../services/local.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    private localService = inject(LocalService);
    constructor() {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      // Get the auth token from the service.
      const authToken = this.localService.getData('currentUser').access_token;
  
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
  
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
  }
  