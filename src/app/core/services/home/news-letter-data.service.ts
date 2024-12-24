import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterDataService {
  constructor(private _HttpClient: HttpClient) {}

  /** Get All News Letters Data */
  getNewsLetterData(): Observable<any> {
    return <Observable<any>>(
      this._HttpClient.get(
        'https://digitalbondmena.com/healthcareapi/api/newsLettersData'
      )
    );
  }
}
