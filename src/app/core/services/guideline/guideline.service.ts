import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGuideline } from '../../interfaces/guideline/IGuideline';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_URL';

@Injectable({
  providedIn: 'root',
})
export class GuidelineService {
  constructor(private _HttpClient: HttpClient) {}

  getAllGuidelines(Id: string): Observable<IGuideline> {
    let userId = {
      user_id: Id,
    };
    let params = new HttpParams({ fromObject: userId });
    return <Observable<IGuideline>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}getArticles`, { params })
    );
  }
}
