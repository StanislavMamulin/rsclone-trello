import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBoard } from 'src/app/modules/board/model/Board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsStateService {
  private initialBoards: IBoard[] = [];

  private boards = new BehaviorSubject<IBoard[]>(this.initialBoards);

  private currentBoard = new BehaviorSubject<IBoard>(this.initialBoards[0]);

  boards$ = this.boards.asObservable();
  
  currentBoard$ = this.currentBoard.asObservable();

  setBoards(newBoards: IBoard[]) {
    this.boards.next(newBoards);
  }

  setCurrentBoard(board: IBoard) {
    this.currentBoard.next(board);
  }
}
