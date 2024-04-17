import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalService } from './local.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;
  private apiEndpoint: string = 'auth';
  private localService = inject(LocalService);
  private httplClient = inject(HttpClient);

  constructor() {
    const localToken = this.localService.getData('currentToken')!;
    this.currentTokenSubject =
      localToken != null
        ? new BehaviorSubject<string>(localToken.toString('utf8'))
        : new BehaviorSubject<string>('');

    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login(nickname: string, password: string): Observable<ApiResponse> {
    return this.httplClient.post<any>(
      `${environment.apiUrl}/${this.apiEndpoint}/login`,
      { nickname  , password }
    );
  }

  logout() {
    this.localService.clearData();
    this.currentTokenSubject.next('');
  }

  setCurrToken(token: any) {
    this.currentTokenSubject.next(token);
  }

  // getDecodedAccessToken(): User | null {
  //   try {
  //     var decoded = jwtDecode(this.currentTokenValue) as User;
  //     return decoded;
  //   } catch (Error) {
  //     return null;
  //   }
  // }
}
