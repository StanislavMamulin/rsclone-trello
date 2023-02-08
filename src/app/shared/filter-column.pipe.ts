import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../modules/board/model/Board.model';

@Pipe({
  name: 'filterColumn'
})
export class FilterColumnPipe implements PipeTransform {

  transform(boards: IBoard[], obj:{min: number, max:number}): IBoard[] {
    const {min, max} = obj;
    return boards.filter(board=>{
      const value = board.columns.length;
      return (value >= min && value <= max);
    });
  }

}
