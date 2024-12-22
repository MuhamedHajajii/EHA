import { WEB_SITE_BASE_URL } from './../../constants/WEB_SITE_BASE_URL';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactUs } from '../../interfaces/contact-us/IContactUs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private _HttpClient: HttpClient) {}

  submitUserContactForm(userData: any): Observable<IContactUs> {
    userData = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone.e164Number,
      message: userData.message,
    };
    return <Observable<IContactUs>>(
      this._HttpClient.post(`${WEB_SITE_BASE_URL}submitContactForm`, userData)
    );
  }
}
