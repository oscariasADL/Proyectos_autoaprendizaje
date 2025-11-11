import { Component, EventEmitter, Output } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { HomeFacade } from '@modules/home/home.facade';
import { Platform } from '@commons/constants/global.constants';
import { Observable } from 'rxjs';
import { WALLET_CARD_LIST } from '@commons/constants/navigate.constants';

@Component({
  selector: 'app-home-marketing-space',
  templateUrl: './home-marketing-space.component.html',
  styleUrls: ['./home-marketing-space.component.sass']
})
export class HomeMarketingSpaceComponent {
  @Output() interceptMathildeAdds: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();
  @Output() openExternalLink: EventEmitter<LinkKey> =
    new EventEmitter<LinkKey>();

  public readonly platforms = Platform;
  public readonly featureFlagsKey = FeatureFlagsKey;
  public readonly linkCdt: LinkKey = LinkKey.linkCdt;
  public readonly WALLET_CARD_LIST = WALLET_CARD_LIST;

  constructor(private facade: HomeFacade) {}

  public interceptMathildeAddsClick(event: MouseEvent): void {
    this.interceptMathildeAdds.emit(event);
  }

  public openExternalLinkClick(link: LinkKey): void {
    this.openExternalLink.emit(link);
  }

  public isEnableFeatureFlag(
    featureFlag: FeatureFlagsKey
  ): Observable<boolean> {
    return this.facade.isFeatureFlagEnabled(featureFlag);
  }

  get currentPlatform(): string {
    return Capacitor.getPlatform();
  }
}
