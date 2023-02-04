import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IColumn {
  nameColumn:string,
  descriptionColumn:string
}

interface IColumnMove {
  toBoardId: string,
  newPosition: number
}

@Injectable()

export class ColumnTaskService {
  private urlColumn: string = 'http://localhost:3000/api/column';
  private urlTask: string = 'http://localhost:3000/api/task';

  constructor(private httpClient: HttpClient) { }

  public getColumns(idBoard: string) {
    return this.httpClient.get(`${this.urlColumn}/${idBoard}`);
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


}
