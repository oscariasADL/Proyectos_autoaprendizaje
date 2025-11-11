import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Product } from '@commons/entities/product/product.interface';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import {
  Pocket,
  PocketsComplete,
  PocketTypeEnum
} from '@modules/pockets/entities/pockets.interface';
import { CreatePocketPayload } from '@modules/pockets/pages/pocket-create/entities/pocket-create.interface';
import { pocketCreateAction } from '@modules/pockets/pages/pocket-create/store/pocket-create.actions';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { pocketDetailDataSelector } from '@modules/pockets/pages/pocket-detail/store/pocket-detail.selector';
import { pocketEditAction } from '@modules/pockets/pages/pocket-edit/store/pocket-edit.actions';
import { pocketPayAction } from '@modules/pockets/pages/pocket-pay/store/pocket-pay.actions';
import { TransferPocketPayload } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';
import { pocketTransferAction } from '@modules/pockets/pages/pocket-transfer/store/pocket-transfer.actions';
import { fetchPocketsAction } from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import {
  pocketsCompletedSelector,
  pocketsHomeSelector,
  pocketsWorkingSelector
} from '@modules/pockets/pages/pockets-home/store/pockets-home.selector';
import { productsSelector } from '@modules/product/store/product.selector';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { pocketDetailWithReturnsSelector } from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.selector';
import { CreatePocketAction } from './pages/pocket-create-with-returns/store/create-pocket-with-returns.action';
import { CreatePocketWithReturnsPayload } from './pages/pocket-create-with-returns/entities/create-pocket.interface';

@Injectable()
export class PocketsFacade extends AppFacade {
  public pockets$: Observable<PocketsComplete> = this.store.pipe(
    select(pocketsHomeSelector)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(pocketsWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(pocketsCompletedSelector)
  );

  public pocket$: Observable<Pocket> = this.store.pipe(
    select(pocketDetailDataSelector)
  );

  public pocketWithReturns$: Observable<Pocket> = this.store.pipe(
    select(pocketDetailWithReturnsSelector)
  );

  public product$: Observable<Product> = this.store.pipe(
    select(productsSelector()),
    withLatestFrom(this.pocket$),
    map(([products, pocket]) =>
      products?.find(
        (product: Product) =>
          product.id.toString() === pocket.productIdParent.toString()
      )
    )
  );
  public products$: Observable<Product[]> = this.store.pipe(
    select(productsSelector())
  );

  public fetchPockets(): void {
    this.store.dispatch(fetchPocketsAction());
  }

  public createPocket(payload: CreatePocketPayload, data: AlertStepData): void {
    this.store.dispatch(pocketCreateAction({ payload, data }));
  }

  public updatePocket(
    payload: UpdatePocketPayload,
    detail: PocketDetailPayload,
    backUrl: string
  ): void {
    this.store.dispatch(pocketEditAction({ payload, detail, backUrl }));
  }

  public transferPocket(
    payload: TransferPocketPayload,
    detail: PocketDetailPayload,
    pocketType: PocketTypeEnum,
    backUrl: string
  ): void {
    this.store.dispatch(
      pocketTransferAction({ payload, detail, backUrl, pocketType })
    );
  }

  public payPocket(
    payload: TransferPocketPayload,
    pocket: Pocket,
    backUrl: string
  ): void {
    this.store.dispatch(pocketPayAction({ payload, pocket, backUrl }));
  }

  public createPocketWithReturns(
    payload: CreatePocketWithReturnsPayload,
    data: AlertStepData
  ): void {
    this.store.dispatch(CreatePocketAction({ payload, data }));
  }
}
