import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'resent'
})
export class ResentPipe implements PipeTransform {

  transform(boards: IBoard[], choice: boolean): IBoard[] {

    if(choice){
      return boards.filter(item => {
        const recent = new Date(item.dateBoard);
        const date = new Date();
        const diff = Math.abs((date.getTime() - recent.getTime()) / (60*60*60*24*1000))
        return Math.floor(diff) > 1;
      })
    }


    return boards;
  }

}
