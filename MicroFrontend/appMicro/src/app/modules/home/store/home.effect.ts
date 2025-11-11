import { Injectable } from '@angular/core';
import { ProductService } from '@app/modules/product/services/product.service';
import {
  fetchAvalStocksAction,
  fetchTuplusProductsAction
} from '@modules/aval/store/aval.actions';
import * as actions from '@modules/product/store/product.actions';
import {
  fetchProductsNicknamesAction,
  fetchProductSpiUserKeysAction
} from '@modules/product/store/product.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap
} from 'rxjs/operators';

import { AppFacade } from '@app/app.facade';
import { MICROFRONTEND_TOPICS } from '@app/commons/constants/microfrontend-events.constants';
import { avalBanks } from '@app/commons/constants/aval-banks.constans';
import {
  ProcessType,
  SPIAuthTxPublish,
  TxServiceResponse
} from '../entities/spi-channel.entities';

@Injectable()
export class HomeEffect {
  constructor(
    private actions$: Actions,
    private service: ProductService,
    private facade: AppFacade
  ) {}

  fetchProductsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchProductsSuccessAction),
      mergeMap(() => [
        fetchProductsNicknamesAction(),
        fetchProductSpiUserKeysAction(),
        fetchTuplusProductsAction(),
        fetchAvalStocksAction()
      ])
    )
  );

  rsaSPITxEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TxEvalTriggerAction),
      switchMap(({ payload }) => {
        if (
          [ProcessType.spiKeyLock, ProcessType.spiKeyExtendLock].includes(
            payload.process as ProcessType
          )
        ) {
          return this.service.rsaSpiBlockTransaction(payload).pipe(
            map((serviceResponse: TxServiceResponse) => ({
              originalPayload: payload,
              serviceResponse
            }))
          );
        }
        return this.service.rsaSpiTransaction(payload).pipe(
          map((serviceResponse: TxServiceResponse) => ({
            originalPayload: payload,
            serviceResponse
          }))
        );
      }),
      map(({ originalPayload, serviceResponse }) => {
        const SPITransactionAuthorized = this.facade.eventBus.accessTopic(
          MICROFRONTEND_TOPICS.SPI_TRANSACTION_AUTHORIZED
        );

        const event: SPIAuthTxPublish = {
          ResponsePayload: {
            process: originalPayload.process,
            origin: avalBanks.BAVV.name,
            timestamp: serviceResponse.timestamp,
            channel: originalPayload.channel,
            data: {
              transactionId: originalPayload.transactionId,
              action: serviceResponse.action
            }
          },
          hash: originalPayload.hash,
          signed: serviceResponse.signed
        };
        SPITransactionAuthorized.publish(event);

        return actions.TxEvalSuccessAction();
      }),
      catchError((error) => of(actions.TxEvalErrorAction()))
    )
  );
}
