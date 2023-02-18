import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBoard } from 'src/app/modules/board/model/Board.model';

const BOARDS_KEY = 'boardsBS';

const CURRENT_BOARD_KEY = 'currentBoardBS';

@Injectable({
  providedIn: 'root',
})
export class BoardsStateService {
  private initialBoards: IBoard[] = [];

  private boards = new BehaviorSubject<IBoard[]>(this.initialBoards);

  private currentBoard = new BehaviorSubject<IBoard>(this.initialBoards[0]);

  boards$ = this.boards.asObservable();
  
  currentBoard$ = this.currentBoard.asObservable();

  constructor() {
    const storedBoards = localStorage.getItem(BOARDS_KEY);
    const storedCurrentBoard = localStorage.getItem(CURRENT_BOARD_KEY);

    if (storedBoards) this.setBoards(JSON.parse(storedBoards));
    if (storedCurrentBoard) this.setCurrentBoard(JSON.parse(storedCurrentBoard));
  }

  setBoards(newBoards: IBoard[]) {
    localStorage.setItem(BOARDS_KEY, JSON.stringify(newBoards));
    this.boards.next(newBoards);
  }

  setCurrentBoard(board: IBoard) {
    localStorage.setItem(CURRENT_BOARD_KEY, JSON.stringify(board));
    this.currentBoard.next(board);
  }
}
