import { Component, OnDestroy, OnInit } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { TRANSFERS_ADMIN_TRANSFIYA_INFO_ALERT } from '@modules/transfers/pages/transfers-admin-transfiya/constants/transfers-admin-transfiya.constants';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { AppFacade } from '@app/app.facade';
import { Subscription } from 'rxjs';
import { removeSubscriptions } from '@commons/utils/util';

@Component({
  selector: 'app-transfers-admin-transfiya',
  templateUrl: './transfers-admin-transfiya.page.html',
  styleUrls: ['./transfers-admin-transfiya.page.sass']
})
export class TransfersAdminTransfiyaPage implements OnInit, OnDestroy {
  public readonly featureFlagsKey = FeatureFlagsKey;
  private subscriptions: Subscription[] = [];

  constructor(
    private informationService: InformationService,
    private facade: AppFacade
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.facade
        .isFeatureFlagEnabled(FeatureFlagsKey.TransferCel2celDefaultAccount)
        .subscribe((enabled) => {
          if (enabled) {
            void this.informationService.showPanelIfNecessary(
              TRANSFERS_ADMIN_TRANSFIYA_INFO_ALERT
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public showInformation(): void {
    void this.informationService.showPanel(
      TRANSFERS_ADMIN_TRANSFIYA_INFO_ALERT
    );
  }
}
