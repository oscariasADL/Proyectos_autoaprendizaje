import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import * as actions from '@modules/virtual-credit-card/store/virtual-credit-card.actions';
import { AppFacade } from '@app/app.facade';
import {
  virtualCreditCardActivateUrlBackToSelector,
  virtualCreditCardCompletedSelector,
  virtualCreditCardCreditLimitSelector,
  virtualCreditCardListSelector,
  virtualCreditCardMaxCardsLimitSelector,
  virtualCreditCardProductSelected,
  virtualCreditCardTotalCardsCreated,
  virtualCreditCardWorkingSelector
} from '@modules/virtual-credit-card/store/virtual-credit-card.selector';
import { productSelectedSelector } from '@modules/product-detail/store/product-detail.selector';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { setProductSelectedAction } from '@modules/product-detail/store/product-detail.actions';
import {
  VirtualCreditCard,
  VirtualCreditCardCreatePayload,
  VirtualCreditCardDetailPayload,
  VirtualCreditCardListPayload,
  VirtualCreditCardOperationPayload
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';

@Injectable()
export class VirtualCreditCardFacade extends AppFacade {
  public productSelectedDetail$: Observable<ProductDetail> = this.store.pipe(
    select(productSelectedSelector)
  );

  public productSelected$: Observable<ProductDetail> = this.store.pipe(
    select(virtualCreditCardProductSelected)
  );

  public virtualCreditCardList$: Observable<VirtualCreditCard[]> =
    this.store.pipe(select(virtualCreditCardListSelector));

  public activateUrlBackTo$: Observable<string> = this.store.pipe(
    select(virtualCreditCardActivateUrlBackToSelector)
  );

  public maxCardsLimit$: Observable<number> = this.store.pipe(
    select(virtualCreditCardMaxCardsLimitSelector)
  );

  public totalCardsCreated$: Observable<number> = this.store.pipe(
    select(virtualCreditCardTotalCardsCreated)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(virtualCreditCardWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(virtualCreditCardCompletedSelector)
  );

  public creditLimit$: Observable<number> = this.store.pipe(
    select(virtualCreditCardCreditLimitSelector)
  );

  public fetchVirtualCreditCards(payload: VirtualCreditCardListPayload): void {
    this.store.dispatch(actions.fetchVirtualCreditCardsAction({ payload }));
  }

  public fetchVirtualCreditCarDetail(
    payload: VirtualCreditCardDetailPayload
  ): void {
    this.store.dispatch(
      actions.fetchVirtualCreditCardDetailAction({
        payload,
        alertSuccess: null
      })
    );
  }

  public createVirtualCreditCard(
    payload: VirtualCreditCardCreatePayload
  ): void {
    this.store.dispatch(actions.createVirtualCreditCardAction({ payload }));
  }

  public showFrequentQuestions(): void {
    this.store.dispatch(actions.showFrequentQuestionsAction());
  }

  public showVirtualCreditCardUse(): void {
    this.store.dispatch(actions.showVirtualCreditCardUseAction());
  }

  public cancelVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): void {
    this.store.dispatch(actions.cancelVirtualCreditCardAction({ payload }));
  }

  public reissueVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): void {
    this.store.dispatch(actions.reissueVirtualCreditCardAction({ payload }));
  }

  public editVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): void {
    this.store.dispatch(actions.editVirtualCreditCardAction({ payload }));
  }

  public setProductSelectedDetail(product: ProductDetail): void {
    this.store.dispatch(setProductSelectedAction({ product }));
  }

  public setProductSelected(product: ProductDetail): void {
    this.store.dispatch(actions.setProductSelected({ product }));
  }

  public setActivateUrlBackTo(url: string): void {
    this.store.dispatch(actions.setActivateUrlBackTo({ url }));
  }

  public setCreditLimit(creditLimit: number): void {
    this.store.dispatch(actions.setCreditLimitAction({ creditLimit }));
  }

  public resetVirtualCreditCards(): void {
    this.store.dispatch(actions.resetVirtualCreditCardsAction());
  }
}
