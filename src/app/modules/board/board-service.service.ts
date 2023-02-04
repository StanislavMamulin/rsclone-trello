import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  private baseUrl: string = 'http://localhost:3000/api';
  private boardUrl = `${this.baseUrl}/board`;

  constructor(private httpClient: HttpClient) { }

  public getBoards() {
    return this.httpClient.get(this.boardUrl);
  }

  public getBoardByID(id: string) {
    return this.httpClient.get(`${this.boardUrl}/${id}`)
  }
}
