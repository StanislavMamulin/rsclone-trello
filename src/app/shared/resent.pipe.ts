import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'resent',
})
export class ResentPipe implements PipeTransform {
  transform(boards: IBoard[], choice: boolean): IBoard[] {
    if (choice) {
      return boards.filter((item) => {
        const recent = new Date(item.dateBoard).getTime();
        const date = new Date().getTime();
        const diff = Math.abs(date - recent);
        const dayOfMilliSeconds = 8640000;
        return dayOfMilliSeconds > diff;
      });
    }

    return boards;
  }
}
