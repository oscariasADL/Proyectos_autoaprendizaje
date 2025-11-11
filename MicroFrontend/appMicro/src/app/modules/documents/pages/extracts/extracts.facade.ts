import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { HAS_EXTRACTS } from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import {
  ExtractPayload,
  ExtractsPeriod
} from '@modules/documents/pages/extracts/entities/extracts.interface';
import {
  fetchExtractAction,
  fetchPeriodsAction
} from '@modules/documents/pages/extracts/store/extracts.actions';
import {
  downloadFileNameSelector,
  isDownloadingSomeFileSelector,
  periodsCompletedSelector,
  periodsSelector,
  periodsWorkingSelector
} from '@modules/documents/pages/extracts/store/extracts.selector';
import { setProductSelectedForDocumentAction } from '@modules/documents/store/documents.actions';
import { productSelectedForDocumentSelector } from '@modules/documents/store/documents.selector';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { setProductSelectedAction } from '@modules/product-detail/store/product-detail.actions';
import { productsSelectorV2 } from '@modules/product/store/product.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ExtractsFacade extends AppFacade {
  public products$: Observable<Product[]> = this.store.pipe(
    select(
      productsSelectorV2({
        typeProducts: HAS_EXTRACTS
      })
    )
  );

  public productSelected$: Observable<ProductDetail> = this.store.pipe(
    select(productSelectedForDocumentSelector)
  );

  public periods$: Observable<ExtractsPeriod[]> = this.store.pipe(
    select(periodsSelector)
  );

  public workingPeriods$: Observable<boolean> = this.store.pipe(
    select(periodsWorkingSelector)
  );

  public completedPeriods$: Observable<boolean> = this.store.pipe(
    select(periodsCompletedSelector)
  );

  public downloadFileName$: Observable<string> = this.store.pipe(
    select(downloadFileNameSelector)
  );

  public isDownloadingSomeFile$: Observable<boolean> = this.store.pipe(
    select(isDownloadingSomeFileSelector)
  );

  public fetchPeriods(id: string): void {
    this.store.dispatch(fetchPeriodsAction({ id }));
  }

  public fetchExtract(payload: ExtractPayload): void {
    this.store.dispatch(fetchExtractAction({ payload }));
  }

  public setProductSelected(product: ProductDetail): void {
    this.store.dispatch(setProductSelectedAction({ product }));
  }

  public resetProductSelected(): void {
    this.store.dispatch(setProductSelectedForDocumentAction(null));
  }
}
