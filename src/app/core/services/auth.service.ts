import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginParams, UserResponse } from 'src/app/shared/models/user.model';
import { BASE_URL } from '../constants';

const TOKEN_EXP_KEY = 'token-exp';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${BASE_URL}/api/login`;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public login(loginParams: LoginParams): Observable<UserResponse > {
    return this.httpClient.post<UserResponse>(this.loginUrl, loginParams)
      .pipe(
        tap(this.setToken),
      );
  }

  public logout() {
    this.resetToken();
    this.router.navigate(['/main']);
  }

  private setToken(response: UserResponse) {
    const { expiresIn, token } = response;

    localStorage.setItem(TOKEN_EXP_KEY, new Date(expiresIn).toString());
    if (token) localStorage.setItem('token', token);

  }

  private resetToken() {
    localStorage.removeItem(TOKEN_EXP_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  get token() {
    const existExpDate = localStorage.getItem(TOKEN_EXP_KEY);
    if (existExpDate) {
      const expDate = new Date(existExpDate);
      if (new Date() > expDate) {
        this.logout();
        return null;
      }

      return localStorage.getItem(TOKEN_KEY);
    }

    return null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
