import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import {
  Favorite,
  FavoriteDeletePayload,
  FavoritePayload
} from '@modules/favorites/entities/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(private http: HttpClient) {}

  public fetchFavorites(): Observable<Favorite[]> {
    const url = urlBuilder.services(ENV.api.services.favorites.base);

    return this.http.get<Favorite[]>(url);
  }

  public fetchFavoriteDetail(keyFavorite: string): Observable<Favorite> {
    const url = urlBuilder.services(
      `${ENV.api.services.favorites.detail}/${keyFavorite}`
    );

    return this.http.get<Favorite>(url);
  }

  public createFavorite(payload: FavoritePayload): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.favorites.base);

    return this.http.post<GenericResponse>(url, payload);
  }

  public updateFavorite(payload: FavoritePayload): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.favorites.base);

    return this.http.put<GenericResponse>(url, payload);
  }

  public deleteFavorite(
    payload: FavoriteDeletePayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.favorites.delete);
    return this.http.put<GenericResponse>(url, payload);
  }
}
