import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoard } from 'src/app/modules/board/model/Board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsStateService {
  private initialBoards: IBoard[] = [];

  private _boards = new BehaviorSubject<IBoard[]>(this.initialBoards);

  private currentBoard = new BehaviorSubject<IBoard>(this.initialBoards[0]);

  private _boards$ = this._boards.asObservable();
  
  private currentBoard$ = this.currentBoard.asObservable();

  getBoards(): Observable<IBoard[]> {
    return this._boards$;
  }

  setBoards(newBoards: IBoard[]) {
    return this._boards.next(newBoards);
  }

  getCurrentBoard(): Observable<IBoard> {
    return this.currentBoard$;
  }

  setCurrentBoard(board: IBoard) {
    this.currentBoard.next(board);
  }
}
