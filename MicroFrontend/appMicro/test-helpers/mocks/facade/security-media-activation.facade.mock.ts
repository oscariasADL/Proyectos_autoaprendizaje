import { Injectable } from '@angular/core';
import {
  ActivationPayloadRequest,
  ActivationProduct,
  MediaActivationType,
  SuspiciousTransaction,
  TemporaryBlockPayload
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { ActivateProductSteps } from '@modules/security/security-media-activation/store/security-media.state';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class SecurityMediaActivationFacadeMock extends AppFacadeMock {
  public currentStep$: Observable<ActivateProductSteps> = new BehaviorSubject(
    null
  );

  public working$: Observable<boolean> = new BehaviorSubject(false);

  public productList$: Observable<ActivationProduct[]> = new BehaviorSubject(
    new ActivationProductFactory().createBulk(3)
  );

  public productsToActivate$: Observable<ActivationProduct[]> =
    new BehaviorSubject([]);

  public securityMediaMessage$: Observable<string> = new BehaviorSubject('');

  public securityMediaType$: Observable<MediaActivationType> =
    new BehaviorSubject(MediaActivationType.BlockCard);

  public productsOtherProducts$: Observable<ActivationProduct[]> =
    new BehaviorSubject([]);

  public suspiciousTransactionWorking$: Observable<boolean> =
    new BehaviorSubject(false);

  public suspiciousTransaction$: Observable<SuspiciousTransaction> =
    new BehaviorSubject(null);

  public productDetail$(id: string): Observable<ActivationProduct> {
    return of(new ActivationProductFactory().create());
  }

  public fetchProductsToActivate(): void {}

  public suspiciousTransaction(product: ActivationProduct): void {}

  public activateProductSetStep(step: ActivateProductSteps): void {}

  public setMediaActivationType(mediaType: MediaActivationType): void {}

  public activateProduct(payload: ActivationPayloadRequest): void {}

  public blockProduct(id: string): void {}

  public temporaryBlockProduct(payload: TemporaryBlockPayload): void {}
}
