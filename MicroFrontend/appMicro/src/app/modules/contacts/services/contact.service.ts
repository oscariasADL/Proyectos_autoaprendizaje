import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Contact,
  ContactId,
  ContactParams,
  ContactProduct,
  ContactProductFilter
} from '../entities/contact.interface';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  public fetchContacts(contactParams: ContactParams): Observable<Contact[]> {
    const url = urlBuilder.services(ENV.api.services.contact.all);

    let params = new HttpParams();
    Object.keys(contactParams).forEach(
      (key) => (params = params.set(key, contactParams[key]))
    );

    return this.http
      .get<{ contacts: Contact[] }>(url, { params })
      .pipe(map((data: { contacts: Contact[] }) => data.contacts));
  }

  public fetchContactProducts(data: ContactId): Observable<ContactProduct[]> {
    const url = urlBuilder.services(ENV.api.services.contact.products);

    return this.http
      .post<{ products: ContactProduct[] }>(url, {
        contactId: data,
        filterBy: data.filter || ContactProductFilter.ALL
      })
      .pipe(
        map((response: { products: ContactProduct[] }) => response.products)
      );
  }

  public addProductToContact(data: Contact): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.contact.add_product);

    return this.http.post<GenericResponse>(url, data);
  }

  /*public createContact(contact: ContactEntity): Observable<GenericResponse> {
    const url = urlBuilder.services(
      contact.products.length > 0
        ? ENV.api.services.contact.all
        : ENV.api.services.contact.basic
    );

    return this.http.post<GenericResponse>(url, { contact });
  }

  public updateContactProductNickname(
    payload: ContactProductNicknameI,
    isNewNickname: boolean,
    prevNickname: string
  ): Observable<GenericResponse> {
    let url = urlBuilder.services(
      ENV.api.services.contact.update_product_nickname
    );
    if (!isNewNickname) {
      url = url + `?prevNickname=${prevNickname}`;
      return this.http.put<GenericResponse>(url, payload);
    }
    return this.http.post<GenericResponse>(url, payload);
  }

  public updateContactNickname(
    payload: ContactNicknameI
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.contact.all);

    return this.http.put<GenericResponse>(url, payload);
  }*/
}
