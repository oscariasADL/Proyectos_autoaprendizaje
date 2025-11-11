import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { NavController } from '@ionic/angular';
import { MarketingCampaignsFacade } from '../../marketing-campaigns.facade';
import { Campaign } from '../../entities/marketing-campaigns.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-voucher-campaign',
  templateUrl: './voucher-campaign.component.html',
  styleUrls: ['./voucher-campaign.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherCampaignComponent {
  @Input() campaign: Campaign;
  @Output() doClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickAction: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private navCtrl: NavController,
    private facade: MarketingCampaignsFacade
  ) {}

  public openLink(): void {
    this.doClick.emit();
    if (this.campaign.linkKnowMore.isExternal) {
      this.facade.openExternalLinks(this.campaign.linkKnowMore.url);
      return;
    } else if (!isNullOrUndefined(this.campaign.linkKnowMore?.action)) {
      this.clickAction.emit(this.campaign.linkKnowMore.action);
    } else {
      this.navCtrl.navigateForward(this.campaign.linkKnowMore.url);
    }
  }
}
