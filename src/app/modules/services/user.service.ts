import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/core/constants';
import { IUser, LoginParams, RegistrationParams, UserEditParams, UserProfile } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registrationUrl = `${BASE_URL}/api/register`;

  private loginUrl = `${BASE_URL}/api/login`;

  private userUrl = `${BASE_URL}/api/user`;

  constructor(private httpClient: HttpClient) { }

  public userRegistartion(userParams: RegistrationParams): Observable<IUser> {
    return this.httpClient.post<IUser>(this.registrationUrl, userParams);
  }

  public login(loginParams: LoginParams): Observable<IUser> {
    return this.httpClient.post<IUser>(this.loginUrl, loginParams);
  }

  public updateUser(newUserInfo: UserEditParams): Observable<UserProfile> {
    return this.httpClient.put<UserProfile>(this.userUrl, newUserInfo);
  }

  public getCurrentUserProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(this.userUrl);
  }
}
