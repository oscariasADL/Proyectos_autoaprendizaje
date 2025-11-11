import { Injectable } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import {
  ExtractPayload,
  ExtractsPeriod
} from '@modules/documents/pages/extracts/entities/extracts.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ProductDetailFactory } from '@testing/factories/product-detail.factory';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class ExtractsFacadeMock extends AppFacadeMock {
  public products$: Observable<Product[]> = new BehaviorSubject([]);
  public productSelected$: Observable<ProductDetail> = new BehaviorSubject(
    new ProductDetailFactory().create()
  );
  public periods$: Observable<ExtractsPeriod[]> = new BehaviorSubject([]);

  public workingPeriods$: Observable<boolean> = new BehaviorSubject(false);

  public completedPeriods$: Observable<boolean> = new BehaviorSubject(true);

  public downloadFileName$: Observable<string> = new BehaviorSubject('');

  public isDownloadingSomeFile$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchPeriods(id: string): void {}

  public fetchExtract(payload: ExtractPayload): void {}

  public setProductSelected(product: ProductDetail): void {}

  public resetProductSelected(): void {}
}
