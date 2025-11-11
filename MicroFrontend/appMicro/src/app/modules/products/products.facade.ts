import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Balance } from '@commons/entities/product/balance.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { hasBalanceSelector } from '@modules/product/store/product.selector';
import {
  productFilterSelector,
  productsFiltered,
  productTypeCategoriesSelector
} from '@modules/products/store/products.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsFacade extends AppFacade {
  public balances$: Observable<Balance[]> = this.store.pipe(
    select(productsFiltered)
  );

  public hasProducts$: Observable<boolean> = this.store.pipe(
    select(hasBalanceSelector)
  );

  public filter$: Observable<number> = this.store.pipe(
    select(productFilterSelector)
  );

  public productTypeCategories$: Observable<DropdownList[]> = this.store.pipe(
    select(productTypeCategoriesSelector)
  );
}
