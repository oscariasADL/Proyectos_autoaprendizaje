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

const pocket: Pocket = new PocketFactory().create();

@Injectable()
export class PocketsFacadeMock extends AppFacadeMock {
  public pockets$: Observable<PocketsComplete> = new BehaviorSubject({
    pockets: [],
    totalActive: '',
    totalPaused: '',
    totalCompleted: '',
    totalBalance: '',
    profitabilityPockets: [],
    traditionalPockets: []
  });

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(true);

  public pocket$: Observable<Pocket> = new BehaviorSubject(pocket);

  public product$: Observable<Product> = new BehaviorSubject(null);

  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public fetchPockets(): void {}

  public createPocket(
    payload: CreatePocketPayload,
    data: AlertStepData
  ): void {}

  public updatePocket(
    payload: UpdatePocketPayload,
    detail: PocketDetailPayload,
    backUrl: string
  ): void {}

  public transferPocket(
    payload: TransferPocketPayload,
    detail: PocketDetailPayload,
    backUrl: string,
    pocketType: PocketTypeEnum
  ): void {}

  public payPocket(
    payload: TransferPocketPayload,
    detail: Pocket,
    backUrl: string
  ): void {}

  public createPocketWithReturns(
    payload: CreatePocketWithReturnsPayload,
    data: AlertStepData
  ): void {}
}
