import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface IColumnValues {
  minValueColumns: number;
  maxValueColumns: number;
}

interface ISort {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() onShowFavorite = new EventEmitter<boolean>();
  @Output() onShowDate = new EventEmitter<boolean>();
  @Output() onSelectValue = new EventEmitter<string>();

  showFavorite: boolean = false;
  showDate: boolean = false;
  selectValue: string = '';

  sorts: ISort[] = [
    { value: 'asc', viewValue: 'Date ASC' },
    { value: 'desc', viewValue: 'Date DESC' },
    { value: 'by', viewValue: 'Name by alphabet' },
    { value: 'across', viewValue: 'Name across alphabet' },
  ];

  ngOnInit() {}

  toShowFavorite = (showFavorite: boolean) => {
    this.onShowFavorite.emit(showFavorite);
  };
  toShowDate = (showDate: boolean) => {
    this.onShowDate.emit(showDate);
  };
  toSelectValue = (selectValue: string) => {
    this.onSelectValue.emit(selectValue);
  };
}
