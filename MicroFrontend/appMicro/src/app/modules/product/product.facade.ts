import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Product } from '@commons/entities/product/product.interface';
import {
  fetchProductsAction,
  fetchProductsWithoutReloadAction,
  resetFirstCallTCAction,
  setHiddenBalanceAction
} from '@modules/product/store/product.actions';
import {
  balanceWorkingSelector,
  completedTCSelector,
  firstCallSelector,
  firstCallTCSelector,
  hiddenBalanceSelector,
  productsByCategory,
  workingHiddenBalanceSelector,
  workingTCSelector
} from '@modules/product/store/product.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ProductFacade extends AppFacade {
  public products$: Observable<Product[]> = this.store.pipe(
    select(productsByCategory)
  );

  public balanceWorking$: Observable<boolean> = this.store.pipe(
    select(balanceWorkingSelector)
  );

  public workingTC$: Observable<boolean> = this.store.pipe(
    select(workingTCSelector)
  );

  public completedTC$: Observable<boolean> = this.store.pipe(
    select(completedTCSelector)
  );

  public hiddenBalance$: Observable<boolean> = this.store.pipe(
    select(hiddenBalanceSelector)
  );

  public workingHiddenBalance$: Observable<boolean> = this.store.pipe(
    select(workingHiddenBalanceSelector)
  );

  public firstCall$: Observable<boolean> = this.store.pipe(
    select(firstCallSelector)
  );

  public firstCallTC$: Observable<boolean> = this.store.pipe(
    select(firstCallTCSelector)
  );

  public fetchProducts(): void {
    this.store.dispatch(fetchProductsAction());
  }

  public fetchProductsWithoutReload(): void {
    this.store.dispatch(fetchProductsWithoutReloadAction());
  }

  public setHiddenBalance(hiddenBalance: boolean): void {
    this.store.dispatch(setHiddenBalanceAction({ hiddenBalance }));
  }

  public resetFirstCallTC(): void {
    this.store.dispatch(resetFirstCallTCAction());
  }
}
