import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_URL';

@Injectable({
  providedIn: 'root',
})
export class HistoryProtocolsService {
  constructor(private _HttpClient: HttpClient) {}

  addHistory(): Observable<any> {
    return this._HttpClient.get(`${WEB_SITE_BASE_URL}storeProtocolHistory`);
  }
}
