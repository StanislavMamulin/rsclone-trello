import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(boards: IBoard[], value: string) {
    return boards.filter((board) => board.nameBoard.includes(value));
  }
}
