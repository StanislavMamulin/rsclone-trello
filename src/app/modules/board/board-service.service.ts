import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  private url: string = 'http://localhost:3000/api/';

  constructor(private httpClient: HttpClient) { }

  public getBoards() {
    return this.httpClient.get(`${this.url}board`);
  }
}
