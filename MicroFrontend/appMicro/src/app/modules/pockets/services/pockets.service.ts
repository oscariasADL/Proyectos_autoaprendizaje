import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { environment as ENV } from '@environment';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import {
  Pocket,
  PocketsComplete
} from '@modules/pockets/entities/pockets.interface';
import { CreatePocketPayload } from '@modules/pockets/pages/pocket-create/entities/pocket-create.interface';
import {
  PocketDetailPayload,
  PocketWithReturnsDetailPayload
} from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { TransferPocketPayload } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PocketMovementPayload,
  PocketMovementResponse
} from '@modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';
import { PocketMovement } from '@app/commons/entities/product/movement.interface';
import { CreatePocketWithReturnsPayload } from '../pages/pocket-create-with-returns/entities/create-pocket.interface';

@Injectable()
export class PocketsService {
  constructor(private http: HttpClient) {}

  public fetchPockets(): Observable<PocketsComplete> {
    const url = urlBuilder.services(ENV.api.services.pocket.all);
    return this.http.post<PocketsComplete>(url, {});
  }

  public fetchPocketDetail(payload: PocketDetailPayload): Observable<Pocket> {
    const url = urlBuilder.services(ENV.api.services.pocket.detail);

    return this.http.post<Pocket>(url, payload).pipe(
      map((pocket) => ({
        ...pocket,
        productIdParent: payload.parentId
      }))
    );
  }

  public fetchPocketDetailWithReturns(
    payload: PocketWithReturnsDetailPayload
  ): Observable<Pocket> {
    const url = urlBuilder.services(ENV.api.services.pocketWithReturns.detail);
    return this.http.post<Pocket>(url, payload);
  }

  public createPocket(
    payload: CreatePocketPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.pocket.create);

    return this.http.post<GenericResponse>(url, payload);
  }

  public createPocketWithReturns(
    payload: CreatePocketWithReturnsPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.pocketWithReturns.create);

    return this.http.post<GenericResponse>(url, payload);
  }

  public updatePocket(
    payload: UpdatePocketPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.pocket.create);

    return this.http.put<GenericResponse>(url, payload);
  }

  public updatePocketWithReturns(
    payload: UpdatePocketPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.pocketWithReturns.update);

    return this.http.post<GenericResponse>(url, payload);
  }

  public transferPocket(payload: TransferPocketPayload): Observable<any> {
    const url = urlBuilder.services(ENV.api.services.pocket.transfer);

    return this.http.post<GenericResponse>(url, payload);
  }

  public deletePocket(
    payload: PocketDetailPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.pocket.delete, {
      parent_account_type: payload.parentIdType,
      parent_account_id: payload.parentId,
      pocket_type: payload.pocketType,
      pocket_id: payload.pocketId
    });

    return this.http.delete<GenericResponse>(url);
  }

  public movementsPocket(
    payload: PocketMovementPayload
  ): Observable<PocketMovement[]> {
    const url = urlBuilder.services(ENV.api.services.pocket.movements);

    return this.http
      .post<PocketMovementResponse>(url, payload)
      .pipe(map((response) => response?.movementList || []));
  }
}
