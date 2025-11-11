import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Movement } from '@commons/entities/product/movement.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  movementsDetailCompletedSelector,
  movementsDetailResultsSelector,
  movementsDetailWorkingSelector
} from '@modules/movement/store/movement.selector';
import { PaymentCredit } from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { setCreditSelectedAction } from '@modules/payments/payment-credits/store/payment-credits.actions';
import { productFilterSelector } from '@modules/products/store/products.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductDetail } from './entities/product-detail.entity';
import {
  fetchProductDetailAction,
  fetchProductPayrollAdvanceAction,
  fetchProductPayrollAdvanceConfirmAction,
  setProductSelectedAction
} from './store/product-detail.actions';
import {
  productDetailCompletedSelector,
  productDetailDataPayrollAdvanceSelector,
  productDetailHasMovementsSelector,
  productDetailInfoSelector,
  productDetailWorkingSelector
} from './store/product-detail.selector';
import { ActivateProductSteps } from '@modules/security/security-media-activation/store/security-media.state';
import {
  activateProductSetStep,
  setMediaActivationType
} from '@modules/security/security-media-activation/store/security-media.action';
import { MediaActivationType } from '@modules/security/security-media-activation/entities/security-media.interface';

@Injectable()
export class ProductDetailFacade extends AppFacade {
  public productFilter$: Observable<number> = this.store.pipe(
    select(productFilterSelector)
  );

  public productDetail$: Observable<ProductDetail> = this.store.pipe(
    select(productDetailInfoSelector)
  );

  public productDetailPayrollAdvance$: Observable<ProductDetail> =
    this.store.pipe(select(productDetailDataPayrollAdvanceSelector));

  public working$: Observable<boolean> = this.store.pipe(
    select(productDetailWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(productDetailCompletedSelector)
  );

  public hasMovements$: Observable<boolean> = this.store.pipe(
    select(productDetailHasMovementsSelector)
  );

  public productMovements$: Observable<Movement[]> = this.store.pipe(
    select(movementsDetailResultsSelector)
  );

  public workingMovements$: Observable<boolean> = this.store.pipe(
    select(movementsDetailWorkingSelector)
  );

  public completedMovements$: Observable<boolean> = this.store.pipe(
    select(movementsDetailCompletedSelector)
  );

  public fetchProductDetail(productType: TypeAccount, id: string): void {
    this.store.dispatch(fetchProductDetailAction({ productType, id }));
  }

  public fetchProductPayrollAdvance(productNumber: string): void {
    this.store.dispatch(fetchProductPayrollAdvanceAction({ productNumber }));
  }

  public fetchProductPayrollAdvanceConfirm(
    productNumber: string,
    totalAmount: number
  ): void {
    this.store.dispatch(
      fetchProductPayrollAdvanceConfirmAction({ productNumber, totalAmount })
    );
  }

  public setProductSelected(product: ProductDetail): void {
    this.store.dispatch(setProductSelectedAction({ product }));
  }

  public setCreditSelected(creditSelected: PaymentCredit): void {
    this.store.dispatch(setCreditSelectedAction({ creditSelected }));
  }

  public setBlockProductStep(): void {
    this.store.dispatch(
      activateProductSetStep({ step: ActivateProductSteps.block })
    );
  }

  public setBlockMediaActivationType(): void {
    this.store.dispatch(
      setMediaActivationType({ mediaType: MediaActivationType.BlockCard })
    );
  }
}
