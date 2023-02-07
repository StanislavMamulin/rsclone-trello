import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { IColumn, IColumnCreate, IColumnMove } from './model/column.interface';
import { ITask, ITaskCreate, ITaskMove } from './model/task.interface';

@Injectable()

export class ColumnTaskService {
  private urlColumn: string = 'http://localhost:3000/api/column';
  private urlTask: string = 'http://localhost:3000/api/task';

  constructor(private httpClient: HttpClient) { }

  public getColumns(idBoard: string): Observable<IColumn[]> {
    return this.httpClient.get<IColumn[]>(`${this.urlColumn}/${idBoard}`);
  }

  public getColumnById(idColumn: string): Observable<IColumn> {
    return this.httpClient.get<IColumn>(`${this.urlColumn}/id/${idColumn}`);
  }

  public createColumn(idBoard: string, body: IColumnCreate): Observable<IColumn> {
    return this.httpClient.post<IColumn>(`${this.urlColumn}/${idBoard}`,body);
  }

  public deleteColumn(idColumn: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlColumn}/${idColumn}`);
  }

  public updateColumn(idColumn: string, body: Partial<IColumnCreate>): Observable<IColumn> {
    return this.httpClient.put<IColumn>(`${this.urlColumn}/${idColumn}`,body);
  }

  public moveColumn(idColumn: string, body: IColumnMove): Observable<IColumn> {
    return this.httpClient.put<IColumn>(`${this.urlColumn}/move/${idColumn}`,body);
  }

  // tasks methods
  public getTasks(idBoard: string, idColumn: string): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(`${this.urlTask}/${idBoard}/${idColumn}`);
  }

  public getTaskById(idTask: string): Observable<ITask> {
    return this.httpClient.get<ITask>(`${this.urlTask}/id/${idTask}`);
  }

  public createTask(idBoard: string, idColumn: string, body: ITaskCreate): Observable<ITask> {
    return this.httpClient.post<ITask>(`${this.urlTask}/${idBoard}/${idColumn}`, body);
  }

  public createTaskByColumnId(idColumn: string, body: ITaskCreate): Observable<ITask> {
    return this.httpClient.post<ITask>(`${this.urlTask}/${idColumn}`, body);
  }

  public deleteTask(idTask: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlTask}/${idTask}`);
  }

  public updateTask(idTask: string, body: Partial<ITaskCreate>): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.urlTask}/${idTask}`,body);
  }

  public moveTask(idTask: string, body: ITaskMove): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.urlTask}/move/${idTask}`,body);
  }
}
