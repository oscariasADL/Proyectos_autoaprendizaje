import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Campaign } from '@modules/marketing-campaigns/entities/marketing-campaigns.interface';
import { MarketingCampaignsFacade } from '@modules/marketing-campaigns/marketing-campaigns.facade';
import { NavController } from '@ionic/angular';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-product-detail-campaign',
  templateUrl: './product-detail-campaign.component.html',
  styleUrls: ['./product-detail-campaign.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailCampaignComponent {
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
