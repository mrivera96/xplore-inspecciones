import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalService } from './local.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User | undefined>;
  public currentUser: Observable<User | undefined>;
  private apiEndpoint: string = 'auth';
  private localService = inject(LocalService);
  private httplClient = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const localUser = this.localService.getData('currentUser')! as User;
    this.currentUserSubject =
      localUser != null
        ? new BehaviorSubject<User | undefined>(localUser)
        : new BehaviorSubject<User | undefined>(undefined);

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | undefined {
    return this.currentUserSubject.value;
  }

  login(nickname: string, password: string): Observable<ApiResponse> {
    console.log(`${environment.apiUrl}/${this.apiEndpoint}/login`);
    return this.httplClient.post<any>(
      `${environment.apiUrl}/${this.apiEndpoint}/login`,
      { nickname, password }
    );
  }

  logout() {
    this.localService.clearData();
    this.currentUserSubject.next(undefined);
    this.router.navigateByUrl('login')
  }

  setCurrUser(user: any) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | undefined {
    try {
      return this.currentUserValue;
    } catch (Error) {
      return undefined;
    }
  }
}