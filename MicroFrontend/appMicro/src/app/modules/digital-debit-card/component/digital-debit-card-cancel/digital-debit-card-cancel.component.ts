import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { ModalController } from '@commons/controllers/modal.controller';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import {
  DigitalDebitCardDetail,
  DigitalDebitCardType
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';

@Component({
  selector: 'app-digital-debit-card-cancel',
  templateUrl: './digital-debit-card-cancel.component.html',
  styleUrls: ['./digital-debit-card-cancel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule, CommonModule, GlobalPipesModule],
  providers: [DigitalDebitCardFacade]
})
export class DigitalDebitCardCancelComponent {
  @Input() relativeParentId: string;
  @Input() card: DigitalDebitCardDetail;

  constructor(
    private modalCtrl: ModalController,
    private facade: DigitalDebitCardFacade
  ) {}

  public cancelDigitalDebitCard(): void {
    this.facade.cancelDigitalDebitCard({
      relativeId: this.relativeParentId,
      nickName: this.card.name,
      amount: this.card.amount,
      digitalDebitCardTrnType: DigitalDebitCardType.CANCELLATION
    });
    this.closeModal();
  }

  public closeModal(data: boolean = true): void {
    void this.modalCtrl.dismiss(data);
  }
}
