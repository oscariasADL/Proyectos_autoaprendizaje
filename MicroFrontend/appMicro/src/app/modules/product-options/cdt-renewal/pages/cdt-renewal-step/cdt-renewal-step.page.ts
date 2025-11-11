import { Component } from '@angular/core';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { NavController } from '@ionic/angular';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { CdtRenewalFacade } from '@modules/product-options/cdt-renewal/cdt-renewal.facade';
import {
  CdtRenewalRequest,
  CdtRenewalResponse,
  CdtRenewalStatus
} from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cdt-renewal-step',
  templateUrl: './cdt-renewal-step.page.html',
  styleUrls: ['./cdt-renewal-step.page.sass']
})
export class CdtRenewalStepPage {
  constructor(
    private navCtrl: NavController,
    private facade: CdtRenewalFacade
  ) {}

  public redirectLink(): void {
    this.facade.redirectExternal(LinkKey.linkSavingsAccount);
  }

  public renewalCdt(): void {
    this.facade.renewalCdt(this.cdtRequest, this.cdtData$.currentValue());
  }

  public cancelRenewalCdt(): void {
    this.facade.cancelRenewalCdt(this.cdtRequest);
  }

  public navigateBack(): void {
    this.navCtrl.pop();
  }

  get cdtRequest(): CdtRenewalRequest {
    return {
      productId: this.cdtRenewalData$.currentValue().productId,
      reInvest:
        this.cdtRenewalData$.currentValue()?.reInvest ===
        CdtRenewalStatus.ACTIVE
          ? CdtRenewalStatus.INACTIVE
          : CdtRenewalStatus.ACTIVE
    };
  }

  get cdtData$(): Observable<ProductDetail> {
    return this.facade.cdtData$;
  }

  get cdtRenewalData$(): Observable<CdtRenewalResponse> {
    return this.facade.cdtRenewalData$;
  }

  get cdtRenewalStatus(): typeof CdtRenewalStatus {
    return CdtRenewalStatus;
  }
}
