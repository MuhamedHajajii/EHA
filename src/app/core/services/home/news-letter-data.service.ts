import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewsletterData } from '../../interfaces/news-letters/INewsLetterData';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterDataService {
  constructor(private _HttpClient: HttpClient) {}

  /** Get All News Letters Data */
  getNewsLetterData(): Observable<INewsletterData> {
    return <Observable<INewsletterData>>(
      this._HttpClient.get(
        'https://digitalbondmena.com/healthcareapi/api/newsLettersData'
      )
    );
  }
}
