import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IProtocolSubCategoriesBody } from '../../interfaces/protocols/IProtocolSubCategoriesBody';
import { IProtocolsSubCategories } from '../../interfaces/protocols/IProtocolsSubCategories';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
      user_id = localStorage.getItem('user_id');
    }

    const params = new HttpParams()
      .set('id', id as string)
      .set('user_id', user_id as string);

    return <Observable<IProtocolsSubCategories>>(
      this._HttpClient.get(
        `https://digitalbondmena.com/healthcareapi/api/getprotocols/${id}`,
        { params }
      )
    );
  }
}
