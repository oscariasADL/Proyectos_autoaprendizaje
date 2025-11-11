import { Component } from '@angular/core';
import { HomeFacade } from '@modules/home/home.facade';
import { Observable } from 'rxjs';
import { ProductFacade } from '../../product.facade';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-credit-products-error',
  templateUrl: './product-credit-products-error.component.html',
  styleUrls: ['./product-credit-products-error.component.sass']
})
export class ProductCreditProductsErrorComponent {
  constructor(private facade: ProductFacade, private homeFacade: HomeFacade) {}

  public retryGetProducts(): void {
    this.firstCallTC$.pipe(take(1)).subscribe((firstCall) => {
      if (!firstCall) {
        this.facade.fetchProductsWithoutReload();
      }
    });
  }

  get hasCreditProductError$(): Observable<boolean> {
    return this.homeFacade.creditProductsError$;
  }

  get workingTC$(): Observable<boolean> {
    return this.facade.workingTC$;
  }

  get completedTC$(): Observable<boolean> {
    return this.facade.completedTC$;
  }

  get firstCallTC$(): Observable<boolean> {
    return this.facade.firstCallTC$;
  }
}
