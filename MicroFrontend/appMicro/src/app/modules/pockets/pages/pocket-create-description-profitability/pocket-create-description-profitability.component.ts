import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { ModalController } from '@app/commons/controllers/modal.controller';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { RATES_URL } from '@modules/pockets/constants/pockets.constants';
import { OPEN_EXTERNAL_URL_ALERT } from '@commons/constants/global.constants';

@Component({
  selector: 'app-pocket-create-description-profitability',
  templateUrl: './pocket-create-description-profitability.component.html',
  styleUrls: ['./pocket-create-description-profitability.component.sass'],
  standalone: true,
  imports: [GlobalPipesModule, UpperCasePipe],
  providers: [PocketsFacade]
})
export class PocketCreateDescriptionProfitabilityComponent {
  @Input() buttonActionText: string;

  constructor(
    private modalCtrl: ModalController,
    private facade: PocketsFacade
  ) {}

  public closeModal(response: boolean = false): void {
    void this.modalCtrl.dismiss(response);
  }

  public openLink() {
    this.facade.openExternalLinks(
      RATES_URL,
      '_blank',
      OPEN_EXTERNAL_URL_ALERT,
      'pocket-create-description-profitability-modal'
    );
  }
}
