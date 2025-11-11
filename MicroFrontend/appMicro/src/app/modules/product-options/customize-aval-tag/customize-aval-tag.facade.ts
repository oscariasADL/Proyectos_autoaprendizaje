import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { AppFacade } from '@app/app.facade';
import { findSpiUserKeyByKey } from '@modules/product/store/product.selector';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';
import { CustomizeAvalTagPayload } from '@modules/product-options/customize-aval-tag/entities/customize-aval-tag.interface';
import { modifyAvalTagAction } from '@modules/product-options/customize-aval-tag/store/customize-aval-tag.actions';

@Injectable()
export class CustomizeAvalTagFacade extends AppFacade {
  public findSpiUserKeyByKey(avalTag: string): Observable<ProductSpiUserKey> {
    return this.store.pipe(select(findSpiUserKeyByKey(avalTag)));
  }

  public modifyAvalTag(payload: CustomizeAvalTagPayload): void {
    this.store.dispatch(modifyAvalTagAction({ payload }));
  }
}
