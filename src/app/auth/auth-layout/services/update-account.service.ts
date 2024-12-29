import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../../core/constants/WEB_SITE_BASE_URL';

@Injectable({
  providedIn: 'root',
})
export class UpdateAccountService {
  constructor(private _HttpClient: HttpClient) {}

  updateUserAccount(userData: any): Observable<any> {
    let fd = new FormData();
    Object.keys(userData).forEach((key) => {
      fd.append(key, userData[key]);
    });
    return this._HttpClient.post(`${WEB_SITE_BASE_URL}updateUserProfile`, fd);
  }
}
