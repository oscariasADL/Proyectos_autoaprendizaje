import { Injectable } from '@angular/core';
import { AppFacadeMock } from './app.facade.mock';
import {
  ProductSpiUserKey,
  SpiKeyType
} from '@app/modules/product/entities/product-spi-user-key';
import { of } from 'rxjs';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { CustomizeAvalTagPayload } from '@app/modules/product-options/customize-aval-tag/entities/customize-aval-tag.interface';

@Injectable()
export class CustomizeAvalTagFacadeMock extends AppFacadeMock {
  public findSpiUserKeyByKey(avalTag: string): Observable<ProductSpiUserKey> {
    return of({
      numberProduct: '123',
      accountId: '1234',
      accountType: TypeAccount.SDA,
      keyId: '414',
      keyType: SpiKeyType.AlphanumericIdentifier,
      preferredIndicator: '1233',
      statusDesc: 'desc',
      effDt: 'dd'
    });
  }

  public modifyAvalTag(payload: CustomizeAvalTagPayload): void {}
}
