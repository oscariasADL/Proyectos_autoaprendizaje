import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  CustomizeAvalTagPayload,
  CustomizeAvalTagResponse
} from '@modules/product-options/customize-aval-tag/entities/customize-aval-tag.interface';

@Injectable()
export class CustomizeAvalTagService {
  constructor(private http: HttpClient) {}

  public modifyAvalTag(
    payload: CustomizeAvalTagPayload
  ): Observable<CustomizeAvalTagResponse> {
    const url = urlBuilder.services(ENV.api.services.base.modify_aval_tag);
    return this.http.post<CustomizeAvalTagResponse>(url, payload);
  }
}
