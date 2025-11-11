import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import {
  Pocket,
  PocketsComplete,
  PocketTypeEnum
} from '@modules/pockets/entities/pockets.interface';
import { CreatePocketPayload } from '@modules/pockets/pages/pocket-create/entities/pocket-create.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { TransferPocketPayload } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { PocketFactory } from '@testing/factories/pocket.factory';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';
import { CreatePocketWithReturnsPayload } from '@app/modules/pockets/pages/pocket-create-with-returns/entities/create-pocket.interface';
import { AccountAvalKey } from '@app/modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { TransferPayload } from '@app/modules/transfers/entities/transfers.interface';
import { AddSpiContactPayload } from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';

const pocket: Pocket = new PocketFactory().create();

@Injectable()
export class BreBTransferFacadeMock extends AppFacadeMock {
  public brebKey$: Observable<string> = new BehaviorSubject('');

  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public breBAccountKey$: Observable<AccountAvalKey> = new BehaviorSubject(
    null
  );

  public brebBAccountKeyWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public brebBAccountKeyCompleted$: Observable<boolean> = new BehaviorSubject(
    true
  );

  public initiateTransferFromSpiChannel(spiKey: string): void {}

  public fetchAccount(spiKey: string): void {}

  public transfer(
    payload: TransferPayload,
    data: AlertStepData,
    message: string
  ): void {}

  public clearTowardAvalKey(): void {}

  public setAddSpiContactPayload(payload: AddSpiContactPayload): void {}
}
