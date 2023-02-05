import { ITask } from "./task.interface"

export interface IColumn {
    idColumn: string,
    nameColumn:string,
    descriptionColumn:string,
    tasks: ITask[]
}
  
export interface IColumnMove {
    toBoardId: string,
    newPosition: number
}

export interface IColumnCreate {
    nameColumn:string,
    descriptionColumn:string
}