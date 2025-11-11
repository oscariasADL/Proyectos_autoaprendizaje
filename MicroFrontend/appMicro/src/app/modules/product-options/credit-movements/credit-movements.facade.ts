import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { productSelectedSelector } from '@modules/product-detail/store/product-detail.selector';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { DirectedPaymentPayload } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { UpdateInstallmentsPayload } from '@modules/product-options/credit-movements/pages/update-installments/entities/update-installments.interface';
import {
  directedPaymentAction,
  fetchCreditMovementsAction,
  updateInstallmentsAction
} from '@modules/product-options/credit-movements/store/credit-movements.action';
import {
  creditMovementsCompletedSelectors,
  creditMovementsSelectors,
  creditMovementsWorkingSelectors
} from '@modules/product-options/credit-movements/store/credit-movements.selector';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '@commons/entities/product/product.interface';
import { productsSelectorV2 } from '@modules/product/store/product.selector';
import { TypeAccount } from '@commons/entities/product/type-account';

@Injectable()
export class CreditMovementsFacade extends AppFacade {
  public products$: Observable<Product[]> = this.store.pipe(
    select(
      productsSelectorV2({
        typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
      })
    )
  );

  public productSelected$: Observable<ProductDetail> = this.store.pipe(
    select(productSelectedSelector)
  );

  public creditMovements$: Observable<CreditMovement[]> = this.store.pipe(
    select(creditMovementsSelectors)
  );

  public creditMovementsWorking$: Observable<boolean> = this.store.pipe(
    select(creditMovementsWorkingSelectors)
  );

  public creditMovementsCompleted$: Observable<boolean> = this.store.pipe(
    select(creditMovementsCompletedSelectors)
  );

  public fetchCreditMovements(productId: string): void {
    this.store.dispatch(fetchCreditMovementsAction({ productId }));
  }

  public directedPayment(
    payload: DirectedPaymentPayload[],
    data: AlertStepData
  ): void {
    this.store.dispatch(directedPaymentAction({ payload, data }));
  }

  public updateInstallments(
    payload: UpdateInstallmentsPayload,
    data: AlertStepData
  ): void {
    this.store.dispatch(updateInstallmentsAction({ payload, data }));
  }
}
