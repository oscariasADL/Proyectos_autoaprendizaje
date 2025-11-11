import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { VirtualCreditCardDetail } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { getFranchise } from '@modules/product/helpers/product.helper';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';
import { CommonsModule } from '@app/commons/commons.module';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

@Component({
  selector: 'app-virtual-credit-card-cancel',
  templateUrl: './virtual-credit-card-cancel.component.html',
  styleUrls: ['./virtual-credit-card-cancel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    GlobalPipesModule,
    PreloadImageDirective,
    CommonsModule
  ],
  providers: [VirtualCreditCardFacade]
})
export class VirtualCreditCardCancelComponent {
  public readonly CANCEL_TCV: UtagEvent = {
    track: 'link',
    tealium_event: 'link',
    event_category: 'Cancelar TCV',
    event_label: 'Cancelar TCV - guardar cambios'
  };
  @Input() virtualCreditCardDetail: VirtualCreditCardDetail;
  @Input() acctTypeParent: string;
  @Input() numberProductParent: string;

  constructor(
    private modalCtrl: ModalController,
    private facade: VirtualCreditCardFacade
  ) {}

  public cancelVirtualCreditCard(): void {
    this.facade.cancelVirtualCreditCard({
      acctTypeParent: this.acctTypeParent,
      numberProductParent: this.numberProductParent,
      numberCreditCard: this.virtualCreditCardDetail.numberProductTCV,
      nickName: this.virtualCreditCardDetail.nickname,
      amount: this.virtualCreditCardDetail.maxAmtTCV
    });
    this.closeModal();
  }

  public closeModal(data: boolean = true): void {
    void this.modalCtrl.dismiss(data);
  }

  get franchiseImage(): string {
    return `virtual-credit-card/virtual-credit-card-${getFranchise(
      this.virtualCreditCardDetail.numberProductTCV
    ).toLowerCase()}.png`;
  }
}
