import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_URL';
import { from, Observable } from 'rxjs';
import {
  IBookMarkAddBody,
  IBookMarkDelete,
  IBookMarks,
  IUserId,
} from '../../interfaces/bookmarks/IBookMarks';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor(private _HttpClient: HttpClient) {}

  getBookmarks(user_id: number): Observable<IBookMarks> {
    let params = new HttpParams();
    params.set('user_id', user_id);
    return <Observable<IBookMarks>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}getUserBookmarks`, { params })
    );
  }

  addBookmark(data: IBookMarkAddBody): Observable<any> {
    return this._HttpClient.post(
      `${WEB_SITE_BASE_URL}submitUserBookmarks`,
      data
    );
  }

  deleteBookmark(data: IBookMarkDelete): Observable<any> {
    let params = new HttpParams();
    params = params.set('bookmark_id', data.bookmark_id);
    params = params.set('user_id', data.user_id);

    return this._HttpClient.post(
      `${WEB_SITE_BASE_URL}submitUserBookmarkStatus`,
      {},
      { params }
    );
  }
}
