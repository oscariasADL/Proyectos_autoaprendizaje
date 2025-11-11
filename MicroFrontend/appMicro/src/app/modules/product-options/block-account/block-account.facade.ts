import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  fetchBlockAccountProductMediasAction,
  sendBlockAccountAction,
  setBlockAccountErrorAction,
  setBlockAccountFormAction,
  setBlockAccountProductMediasAction,
  setBlockAccountResponseAction,
  setBlockAccountSelectedProductAction
} from '@modules/product-options/block-account/store/block-account.actions';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import {
  blockAccountErrorSelector,
  blockAccountFormSelector,
  blockAccountProductMediasSelector,
  blockAccountResponseSelector,
  blockAccountSelectedProductSelector,
  blockAccountWorkingSelector
} from '@modules/product-options/block-account/store/block-account.selector';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';

@Injectable()
export class BlockAccountFacade extends AppFacade {
  public fetchBlockProductProductMedias(): void {
    this.store.dispatch(fetchBlockAccountProductMediasAction());
  }

  public setBlockAccountSelectedProduct(product: ProductDetail): void {
    this.store.dispatch(setBlockAccountSelectedProductAction({ product }));
  }

  public setBlockAccountProductMedias(medias: ActivationProduct[]): void {
    this.store.dispatch(
      setBlockAccountProductMediasAction({ productMedias: medias })
    );
  }

  public setBlockAccountError(error: boolean): void {
    this.store.dispatch(setBlockAccountErrorAction({ error }));
  }

  public setBlockAccountResponse(response: any): void {
    this.store.dispatch(setBlockAccountResponseAction({ ...response }));
  }

  public setBlockAccountForm(relativeId: string, lockId: string): void {
    this.store.dispatch(setBlockAccountFormAction({ relativeId, lockId }));
  }

  public sendBlockAccount(relativeId: string, lockId: string): void {
    this.store.dispatch(
      sendBlockAccountAction({ payload: { lockId, relativeId } })
    );
  }

  public blockAccountWorking$: Observable<boolean> = this.store.pipe(
    select(blockAccountWorkingSelector)
  );

  public blockAccountSelectedProduct$: Observable<ProductDetail> =
    this.store.pipe(select(blockAccountSelectedProductSelector));

  public blockAccountProductMedias$: Observable<ActivationProduct[]> =
    this.store.pipe(select(blockAccountProductMediasSelector));

  public blockAccountForm$: Observable<{ relativeId: string; lockId: string }> =
    this.store.pipe(select(blockAccountFormSelector));

  public blockAccountResponse$: Observable<any> = this.store.pipe(
    select(blockAccountResponseSelector)
  );

  public blockAccountError$: Observable<boolean> = this.store.pipe(
    select(blockAccountErrorSelector)
  );
}
