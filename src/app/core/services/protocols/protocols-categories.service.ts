import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProtocolsCategories } from '../../interfaces/protocols/IProtocolsCategories';

@Injectable({
  providedIn: 'root',
})
export class ProtocolsCategoriesService {
  constructor(private _HttpClient: HttpClient) {}
  getAllProtocols(): Observable<IProtocolsCategories> {
    return <Observable<IProtocolsCategories>>(
      this._HttpClient.get(
        'https://digitalbondmena.com/healthcareapi/api/getcategroydata'
      )
    );
  }
}
