import { Component } from '@angular/core';
import { TRANSFIYA_MANAGEMENT } from '@commons/constants/navigate.constants';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { NavController } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transfers-pending',
  templateUrl: './transfers-pending.page.html',
  styleUrls: ['./transfers-pending.page.sass']
})
export class TransfersPendingPage {
  constructor(
    private navCtrl: NavController,
    private facade: TransfersFacade
  ) {}

  public doRefresh(event: any): void {
    this.facade.getTransfiyaAuthorizations();
    this.workingNotifications$
      .pipe(take(1))
      .subscribe(() => event.target.complete());
  }

  public goToTransfiyaAuthorization(item: TransfiyaAuthorizationItem): void {
    this.navCtrl.navigateForward([
      ...TRANSFIYA_MANAGEMENT,
      item.isRequest ? 'dispatch' : 'consignment',
      item.transactionId
    ]);
  }

  get transfiyaList$(): Observable<TransfiyaAuthorizationItem[]> {
    return this.facade.transfiyaList$;
  }

  get workingNotifications$(): Observable<boolean> {
    return this.facade.workingNotifications$;
  }
}
