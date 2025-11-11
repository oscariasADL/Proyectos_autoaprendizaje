import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProductFacadeMock extends AppFacadeMock {
  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public balanceWorking$: Observable<boolean> = new BehaviorSubject(false);

  public hiddenBalance$: Observable<boolean> = new BehaviorSubject(false);
  public firstCall$: Observable<boolean> = new BehaviorSubject(false);
  public firstCallTC$: Observable<boolean> = new BehaviorSubject(false);
  public workingTC$: Observable<boolean> = new BehaviorSubject(false);
  public completedTC$: Observable<boolean> = new BehaviorSubject(false);

  public workingHiddenBalance$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchProducts(): void {}
  public fetchProductsWithoutReload(): void {}
  public resetFirstCallTC(): void {}
  public setHiddenBalance(hiddenBalance: boolean): void {}
}
