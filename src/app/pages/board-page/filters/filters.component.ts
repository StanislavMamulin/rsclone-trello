import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board-service.service';

interface IColumnValues{
  minValueColumns: number,
  maxValueColumns: number
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit{
  @Output() onShowFavorite = new EventEmitter<boolean>();
  @Output() onShowDate = new EventEmitter<boolean>();
  @Output() updateValues = new EventEmitter<IColumnValues>();

  constructor(private boardService: BoardService){}

  showFavorite:boolean = false;
  showDate:boolean = false;

  minValueColumns: number = 0;
  maxValueColumns: number = 90;
  optionsColumns: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Columns: </b>' + value;
        case LabelType.High:
          return '<b>Columns: </b>' + value;
        default:
          return '' + value;
      }
    }
  };
  minValueTasks: number = 0;
  maxValueTasks: number = 90;
  optionsTasks: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Tasks: </b>' + value;
        case LabelType.High:
          return '<b>Tasks: </b>' + value;
        default:
          return '' + value;
      }
    }
  };

  ngOnInit(){
  }

  maxColumnInBoard(){
    const values:number[] = [];
    this.boardService.getBoards().subscribe(res=>{
      res.forEach(item=>values.push(item.columns.length));
    })
    return values;
  }

  toShowFavorite(onShowFavorite: boolean){
    this.onShowFavorite.emit(onShowFavorite);
  }
  toShowDate(onShowDate: boolean){
    this.onShowDate.emit(onShowDate);
  }

  toUpdateValues(obj:IColumnValues){
    this.updateValues.emit(obj);
  }


}
