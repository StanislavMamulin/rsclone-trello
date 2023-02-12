import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, LoginParams } from 'src/app/shared/models/user.model';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${BASE_URL}/api/login`;

  constructor(private httpClient: HttpClient) { }

  public login(loginParams: LoginParams): Observable<IUser> {
    return this.httpClient.post<IUser>(this.loginUrl, loginParams);
  }
}
