import { IColumn } from '../../column-task/model/column.interface';

export interface IBoard {
  idBoard: string;
  nameBoard: string;
  dateBoard: Date;
  descriptionBoard: string;
  isChosen: boolean;
  columns: IColumn[];
}

export interface IBoardCreateResponse {
  idBoard: string;
  nameBoard: string;
  dateBoard: Date;
  descriptionBoard: string;
  isChosen: boolean;
  columns: IColumn[];
}

export interface IBoardUpdateResponse {
  nameBoard: string;
  descriptionBoard: string;
  dateBoard: Date;
  isChosen: boolean;
}
