import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ColumnTaskService {
  private url: string = 'http://localhost:3000/api/';

  constructor(private httpClient: HttpClient) { }

  public getColumns(idBoard: string) {
    return this.httpClient.get(`${this.url}column/${idBoard}`);
  }
}
