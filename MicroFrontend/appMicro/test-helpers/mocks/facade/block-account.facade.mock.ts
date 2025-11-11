import { Injectable } from '@angular/core';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';

@Injectable()
export class BlockAccountFacadeMock extends AppFacadeMock {
  public blockAccountForm$: Observable<{ relativeId: string; lockId: string }> =
    new BehaviorSubject(null);

  public blockAccountProductMedias$: Observable<ActivationProduct[]> =
    new BehaviorSubject(null);

  public blockAccountResponse$: Observable<any> = new BehaviorSubject(null);

  public blockAccountError$: Observable<boolean> = new BehaviorSubject(false);

  public blockAccountWorking$: Observable<boolean> = new BehaviorSubject(false);

  public blockAccountSelectedProduct$: Observable<ProductDetail> =
    new BehaviorSubject(null);

  public fetchBlockProductProductMedias(): void {}

  public setBlockAccountSelectedProduct(product: ProductDetail): void {}

  public setBlockAccountProductMedias(medias: ActivationProduct[]): void {}

  public setBlockAccountError(error: any): void {}

  public setBlockAccountResponse(response: any): void {}

  public setBlockAccountForm(relativeId: string, lockId: string): void {}

  public sendBlockAccount(relativeId: string, lockId: string): void {}
}
