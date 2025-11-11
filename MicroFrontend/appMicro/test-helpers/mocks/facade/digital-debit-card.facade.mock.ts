import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { GenericResponse } from '@commons/entities/response/response.interface';
import {
  DigitalDebitCardCreatePayload,
  DigitalDebitCardEditPayload
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DigitalDebitCardFacadeMock extends AppFacadeMock {
  public showDigitalDebitCardPanel$: Observable<boolean> = new BehaviorSubject(
    true
  );

  public createDigitalDebitCardResponse$: Observable<GenericResponse> =
    new BehaviorSubject(null);

  public products$: Observable<Product[]> = new BehaviorSubject(null);

  public fetchDigitalDebitCards(): void {}

  public createDigitalDebitCard(payload: DigitalDebitCardCreatePayload): void {}

  public editDigitalDebitCard(payload: DigitalDebitCardEditPayload): void {}

  public cancelDigitalDebitCard(payload: DigitalDebitCardCreatePayload): void {}

  public reissueDigitalDebitCard(
    payload: DigitalDebitCardCreatePayload
  ): void {}

  public showDigitalDebitCardUse(): void {}

  public showFrequentQuestions(): void {}

  public setProductSelected(product: Product): void {}

  public setActivateUrlBackTo(url: string): void {}
}
