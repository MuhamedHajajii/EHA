import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecificProtocol } from '../../interfaces/protocols/ISpecificProtocol';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_URL';

@Injectable({
  providedIn: 'root',
})
export class SpecificProtocolService {
  constructor(private _HttpClient: HttpClient) {}

  getSpecificProtocol(id: string): Observable<ISpecificProtocol> {
    return <Observable<ISpecificProtocol>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}getProtocol/${id}`)
    );
  }
}
