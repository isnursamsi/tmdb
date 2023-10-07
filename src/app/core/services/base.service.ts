import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  public getDataWithToken(
    url: string,
    paramsRequest?: any,
    requestHeaders?: any
  ): Observable<any> {
    var headers = new HttpHeaders({
      ...requestHeaders,
    });

    var params = this.generateHttpParam(paramsRequest);
    return this.httpClient.get(url, { headers, params });
  }

  public generateHttpParam(param: any): HttpParams {
    let result = new HttpParams();

    if (param) {
      Object.keys(param).forEach((key) => {
        if (
          param[key] !== null &&
          param[key] !== undefined &&
          param[key] !== ''
        ) {
          result = result.set(key, param[key]);
        }
      });
    }

    return result;
  }
}
