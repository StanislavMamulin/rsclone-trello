import { IColumn } from "./column.interface";

export interface ITask {
    nameTask: string,
    descriptionTask: string,
    idTask: string,
}
  
export interface ITaskMove {
    toColumnId: string,
    newPosition: number
}

export interface ITaskCreate {
    nameTask: string,
    descriptionTask: string,   
}

export interface IMovedTask {
    tasks: ITask[]; 
    column: IColumn;
}