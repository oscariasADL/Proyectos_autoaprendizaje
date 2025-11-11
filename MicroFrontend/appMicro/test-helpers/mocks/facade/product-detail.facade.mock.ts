import { Injectable } from '@angular/core';
import { Movement } from '@commons/entities/product/movement.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { PaymentCredit } from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductDetailFacadeMock extends AppFacadeMock {
  public productFilter$: Observable<number> = new BehaviorSubject(0);

  public productDetail$: Observable<ProductDetail> = new BehaviorSubject(null);

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public hasMovements$: Observable<boolean> = new BehaviorSubject(false);

  public productMovements$: Observable<Movement[]> = new BehaviorSubject([]);

  public workingMovements$: Observable<boolean> = new BehaviorSubject(false);

  public completedMovements$: Observable<boolean> = new BehaviorSubject(false);

  public fetchProductDetail(productType: TypeAccount, id: string): void {}

  public fetchProductPayrollAdvance(numberProduct: string): void {}

  public fetchProductPayrollAdvanceConfirm(
    numberProduct: string,
    amount: number
  ): void {}

  public setProductSelected(product: ProductDetail): void {}

  public setCreditSelected(creditSelected: PaymentCredit): void {}

  public setBlockProductStep(): void {}

  public setBlockMediaActivationType(): void {}
}
