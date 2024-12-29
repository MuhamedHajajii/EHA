import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, tap } from 'rxjs';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_URL';
import { BYPASS_SPINNER } from '../../interceptors/spinner-loading.interceptor';
import { IAllHistory } from '../../interfaces/history/IAllHistory';
import { IBookMarkHistory } from '../../interfaces/history/IBookMarkHistory';
import { ICheckValidPatientName } from '../../interfaces/history/ICheckValidPatientName';
import { IGuideLineHistory } from '../../interfaces/history/IGuideLineHistory';
import { IHistory } from '../../interfaces/history/IHistory';
import { IPatientHistory } from '../../interfaces/history/IPatientHistory';
import { IAddPatientChoiceResponse } from '../../interfaces/history/ISendPatient';
import { IUserHistory } from '../../interfaces/history/IUserHistory';

@Injectable({
  providedIn: 'root',
})
export class HistoryProtocolsService {
  History: BehaviorSubject<IHistory | null> =
    new BehaviorSubject<IHistory | null>(null);

  AllHistory: BehaviorSubject<IAllHistory[]> = new BehaviorSubject<
    IAllHistory[]
  >([]);

  constructor(private _HttpClient: HttpClient) {}

  addHistory(): Observable<any> {
    return this._HttpClient.get(`${WEB_SITE_BASE_URL}storeProtocolHistory`);
  }
  // first  check user name
  checkPatientNameValid(userName: string): Observable<ICheckValidPatientName> {
    let D = new FormData();
    D.append('patient_name', userName);
    return <Observable<ICheckValidPatientName>>this._HttpClient.post(
      `${WEB_SITE_BASE_URL}checkpatiennameavail`,
      {
        patient_name: userName,
      }
    );
  }

  getPatientHistory(userData: { [key: string]: any }): Observable<IHistory> {
    const params = new HttpParams({ fromObject: userData }); // Convert userData to query params
    return this._HttpClient
      .get<IHistory>(`${WEB_SITE_BASE_URL}getpatientHistory`, { params })
      .pipe(
        tap((response) => {
          this.History.next(response);
          console.log(response);
        })
      );
  }

  getSpecificProtocolHistory(userData: {
    [key: string]: any;
  }): Observable<IHistory> {
    const params = new HttpParams({ fromObject: userData }); // Convert userData to query parameters
    return this._HttpClient
      .get<IHistory>(`${WEB_SITE_BASE_URL}getuserHistory`, { params })
      .pipe(
        tap((response) => {
          this.History.next(response);
        })
      );
  }

  getAllHistory(user_id: string): Observable<any> {
    const params = new HttpParams().set('user_id', user_id);

    const BOOK_MARKS_API = this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getUserBookmarks`,
      { params }
    );
    const GUDIELINE_API = this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getUserBookmarks`,
      { params }
    );
    const PATIENTS_API = this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getpatientHistory`,
      { params }
    );
    const USER_HISTORY_API = this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getuserHistory`,
      { params }
    );

    // Combine all API calls using forkJoin
    return forkJoin([BOOK_MARKS_API, PATIENTS_API]).pipe(
      tap((responses: any) => {
        this.History.next(responses);
      })
    );
  }

  /** sending history by choice id */
  addToHistory(data: { user_id: string; id: string }): Observable<any> {
    const params = new HttpParams({ fromObject: data });

    return this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getnextquestion/${data.id}`,
      {
        params,
        context: new HttpContext().set(BYPASS_SPINNER, true),
      }
    );
  }

  addToHistoryPatient(data: {}, id: string): Observable<any> {
    const params = new HttpParams({ fromObject: data });
    console.log(id, 'choice id');
    console.log(params, 'choice id');
    return this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getnextquestionpatient/${id}`,
      {
        params,
        context: new HttpContext().set(BYPASS_SPINNER, true),
      }
    );
  }

  addToPatients(userData: any): Observable<IAddPatientChoiceResponse> {
    const params = new HttpParams({ fromObject: userData });

    return this._HttpClient.get<IAddPatientChoiceResponse>(
      `${WEB_SITE_BASE_URL}getnextquestionpatient/${userData.user_id}`,
      {
        params,
        context: new HttpContext().set(BYPASS_SPINNER, true),
      }
    );
  }

  /** Get Book Mark History */
  getBookMarksHistory(user_id: string): Observable<IBookMarkHistory> {
    const params = new HttpParams().set('user_id', user_id);
    return <Observable<IBookMarkHistory>>this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getUserBookmarks`,
      {
        params,
      }
    );
  }

  /** Get Guid Line History */
  getGuidelineHistory(user_id: string): Observable<IGuideLineHistory> {
    const params = new HttpParams().set('user_id', user_id);
    return <Observable<IGuideLineHistory>>this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getUserBookmarksGuideLine`,
      {
        params,
      }
    );
  }

  /** Get Patient History */
  getPatientsHistory(user_id: string): Observable<IPatientHistory> {
    const params = new HttpParams().set('user_id', user_id);
    return <Observable<IPatientHistory>>this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getpatientHistory`,
      {
        params,
      }
    );
  }
  /** Get Protocol History */
  getProtocolsHistory(user_id: string): Observable<IUserHistory> {
    const params = new HttpParams().set('user_id', user_id);
    return <Observable<IUserHistory>>this._HttpClient.get(
      `${WEB_SITE_BASE_URL}getuserHistory`,
      {
        params,
      }
    );
  }
}
