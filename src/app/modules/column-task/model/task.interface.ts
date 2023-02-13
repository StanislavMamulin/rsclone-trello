import { IColumn } from './column.interface';

export interface ITask {
  nameTask: string;
  descriptionTask: string;
  checkLists:string[];
  idTask: string;
}

export interface ITaskMove {
  toColumnId: string;
  newPosition: number;
}

export interface ITaskCreate {
  nameTask: string;
  descriptionTask: string;
  checkLists: string[]
}

export interface IMovedTask {
  tasks: ITask[];
  column: IColumn;
}
