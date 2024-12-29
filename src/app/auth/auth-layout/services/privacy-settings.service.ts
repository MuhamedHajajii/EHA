import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../../core/constants/WEB_SITE_BASE_URL';
import { IChangePassword } from '../interfaces/IChangePassword';

@Injectable({
  providedIn: 'root',
})
export class PrivacySettingsService {
  constructor(private _HttpClient: HttpClient) {}

  changePassword(userData: {
    user_id: string;
    password: string;
  }): Observable<IChangePassword> {
    return <Observable<IChangePassword>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}updateUserPassword`, userData)
    );
  }

  resetUserCode(userEmail: string): Observable<any> {
    let email = {
      email: userEmail,
    };
    return this._HttpClient.post(`${WEB_SITE_BASE_URL}resetUserCode`, email);
  }

  updateUserForgetPassword(userData: any): Observable<any> {
    return <Observable<any>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}resetUserPassword`, userData)
    );
  }
}
