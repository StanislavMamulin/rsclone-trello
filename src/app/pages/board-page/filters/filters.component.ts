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

  showFavorite = false;

  showDate = false;

  selectValue = '';

  language: string = localStorage.getItem('language') as string || 'en';

  sorts: ISort[] = [
    { value: 'asc', viewValue: this.language === 'ru' ? 'Дата ASC' : 'Date ASC'},
    { value: 'desc', viewValue:this.language === 'ru' ? 'Дата DESC' : 'Date DESC' },
    { value: 'by', viewValue: this.language === 'ru' ? 'Имена по алфавиту' : 'Name by alphabet' },
    { value: 'across', viewValue:  this.language === 'ru' ? 'Имена против алфавита' : 'Name across alphabet' },
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
