import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccessLevel, UserProfile } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private isItemEdit = new BehaviorSubject<boolean>(false);
  private isSoundEnable = new BehaviorSubject<boolean>(true);
  private currentUser = new BehaviorSubject<UserProfile>({
    id:'1111111111',
    firstName: 'user name',
    lastName: '',
    email: 'user email',
    gender: 'man',
    registrationDate: new Date(),
    accessLevel: AccessLevel.Anonymous
  });

  public isItemEdit$ = this.isItemEdit.asObservable();
  public isSoundEnable$ = this.isSoundEnable.asObservable();
  public currentUser$ = this.currentUser.asObservable();

  setIsItemEdit(editState: boolean) {
    this.isItemEdit.next(editState);
  }

  setIsSoundEnable(editState: boolean){
    this.isSoundEnable.next(editState);
  }

  setCurrentUser(user: UserProfile){
    this.currentUser.next(user);
  }
}
