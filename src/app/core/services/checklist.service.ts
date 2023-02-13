import { BASE_URL } from 'src/app/core/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICheckBox,
  ICheckBoxCreateResponse,
} from 'src/app/pages/workspace-page/model/checkbox.interface';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private baseUrl = `${BASE_URL}/api`;

  private checkBoxUrl = `${this.baseUrl}/checkbox`;

  constructor(private httpClient: HttpClient) {}

  public getCheckList(idTask: string): Observable<ICheckBox[]> {
    return this.httpClient.get<ICheckBox[]>(`${this.checkBoxUrl}/${idTask}`);
  }

  public getCheckBox(idCheckBox: string): Observable<ICheckBox> {
    return this.httpClient.get<ICheckBox>(`${this.checkBoxUrl}/id/${idCheckBox}`);
  }

  public createCheckbox(idTask: string, body: ICheckBoxCreateResponse): Observable<ICheckBox> {
    return this.httpClient.post<ICheckBox>(`${this.checkBoxUrl}/${idTask}`, body);
  }

  public delteCheckbox(idTask: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.checkBoxUrl}/${idTask}`);
  }

  public updateCheckBox(idCheckBox: string, body: ICheckBox): Observable<ICheckBox> {
    return this.httpClient.put<ICheckBox>(`${this.checkBoxUrl}/${idCheckBox}`, body);
  }
}
