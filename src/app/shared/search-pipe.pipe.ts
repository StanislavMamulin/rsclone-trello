import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(boards: IBoard[], value: string) {
    const search = value.toLowerCase().trim();
    return boards.filter((board) => {
      return board.nameBoard.toLowerCase().trim().includes(search);
    });
  }
}
