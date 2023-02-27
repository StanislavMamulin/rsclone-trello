import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'chosen',
})
export class ChosenPipe implements PipeTransform {
  transform(boards: IBoard[], isChosen: boolean): IBoard[] {
    if (isChosen) {
      return boards.filter((item) => item.isChosen);
    }

    return boards;
  }
}
