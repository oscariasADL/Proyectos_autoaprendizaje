import { Injectable } from '@angular/core';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { DirectedPaymentPayload } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { UpdateInstallmentsPayload } from '@modules/product-options/credit-movements/pages/update-installments/entities/update-installments.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { CreditMovementFactory } from '@testing/factories/credit-movements.factory';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '@commons/entities/product/product.interface';

@Injectable()
export class CreditMovementsFacadeMock extends AppFacadeMock {
  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public productSelected$: Observable<ProductDetail> = new BehaviorSubject(
    null
  );

  public creditMovements$: Observable<CreditMovement[]> = new BehaviorSubject(
    new CreditMovementFactory().createBulk(3)
  );

  public creditMovementsWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public creditMovementsCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchCreditMovements(productId: string): void {}

  public directedPayment(
    payload: DirectedPaymentPayload,
    data: AlertStepData
  ): void {}

  public updateInstallments(
    payload: UpdateInstallmentsPayload,
    data: AlertStepData
  ): void {}
}
