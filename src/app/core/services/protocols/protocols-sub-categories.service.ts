import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProtocolSubCategoriesBody } from '../../interfaces/protocols/IProtocolSubCategoriesBody';
import { IProtocolsSubCategories } from '../../interfaces/protocols/IProtocolsSubCategories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProtocolsSubCategoriesService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProtocols(
    data: IProtocolSubCategoriesBody
  ): Observable<IProtocolsSubCategories> {
    const params = new HttpParams()
      .set('id', data.id)
      .set('user_id', data.user_id);

    return <Observable<IProtocolsSubCategories>>(
      this._HttpClient.get(
        'https://digitalbondmena.com/healthcareapi/api/getprotocols/1',
        { params }
      )
    );
  }
}
