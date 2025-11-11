import { Component, Input, OnInit } from '@angular/core';
import { PocketDetailWithReturnsFacade } from '../../pocket-detail-with-returns.facade';
import {
  PocketStatus,
  PocketWithReturns
} from '@app/modules/pockets/entities/pockets.interface';
import { NotificationTypeEnum } from '@app/commons/components/notification/constants/notification.constants';
import { PopoverComponent } from '@app/commons/components/popover/popover.component';
import { PopoverController } from '@ionic/angular';
import {
  DEADLINE_POCKET_TOOLTIP,
  FEES_AND_RATES_ALERT,
  OPEN_FEES_AND_RATES_URL
} from '../../constants/pocket-detail-with-returns.constants';
import { DeadLineTooltip } from '../../entities/pocket-detail.interface';
import { Observable } from 'rxjs';
import { Product } from '@app/commons/entities/product/product.interface';
import { ProductTypeDetail } from '@app/commons/entities/product/product-type-detail.interface';

@Component({
  selector: 'app-pocket-card',
  templateUrl: './pocket-card.component.html',
  styleUrls: ['./pocket-card.component.scss']
})
export class PocketCardComponent implements OnInit {
  @Input() pocket!: PocketWithReturns;
  protected readonly DEADLINE_POCKET_TOOLTIP = DEADLINE_POCKET_TOOLTIP;
  public readonly productTypeDetailKey = ProductTypeDetail;
  public feesAndRatesUrl: string = OPEN_FEES_AND_RATES_URL;
  public product$ = new Observable<Product>();

  constructor(
    private pocketDetailWithReturnsFacade: PocketDetailWithReturnsFacade,
    private popoverCtrl: PopoverController
  ) {}
  ngOnInit(): void {
    this.product$ = this.pocketDetailWithReturnsFacade.findProductByProductId(
      this.pocket.productIdParent
    );
  }

  public onActiveSavings(checked: boolean): void {
    const pocketUpdated = {
      ...this.pocket,
      status: checked ? PocketStatus.ACTIVE : PocketStatus.PAUSED
    };

    this.pocketDetailWithReturnsFacade.updatePocketWithReturnsStatus(
      pocketUpdated
    );
  }

  public onAutoRenewal(checked: boolean): void {
    const pocketUpdated = { ...this.pocket, renewAutomatically: checked };
    this.pocketDetailWithReturnsFacade.updateAutoRenewal(pocketUpdated);
  }

  public onAutoRates(checked: boolean): void {
    const pocketUpdated = { ...this.pocket, renewProfits: checked };
    this.pocketDetailWithReturnsFacade.updateAutoRates(pocketUpdated);
  }

  public async showPopoverInfo(
    ev: Event,
    popoverData: DeadLineTooltip
  ): Promise<void> {
    ev.preventDefault();
    const popover = await this.popoverCtrl.create({
      id: popoverData.id,
      component: PopoverComponent,
      componentProps: {
        ...popoverData
      },
      cssClass: 'avv-popover',
      event: ev,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }

  public linkAction(): void {
    this.pocketDetailWithReturnsFacade.openExternalLinks(
      this.feesAndRatesUrl,
      '_blank',
      FEES_AND_RATES_ALERT
    );
  }

  get pocketStatus(): typeof PocketStatus {
    return PocketStatus;
  }

  get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }
}
