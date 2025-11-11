import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { setProductSelectedAction } from '@modules/product-detail/store/product-detail.actions';
import { productSelectedSelector } from '@modules/product-detail/store/product-detail.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchGMFAction } from './store/generic-stepper.actions';
import { GMFData, GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { gmfSelector } from './store/generic-stepper.selector';

@Injectable()
export class GenericStepperFacade extends AppFacade {
  public productSelected$: Observable<ProductDetail> = this.store.pipe(
    select(productSelectedSelector)
  );

  public resetProductSelected(): void {
    this.store.dispatch(setProductSelectedAction(null));
  }

  public setProductSelected(product: any): void {
    this.store.dispatch(setProductSelectedAction({ ...product }));
  }

  public fetchGMF(payload: GMFPayload): void {
    this.store.dispatch(fetchGMFAction({ payload }));
  }

  public gmf: Observable<GMFData> = this.store.pipe(select(gmfSelector));
}
