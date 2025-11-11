import { Injectable } from '@angular/core';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  CdtRenewalRequest,
  CdtRenewalResponse,
  CdtRenewalStatus
} from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';
import { LinkKey } from '@commons/entities/parameters/links.entities';

@Injectable()
export class CdtRenewalFacadeMock extends AppFacadeMock {
  public cdtData$: Observable<ProductDetail> = new BehaviorSubject(null);

  public cdtRenewalData$: Observable<CdtRenewalResponse> = new BehaviorSubject({
    expDate: '2022-01-10',
    numberProduct: '6402009300152',
    productId:
      '7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451',
    reInvest: CdtRenewalStatus.ACTIVE
  });

  public showCdtRenewal$: Observable<boolean> = new BehaviorSubject(false);

  public disabledCdtRenewal$: Observable<boolean> = new BehaviorSubject(false);

  public fetchCdtRenewalDetail(id: string): void {}

  public cleanCdtRenewalDetail(): void {}

  public renewalCdt(payload: CdtRenewalRequest, cdt: ProductDetail): void {}

  public cancelRenewalCdt(payload: CdtRenewalRequest): void {}

  public redirectExternal(key: LinkKey): void {}
}
