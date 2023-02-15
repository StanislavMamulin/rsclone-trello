import { IColumn } from './column.interface';

export interface ITask {
  nameTask: string;
  descriptionTask: string;
  idTask: string;
  checkLists: {
    idCheckBox: string;
    nameCheckBox: string;
    isChoose: boolean;
  }[]
}

export interface ITaskMove {
  toColumnId: string;
  newPosition: number;
}

export interface ITaskCreate {
  nameTask: string;
  descriptionTask: string;
  checkLists: {
    idCheckBox: string;
    nameCheckBox: string;
    isChoose: boolean;
  }[]
}

export interface IMovedTask {
  tasks: ITask[];
  column: IColumn;
}
