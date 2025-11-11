import { Component, OnInit } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { TransfiyaInfoService } from '@commons/services/transfiya-info.service';
import { NavController } from '@ionic/angular';
import {
  TRANSFERS_TRANSFIYA_HOME_INFO_ALERT,
  TRANSFERS_TRANSFIYA_LIST
} from '@modules/transfers/pages/transfers-transfiya/constants/transfers-transfiya.constants';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transfers-transfiya',
  templateUrl: './transfers-transfiya.page.html',
  styleUrls: ['./transfers-transfiya.page.sass']
})
export class TransfersTransfiyaPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private facade: TransfersFacade,
    private informationService: InformationService,
    private transfiyaInfoService: TransfiyaInfoService
  ) {}

  ngOnInit(): void {
    this.informationService.showPanelIfNecessary(
      this.transfersTransfiyaHomeInfoAlert
    );
    this.facade.fetchTransfiyaAuthorizationsIfNecessary();
  }

  public redirect(url: string[]): void {
    this.navCtrl.navigateForward(url);
  }

  public showInformation(): void {
    this.informationService.showPanel(this.transfersTransfiyaHomeInfoAlert);
  }

  get totalNotifications$(): Observable<number> {
    return this.facade.transfiyaList$.pipe(map((list) => list?.length));
  }

  get transfersTransfiyaHomeInfoAlert(): typeof TRANSFERS_TRANSFIYA_HOME_INFO_ALERT {
    return {
      ...TRANSFERS_TRANSFIYA_HOME_INFO_ALERT,
      linkAction: () => this.transfiyaInfoService.showTransfiyaInfo()
    };
  }

  get transfersTransfiyaList(): typeof TRANSFERS_TRANSFIYA_LIST {
    return TRANSFERS_TRANSFIYA_LIST;
  }
}
