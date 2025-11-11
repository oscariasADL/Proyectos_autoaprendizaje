import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RandomKeyPayload,
  RandomKeyResponse
} from '../entities/customize-aval-tag.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RandomKeyService {
  constructor(private http: HttpClient) {}

  public getRandomKey(
    payload: RandomKeyPayload
  ): Observable<RandomKeyResponse> {
    const url = urlBuilder.services(ENV.api.services.base.suggest_keys);
    return this.http.post<RandomKeyResponse>(url, payload);
  }
}
