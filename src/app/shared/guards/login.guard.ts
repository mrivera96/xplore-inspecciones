import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  authService = inject(AuthService);

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.authService.currentUser() == undefined) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}