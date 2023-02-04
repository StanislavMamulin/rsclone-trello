import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  private baseUrl: string = 'http://localhost:3000/api';
  private boardUrl = `${this.baseUrl}/board`;

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all boards
   * @returns Observable<Object>
   */
  public getBoards() {
    return this.httpClient.get(this.boardUrl);
  }

  /**
   * Get board by ID
   * @param id - Board ID in UUID format
   * @returns Observable<Object>
   */
  public getBoardByID(id: string) {
    return this.httpClient.get(`${this.boardUrl}/${id}`)
  }

  /**
   * Create new board
   * @param name - Board name
   * @param description - Board description
   * @returns Observable<Object>
   */
  public createNewBoard(name: string, description: string) {
    return this.httpClient.post(this.boardUrl, {
      nameBoard: name,
      descriptionBoard: description,
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
      descriptionBoard?: string
    }
) {
    return this.httpClient.put(`${this.boardUrl}/${id}`, newProperties)
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
