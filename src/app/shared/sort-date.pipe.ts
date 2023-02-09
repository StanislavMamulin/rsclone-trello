import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'SortDate'
})
export class SortDatePipe implements PipeTransform {

  transform(boards: IBoard[], selectValue:string):IBoard[] {
    if(selectValue === 'asc'){
      return [...boards].sort((a,b)=>{
        const dateValueA = new Date(a.dateBoard).getTime();
        const dateValueB = new Date(b.dateBoard).getTime();
        return (dateValueA-dateValueB);
      });
    }

    if(selectValue === 'desc'){
      return [...boards].sort((a,b)=>{
        const dateValueA = new Date(a.dateBoard).getTime();
        const dateValueB = new Date(b.dateBoard).getTime();

        return (dateValueB-dateValueA);
      });
    }

    return boards;

  }

}
