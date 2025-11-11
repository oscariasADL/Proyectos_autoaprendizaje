import { Component, inject, Injector, OnInit } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TRANSFERS_AVV_CEL2CEL_INFO_ALERT } from '@modules/transfers/pages/transfers-cel2cel-home/constants/transfers-cel2cel.constants';
import { TRANSFERS_CEL2CEL_SEND } from '@commons/constants/navigate.constants';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';

@Component({
  selector: 'app-transfers-cel2cel-home',
  templateUrl: './transfers-cel2cel-home.page.html',
  styleUrls: ['./transfers-cel2cel-home.page.sass']
})
export class TransfersCel2celHomePage implements OnInit {
  protected informationService: InformationService;
  public readonly CEL2CEL_SEND_URL = TRANSFERS_CEL2CEL_SEND;
  public readonly featureFlagsKey = FeatureFlagsKey;
  public texts: Record<string, string> = {
    title: 'TRANSFERS.CEL2CEL.HOME.TITLE',
    descTitle: 'TRANSFERS.CEL2CEL.HOME.DESC_TITLE',
    desc1: 'TRANSFERS.CEL2CEL.HOME.DESC_1',
    desc2: 'TRANSFERS.CEL2CEL.HOME.DESC_2',
    desc3: 'TRANSFERS.CEL2CEL.HOME.DESC_3',
    desc4: 'TRANSFERS.CEL2CEL.HOME.DESC_4',
    linkRequest: 'TRANSFERS.CEL2CEL.HOME.LINK_REQUEST',
    linkPending: 'TRANSFERS.CEL2CEL.HOME.LINK_PENDING',
    linkAdminTransfiya: 'TRANSFERS.CEL2CEL.HOME.LINK_ADMIN_TRANSFIYA',
    linkInfo: 'TRANSFERS.CEL2CEL.HOME.LINK_INFO'
  };
  private spiConsentService = inject(SpiConsentService);

  constructor(private facade: TransfersFacade, protected injector: Injector) {}

  ngOnInit() {
    this.informationService =
      this.injector.get<InformationService>(InformationService);
    this.facade.fetchTransfiyaAuthorizationsIfNecessary();
    this.informationService
      .showPanelIfNecessary(TRANSFERS_AVV_CEL2CEL_INFO_ALERT)
      .then();
    this.spiConsentService.fetchSpiConsent();
  }

  public async showCel2CelInformation(): Promise<void> {
    await this.informationService.showPanel(
      TRANSFERS_AVV_CEL2CEL_INFO_ALERT,
      'a un celular',
      '¿que es transferir a un celular? - entendido'
    );
  }
}
