import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private isItemEdit = new BehaviorSubject<boolean>(false);

  public isItemEdit$ = this.isItemEdit.asObservable();

  setIsItemEdit(editState: boolean) {
    this.isItemEdit.next(editState);
  }
}
