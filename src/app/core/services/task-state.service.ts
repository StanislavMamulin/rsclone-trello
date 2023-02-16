import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICheckBox } from 'src/app/pages/workspace-page/model/checkbox.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {

  private defaultChecklist: ICheckBox[] = [];

  private checklist = new BehaviorSubject<ICheckBox[]>(this.defaultChecklist);

  checklist$ = this.checklist.asObservable();

  setChecklist(newChecklist: ICheckBox[]){
    console.log(newChecklist);
    this.checklist.next(newChecklist);
  }

  constructor() { }
}
