import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../../core/constants/WEB_SITE_BASE_URL';
import { IUserData } from '../interfaces.ts/IUserData';
import { ILogeInUser } from '../interfaces.ts/ILogedUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _HttpClient: HttpClient) {}

  loginUser(userData: IUserData): Observable<ILogeInUser> {
    return <Observable<ILogeInUser>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}signin`, userData)
    );
  }
}
