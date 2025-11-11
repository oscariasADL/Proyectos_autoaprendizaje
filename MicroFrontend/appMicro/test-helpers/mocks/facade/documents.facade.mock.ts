import { Injectable } from '@angular/core';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class DocumentsFacadeMock extends AppFacadeMock {
  public productSelected$: Observable<ProductDetail> = new BehaviorSubject(
    null
  );

  public resetProductSelected(): void {}

  public setProductSelectedForDocument(product: ProductDetail): void {}
}
