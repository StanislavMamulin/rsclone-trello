import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';


interface IColumn {
  nameColumn:string,
  descriptionColumn:string
}

interface IColumnMove {
  toBoardId: string,
  newPosition: number
}

interface ITask {
  nameTask: string,
  descriptionTask: string
}

interface ITaskMove {
  toColumnId: string,
  newPosition: number
}
@Injectable()

export class ColumnTaskService {
  private urlColumn: string = 'http://localhost:3000/api/column';
  private urlTask: string = 'http://localhost:3000/api/task';

  constructor(private httpClient: HttpClient) { }

  public getColumns(idBoard: string):Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.urlColumn}/${idBoard}`);
  }

  public getColumnById(idColumn: string) {
    return this.httpClient.get(`${this.urlColumn}/id/${idColumn}`);
  }

  public createColumn(idBoard:string,body:IColumn) {
    return this.httpClient.post(`${this.urlColumn}/${idBoard}`,body);
  }

  public deleteColumn(idColumn:string) {
    return this.httpClient.delete(`${this.urlColumn}/${idColumn}`);
  }

  public updateColumn(idColumn:string, body:IColumn){
    return this.httpClient.put(`${this.urlColumn}/${idColumn}`,body);
  }

  public moveColumn(idColumn:string, body:IColumnMove){
    return this.httpClient.put(`${this.urlColumn}/move/${idColumn}`,body);
  }

  public getTasks(idBoard: string, idColumn: string) {
    return this.httpClient.get(`${this.urlTask}/${idBoard}/${idColumn}`);
  }

  public getTaskById(idTask:string) {
    return this.httpClient.get(`${this.urlTask}/id/${idTask}`);
  }

  public createTask(idBoard:string, idColumn:string, body:ITask){
    return this.httpClient.post(`${this.urlTask}/${idBoard}/${idColumn}`, body);
  }

  public deleteTask(idTask:string){
    return this.httpClient.delete(`${this.urlTask}/${idTask}`);
  }

  public updateTask(idTask:string, body:ITask){
    return this.httpClient.put(`${this.urlTask}/${idTask}`,body);
  }

  public moveTask(idTask:string, body:ITaskMove){
    return this.httpClient.put(`${this.urlTask}/move/${idTask}`,body);
  }
}
