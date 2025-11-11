import { Component, Input, OnInit } from '@angular/core';
import { CDT_RENEWAL } from '@commons/constants/navigate.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import { NavController } from '@ionic/angular';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { CdtRenewalFacade } from '@modules/product-options/cdt-renewal/cdt-renewal.facade';
import {
  CdtRenewalResponse,
  CdtRenewalStatus
} from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cdt-renewal-notice',
  templateUrl: './cdt-renewal-notice.component.html',
  styleUrls: ['./cdt-renewal-notice.component.sass']
})
export class CdtRenewalNoticeComponent implements OnInit {
  @Input() product: ProductDetail;

  constructor(
    private facade: CdtRenewalFacade,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    if (this.product && this.product.type === TypeAccount.CDA) {
      this.facade.fetchCdtRenewalDetail(this.product.id);
    } else {
      this.facade.cleanCdtRenewalDetail();
    }
  }

  public redirectCdtRenewal(): void {
    if (!this.disabledCdtRenewal$.currentValue()) {
      this.navCtrl.navigateForward(CDT_RENEWAL);
    }
  }

  get cdtRenewalData$(): Observable<CdtRenewalResponse> {
    return this.facade.cdtRenewalData$;
  }

  get showCdtRenewal$(): Observable<boolean> {
    return this.facade.showCdtRenewal$;
  }

  get disabledCdtRenewal$(): Observable<boolean> {
    return this.facade.disabledCdtRenewal$;
  }

  get cdtRenewalStatus(): typeof CdtRenewalStatus {
    return CdtRenewalStatus;
  }
}
