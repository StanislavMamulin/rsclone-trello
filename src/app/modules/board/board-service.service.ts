import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { IBoard, IBoardCreateResponse, IBoardUpdateResponse } from './model/Board.model';

@Injectable()
export class BoardService {
  private baseUrl: string = 'http://localhost:3000/api';
  private boardUrl = `${this.baseUrl}/board`;

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all boards
   * @returns Observable<Object>
   */
  public getBoards():Observable<IBoard[]> {
    return this.httpClient.get<IBoard[]>(this.boardUrl);
  }

  /**
   * Get board by ID
   * @param id - Board ID in UUID format
   * @returns Observable<Object>
   */
  public getBoardByID(id: string):Observable<IBoard> {
    return this.httpClient.get<IBoard>(`${this.boardUrl}/${id}`)
  }

  /**
   * Create new board
   * @param name - Board name
   * @param description - Board description
   * @returns Observable<Object>
   */
  public createNewBoard(name: string, description: string, date:string):Observable<IBoardCreateResponse> {
    return this.httpClient.post<IBoardCreateResponse>(this.boardUrl, {
      nameBoard: name,
      descriptionBoard: description,
      dateBoard: date
    })
  }

  /**
   * Update board fields
   * @param id - Board ID in UUID format
   * @param newProperties - Board new properties: nameBoard or descriptionBoard or both
   * @returns Observable<Object>
   */
  public updateBoard(
    id: string,
    newProperties: {
      nameBoard?: string,
      descriptionBoard?: string,
      dateBoard:string
    }
  ):Observable<IBoardUpdateResponse> {
    return this.httpClient.put<IBoardUpdateResponse>(`${this.boardUrl}/${id}`, newProperties)
  }

  /**
   * Delete board by ID
   * @param id - Board ID in UUID format
   * @returns Observable<Object>
   */
  public deleteBoard(id: string) {
    return this.httpClient.delete(`${this.boardUrl}/${id}`);
  }
}
