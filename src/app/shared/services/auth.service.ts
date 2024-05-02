import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalService } from './local.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser = signal<User | undefined>(undefined);
  private apiEndpoint: string = 'auth';
  private localService = inject(LocalService);
  private httplClient = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const localUser = this.localService.getData('currentUser')! as User;

    this.currentUser.set(localUser);
  }

  login(nickname: string, password: string): Observable<ApiResponse> {
    return this.httplClient.post<any>(
      `${environment.apiUrl}/${this.apiEndpoint}/login`,
      { nickname, password }
    );
  }

  logout() {
    this.localService.clearData();
    this.currentUser.set(undefined);
    this.router.navigateByUrl('login');
  }

  setCurrUser(user: any) {
    this.currentUser.set(user);
  }

}
