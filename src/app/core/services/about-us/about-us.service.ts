import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAboutUs } from '../../interfaces/about-us/IAboutUs';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_URL';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  constructor(private _HttpClient: HttpClient) {}

  getAboutUsData(): Observable<IAboutUs> {
    return <Observable<IAboutUs>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}getAboutData`)
    );
  }
}
