import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants';
import { IUser, LoginParams, RegistrationParams } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registrationUrl = `${BASE_URL}\\register`;

  private loginUrl = `${BASE_URL}\\login`;

  constructor(private httpClient: HttpClient) { }

  public userRegistartion(userParams: RegistrationParams): Observable<IUser> {
    return this.httpClient.post<IUser>(this.registrationUrl, userParams);
  }

  public login(loginParams: LoginParams): Observable<IUser> {
    return this.httpClient.post<IUser>(this.loginUrl, loginParams);
  }
}
