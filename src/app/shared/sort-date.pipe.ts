import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'SortByParams',
  pure: false,
})
export class SortByParamsPipe implements PipeTransform {
  transform(boards: IBoard[], selectValue: string): IBoard[] {
    if (selectValue === 'desc') {
      return [...boards].sort((a, b) => {
        const dateValueA = new Date(a.dateBoard).getTime();
        const dateValueB = new Date(b.dateBoard).getTime();
        return dateValueA - dateValueB;
      });
    }

    if (selectValue === 'asc') {
      return [...boards].sort((a, b) => {
        const dateValueA = new Date(a.dateBoard).getTime();
        const dateValueB = new Date(b.dateBoard).getTime();
        return dateValueB - dateValueA;
      });
    }

    if (selectValue === 'by') {
      return [...boards].sort((a, b) => {
        const textA = a.nameBoard.toLowerCase();
        const textB = b.nameBoard.toLowerCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }

    if (selectValue === 'across') {
      return [...boards].sort((a, b) => {
        const textA = a.nameBoard.toLowerCase();
        const textB = b.nameBoard.toLowerCase();
        return textB < textA ? -1 : textB > textA ? 1 : 0;
      });
    }

    return boards;
  }
}
