import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'searchBoard',
})
export class SearchBoardPipe implements PipeTransform {
  transform(boards: IBoard[], search: string): IBoard[] {
    if (search)
      return boards.filter((board) => {
        return board.nameBoard.includes(search);
      });
    return boards;
  }
}
