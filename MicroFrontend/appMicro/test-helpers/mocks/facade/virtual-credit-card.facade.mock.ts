import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import {
  VirtualCreditCard,
  VirtualCreditCardCreatePayload,
  VirtualCreditCardDetailPayload,
  VirtualCreditCardListPayload,
  VirtualCreditCardOperationPayload
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';

@Injectable()
export class VirtualCreditCardFacadeMock extends AppFacadeMock {
  public productSelectedDetail$: Observable<ProductDetail> =
    new BehaviorSubject(null);

  public productSelected$: Observable<ProductDetail> = new BehaviorSubject({
    franchise: 'VISA'
  });

  public virtualCreditCardList$: Observable<VirtualCreditCard[]> =
    new BehaviorSubject([]);

  public activateUrlBackTo$: Observable<string> = new BehaviorSubject('');

  public maxCardsLimit$: Observable<number> = new BehaviorSubject(2);

  public totalCardsCreated$: Observable<number> = new BehaviorSubject(1);

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public completed$: Observable<boolean> = new BehaviorSubject(true);

  public creditLimit$: Observable<number> = new BehaviorSubject(1);

  public fetchVirtualCreditCards(payload: VirtualCreditCardListPayload): void {}

  public fetchVirtualCreditCarDetail(
    payload: VirtualCreditCardDetailPayload
  ): void {}

  public createVirtualCreditCard(
    payload: VirtualCreditCardCreatePayload
  ): void {}

  public showFrequentQuestions(): void {}

  public showVirtualCreditCardUse(): void {}
  public cancelVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): void {}
  public reissueVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): void {}
  public editVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): void {}

  public setProductSelectedDetail(product: ProductDetail): void {}

  public setProductSelected(product: ProductDetail): void {}

  public setActivateUrlBackTo(url: string): void {}

  public setCreditLimit(creditLimit: number): void {}

  public resetVirtualCreditCards(): void {}
}
