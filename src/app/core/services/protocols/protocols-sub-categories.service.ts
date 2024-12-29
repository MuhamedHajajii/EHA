import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IProtocolSubCategoriesBody } from '../../interfaces/protocols/IProtocolSubCategoriesBody';
import { IProtocolsSubCategories } from '../../interfaces/protocols/IProtocolsSubCategories';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { WEB_SITE_BASE_URL } from '../../constants/WEB_SITE_BASE_URL';

@Injectable({
  providedIn: 'root',
})
export class ProtocolsSubCategoriesService {
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object
  ) {}

  getAllProtocols(id: string): Observable<IProtocolsSubCategories> {
    let user_id;
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      user_id = localStorage.getItem('userId');
    }

    const params = new HttpParams()
      .set('id', +id)
      .set('user_id', user_id as string);

    console.log(params);

    return <Observable<IProtocolsSubCategories>>(
      this._HttpClient.get(`${WEB_SITE_BASE_URL}getprotocols/${id}`, { params })
    );
  }
}
