import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SignupRequestPayload } from '../signup-request.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', signupRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };

    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth/refresh/token',
      refreshTokenPayload
    ).pipe(tap(response => {
      this.localStorage.store('authenticationToken', response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt);
    }));
  }

  getJwtToken() {
    this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    this.localStorage.retrieve('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() !== null;
  }

  logout() {
    this.http.post(
      'http://localhost:8080/api/auth/logout',
      this.refreshToken,
      { responseType: 'text' }
    ).subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error);
    });
    this.localStorage.clear('authenicationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
}
