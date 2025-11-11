import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import {
  CardDetail,
  DigitalCardStructureExt,
  PrepareCardEnrollmentDataPayload
} from '@modules/wallets/entities/wallets.interface';
import { CardCromalineMap } from '@store/state/parameter.state';

@Injectable()
export class WalletsFacadeMock extends AppFacadeMock {
  public cardList$: Observable<CardDetail[]> = new BehaviorSubject(null);

  public walletCardList$: Observable<DigitalCardStructureExt[]> =
    new BehaviorSubject([]);

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(true);

  public walletId$: Observable<string> = new BehaviorSubject('');

  public fetchCardList(): void {}

  public prepareCardsEnrollmentData(
    payload: PrepareCardEnrollmentDataPayload,
    cardNumber: string
  ): void {}

  public fetchPrepareCardEnrollmentData(
    payload: PrepareCardEnrollmentDataPayload,
    cardNumber: string
  ): void {}

  public validateAndPushCardAction(digitalCardId: string): void {}

  public cardCromalineMapByBin(bin: string): Observable<CardCromalineMap> {
    return new BehaviorSubject({
      bin: '42323',
      cromalineUrl: '',
      description: 'Epa la arepa',
      franchisee: 'Visa'
    });
  }
}
