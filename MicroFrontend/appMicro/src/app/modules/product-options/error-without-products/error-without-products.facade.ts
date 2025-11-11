import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { fetchProductsCountRetryAction } from '@modules/product/store/product.actions';
import { retriesSelector } from '@modules/product/store/product.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorWithoutProductsFacade extends AppFacade {
  public retries$: Observable<number> = this.store.pipe(
    select(retriesSelector)
  );

  public countRetryAction(): void {
    this.store.dispatch(fetchProductsCountRetryAction());
  }
}
