import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { ModalController } from '@commons/controllers/modal.controller';
import {
  DigitalDebitCardDetail,
  DigitalDebitCardType
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';

@Component({
  selector: 'app-digital-debit-card-reissue',
  templateUrl: './digital-debit-card-reissue.component.html',
  styleUrls: ['./digital-debit-card-reissue.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, CommonModule, GlobalPipesModule],
  providers: [DigitalDebitCardFacade]
})
export class DigitalDebitCardReissueComponent {
  @Input() relativeParentId: string;
  @Input() card: DigitalDebitCardDetail;

  constructor(
    private modalCtrl: ModalController,
    private facade: DigitalDebitCardFacade
  ) {}

  public reissueDigitalDebitCard(): void {
    this.facade.reissueDigitalDebitCard({
      relativeId: this.relativeParentId,
      nickName: this.card.name,
      amount: this.card.amount,
      digitalDebitCardTrnType: DigitalDebitCardType.REISSUE
    });
    this.closeModal(false);
  }

  public closeModal(data: boolean = true): void {
    void this.modalCtrl.dismiss(data);
  }
}
