import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { setProductSelectedForDocumentAction } from '@modules/documents/store/documents.actions';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { setProductSelectedAction } from '@modules/product-detail/store/product-detail.actions';
import { productSelectedSelector } from '@modules/product-detail/store/product-detail.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentsFacade extends AppFacade {
  public productSelected$: Observable<ProductDetail> = this.store.pipe(
    select(productSelectedSelector)
  );

  public resetProductSelected(): void {
    this.store.dispatch(setProductSelectedAction(null));
  }

  public setProductSelectedForDocument(product: ProductDetail): void {
    this.store.dispatch(setProductSelectedForDocumentAction({ product }));
  }
}
