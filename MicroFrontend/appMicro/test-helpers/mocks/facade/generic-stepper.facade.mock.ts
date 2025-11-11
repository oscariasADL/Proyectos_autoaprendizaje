import { Injectable } from '@angular/core';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ProductDetailFactory } from '@testing/factories/product-detail.factory';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';
import { GMFData, GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { GMFFactory } from '@testing/factories/gmf-data.factory';

const productDetail: ProductDetail = new ProductDetailFactory().create();
const gmfData: GMFData = new GMFFactory().create();

@Injectable()
export class GenericStepperFacadeMock extends AppFacadeMock {
  public productSelected$: Observable<ProductDetail> = new BehaviorSubject(
    productDetail
  );
  public setProductSelected(product: any): void {}
  public resetProductSelected(): void {}

  public fetchGMF(payload: GMFPayload): void {}

  public gmf: Observable<GMFData> = new BehaviorSubject(gmfData);
}
