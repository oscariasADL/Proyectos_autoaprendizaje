import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Product } from '@commons/entities/product/product.interface';
import { GenericResponse } from '@commons/entities/response/response.interface';
import {
  DigitalDebitCardCreatePayload,
  DigitalDebitCardEditPayload
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import {
  createDigitalDebitCardAction,
  editDigitalDebitCardAction,
  fetchDigitalDebitCardsAction,
  reissueDigitalDebitCardAction,
  setActivateUrlBackTo,
  setProductSelected,
  cancelDigitalDebitCardAction,
  showDigitalDebitCardUseAction,
  showFrequentQuestionsAction
} from '@modules/digital-debit-card/store/digital-debit-card.actions';
import {
  createDigitalDebitCardResponseSelector,
  digitalDebitCardActivateUrlBackToSelector,
  digitalDebitCardProductSelectedSelector,
  digitalDebitCardProductsSelector,
  showDigitalDebitCardPanelSelector
} from '@modules/digital-debit-card/store/digital-debit-card.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class DigitalDebitCardFacade extends AppFacade {
  public createDigitalDebitCardResponse$: Observable<GenericResponse> =
    this.store.pipe(select(createDigitalDebitCardResponseSelector));

  public products$: Observable<Product[]> = this.store.pipe(
    select(digitalDebitCardProductsSelector)
  );

  public activateUrlBackTo$: Observable<string> = this.store.pipe(
    select(digitalDebitCardActivateUrlBackToSelector)
  );

  public productSelected$: Observable<Product> = this.store.pipe(
    select(digitalDebitCardProductSelectedSelector)
  );

  public fetchDigitalDebitCards(): void {
    this.store.dispatch(fetchDigitalDebitCardsAction());
  }

  public createDigitalDebitCard(payload: DigitalDebitCardCreatePayload): void {
    this.store.dispatch(createDigitalDebitCardAction({ payload }));
  }

  public editDigitalDebitCard(payload: DigitalDebitCardEditPayload): void {
    this.store.dispatch(editDigitalDebitCardAction({ payload }));
  }

  public cancelDigitalDebitCard(payload: DigitalDebitCardCreatePayload): void {
    this.store.dispatch(cancelDigitalDebitCardAction({ payload }));
  }

  public reissueDigitalDebitCard(payload: DigitalDebitCardCreatePayload): void {
    this.store.dispatch(reissueDigitalDebitCardAction({ payload }));
  }

  public showDigitalDebitCardUse(): void {
    this.store.dispatch(showDigitalDebitCardUseAction());
  }

  public showFrequentQuestions(): void {
    this.store.dispatch(showFrequentQuestionsAction());
  }

  public showDigitalDebitCardPanel$: Observable<boolean> = this.store.pipe(
    select(showDigitalDebitCardPanelSelector)
  );

  public setProductSelected(product: Product): void {
    this.store.dispatch(setProductSelected({ product }));
  }

  public setActivateUrlBackTo(url: string): void {
    this.store.dispatch(setActivateUrlBackTo({ url }));
  }
}
