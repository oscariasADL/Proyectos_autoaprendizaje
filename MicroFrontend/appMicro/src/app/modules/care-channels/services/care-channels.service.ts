import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import { Adviser } from '../entities/adviser.interface';

@Injectable()
export class CareChannelsService {
  constructor(private http: HttpClient) {}

  public fetchAdvisor(): Observable<Adviser> {
    const url = urlBuilder.services(
      ENV.api.services.management.preferred_customer
    );
    return this.http.get<Adviser>(url);
  }
}
