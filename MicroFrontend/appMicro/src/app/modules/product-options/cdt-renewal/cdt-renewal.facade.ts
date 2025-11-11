import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { productDetailDataSelector } from '@modules/product-detail/store/product-detail.selector';
import {
  CdtRenewalRequest,
  CdtRenewalResponse
} from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import {
  cancelRenewalCdtAction,
  cleanCdtRenewalDetailAction,
  fetchCdtRenewalDetailAction,
  renewalCdtAction
} from '@modules/product-options/cdt-renewal/store/cdt-renewal.actions';
import {
  cdtRenewalDataSelector,
  disabledCdtRenewalSelector,
  showCdtRenewalSelector
} from '@modules/product-options/cdt-renewal/store/cdt-renewal.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class CdtRenewalFacade extends AppFacade {
  public cdtData$: Observable<ProductDetail> = this.store.pipe(
    select(productDetailDataSelector)
  );

  public cdtRenewalData$: Observable<CdtRenewalResponse> = this.store.pipe(
    select(cdtRenewalDataSelector)
  );

  public showCdtRenewal$: Observable<boolean> = this.store.pipe(
    select(showCdtRenewalSelector)
  );

  public disabledCdtRenewal$: Observable<boolean> = this.store.pipe(
    select(disabledCdtRenewalSelector)
  );

  public fetchCdtRenewalDetail(id: string): void {
    this.store.dispatch(fetchCdtRenewalDetailAction({ id }));
  }

  public cleanCdtRenewalDetail(): void {
    this.store.dispatch(cleanCdtRenewalDetailAction());
  }

  public renewalCdt(payload: CdtRenewalRequest, cdt: ProductDetail): void {
    this.store.dispatch(renewalCdtAction({ payload, cdt }));
  }

  public cancelRenewalCdt(payload: CdtRenewalRequest): void {
    this.store.dispatch(cancelRenewalCdtAction({ payload }));
  }
}
