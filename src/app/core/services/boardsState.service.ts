import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoard } from 'src/app/modules/board/model/Board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsStateService {
  private initialBoards: IBoard[] = [];

  private _boards = new BehaviorSubject<IBoard[]>(this.initialBoards);

  private _boards$ = this._boards.asObservable();

  getBoards(): Observable<IBoard[]> {
    return this._boards$;
  }

  setBoards(newBoards: IBoard[]) {
    return this._boards.next(newBoards);
  }
}
