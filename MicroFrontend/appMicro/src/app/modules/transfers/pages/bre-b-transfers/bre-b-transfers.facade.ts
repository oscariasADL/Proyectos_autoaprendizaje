import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { productsSelectorV2 } from '@app/modules/product/store/product.selector';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { Product } from '@app/commons/entities/product/product.interface';
import {
  clearTowardAvalKey,
  fetchAccountKeyAction,
  fetchGMFAction,
  fetchSpiContactAction,
  initiateTransferFromSpiChannel,
  setAddSpiContactPayload,
  transferAction
} from './store/bre-b-transfers.actions';
import {
  breBAccountKeyCompletedSelector,
  breBAccountKeyWorkingSelector,
  breBSpiKeyDataSelector,
  breBKeySelector,
  breBAddSpiContactPayloadSelector,
  breBSpiContactSelector,
  gmfSelector
} from './store/bre-b-transfers.selector';
import { AlertStepData } from '@app/modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransferPayload } from '@app/modules/transfers/entities/transfers.interface';
import {
  AddSpiContactPayload,
  SpiContact
} from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import { GMFData, GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

@Injectable()
export class BreBTransfersFacade extends AppFacade {
  public products$: Observable<Product[]> = this.store.pipe(
    select(
      productsSelectorV2({
        typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
        excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
      })
    )
  );

  public brebKey$: Observable<string> = this.store.pipe(
    select(breBKeySelector)
  );

  public breBSpiKeyData$: Observable<TransferSpiUserKey> = this.store.pipe(
    select(breBSpiKeyDataSelector)
  );

  public brebBAccountKeyWorking$: Observable<boolean> = this.store.pipe(
    select(breBAccountKeyWorkingSelector)
  );

  public brebBAccountKeyCompleted$: Observable<boolean> = this.store.pipe(
    select(breBAccountKeyCompletedSelector)
  );

  public breBAddSpiContactPayload$: Observable<AddSpiContactPayload> =
    this.store.pipe(select(breBAddSpiContactPayloadSelector));

  public breBSpiContact$: Observable<SpiContact> = this.store.pipe(
    select(breBSpiContactSelector)
  );

  public initiateTransferFromSpiChannel(spiKey: string): void {
    this.store.dispatch(initiateTransferFromSpiChannel({ spiKey }));
  }

  public fetchAccount(spiKey: string): void {
    this.store.dispatch(fetchAccountKeyAction({ spiKey }));
  }

  public transfer(payload: TransferPayload, data: AlertStepData): void {
    this.store.dispatch(transferAction({ payload, data }));
  }

  public clearTowardAvalKey(): void {
    this.store.dispatch(clearTowardAvalKey());
  }

  public setAddSpiContactPayload(payload: AddSpiContactPayload): void {
    this.store.dispatch(setAddSpiContactPayload({ payload }));
  }

  public fetchSpiContact(contactKey: string): void {
    this.store.dispatch(fetchSpiContactAction({ contactKey }));
  }

  public fetchGMF(payload: GMFPayload): void {
    this.store.dispatch(fetchGMFAction({ payload }));
  }
  public gmf$: Observable<GMFData> = this.store.pipe(select(gmfSelector));
}
