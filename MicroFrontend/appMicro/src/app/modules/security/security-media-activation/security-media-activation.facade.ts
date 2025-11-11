import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ActivationPayloadRequest,
  ActivationProduct,
  MediaActivationType,
  SuspiciousTransaction,
  TemporaryBlockPayload
} from './entities/security-media.interface';
import * as securityConfigActions from './store/security-media.action';
import {
  currentStep,
  findProductById,
  productList,
  productsOtherProducts,
  productsToActivate,
  securityMediaMessage,
  securityMediaType,
  suspiciousTransactionDataSelector,
  suspiciousTransactionWorkingSelector,
  workingSelector
} from './store/security-media.selector';
import { ActivateProductSteps } from './store/security-media.state';

@Injectable()
export class SecurityMediaActivationFacade extends AppFacade {
  public currentStep$: Observable<ActivateProductSteps> = this.store.pipe(
    select(currentStep)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(workingSelector)
  );

  public productList$: Observable<ActivationProduct[]> = this.store.pipe(
    select(productList)
  );

  public productsToActivate$: Observable<ActivationProduct[]> = this.store.pipe(
    select(productsToActivate)
  );

  public securityMediaMessage$: Observable<string> = this.store.pipe(
    select(securityMediaMessage)
  );

  public securityMediaType$: Observable<MediaActivationType> = this.store.pipe(
    select(securityMediaType)
  );

  public suspiciousTransactionWorking$: Observable<boolean> = this.store.pipe(
    select(suspiciousTransactionWorkingSelector)
  );

  public suspiciousTransaction$: Observable<SuspiciousTransaction> =
    this.store.pipe(select(suspiciousTransactionDataSelector));

  public productsOtherProducts$: Observable<ActivationProduct[]> =
    this.store.pipe(select(productsOtherProducts));

  public productDetail$(id: string): Observable<ActivationProduct> {
    return this.store.pipe(select(findProductById(), id));
  }

  public fetchProductsToActivate(): void {
    this.store.dispatch(securityConfigActions.fetchProducts());
  }

  public suspiciousTransaction(product: ActivationProduct): void {
    this.store.dispatch(
      securityConfigActions.suspiciousTransaction({ product })
    );
  }

  public activateProductSetStep(step: ActivateProductSteps): void {
    this.store.dispatch(securityConfigActions.activateProductSetStep({ step }));
  }

  public setMediaActivationType(mediaType: MediaActivationType): void {
    this.store.dispatch(
      securityConfigActions.setMediaActivationType({ mediaType })
    );
  }

  public activateProduct(payload: ActivationPayloadRequest): void {
    this.store.dispatch(securityConfigActions.activateProduct({ payload }));
  }

  public blockProduct(id: string): void {
    this.store.dispatch(securityConfigActions.blockProduct({ id }));
  }

  public temporaryBlockProduct(payload: TemporaryBlockPayload): void {
    this.store.dispatch(
      securityConfigActions.temporaryBlockProduct({ payload })
    );
  }

  public temporaryBlockProductV2(payload: TemporaryBlockPayload): void {
    this.store.dispatch(
      securityConfigActions.temporaryBlockProductV2({ payload })
    );
  }

  public unlockProduct(product: ActivationProduct): void {
    this.store.dispatch(securityConfigActions.unlockProduct({ product }));
  }

  public unlockProductV2(product: ActivationProduct): void {
    this.store.dispatch(
      securityConfigActions.unlockProductV2Action({ product })
    );
  }
}
