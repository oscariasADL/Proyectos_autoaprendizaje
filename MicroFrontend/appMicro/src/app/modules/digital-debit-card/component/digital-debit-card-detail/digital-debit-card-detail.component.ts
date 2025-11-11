import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOptions } from '@ionic/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Clipboard } from '@capacitor/clipboard';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

import { DigitalDebitCardDetail } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import {
  ProductAction,
  ProductActionType
} from '@modules/product/entities/product-action.interface';
import { mapDigitalDebitCardActionsList } from '@modules/digital-debit-card/mappers/digital-debit-card.mapper';
import { ProductModule } from '@modules/product/product.module';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardEditComponent } from '@modules/digital-debit-card/component/digital-debit-card-edit/digital-debit-card-edit.component';
import { DigitalDebitCardCancelComponent } from '@modules/digital-debit-card/component/digital-debit-card-cancel/digital-debit-card-cancel.component';
import { DigitalDebitCardReissueComponent } from '@modules/digital-debit-card/component/digital-debit-card-reissue/digital-debit-card-reissue.component';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-digital-debit-card-detail',
  templateUrl: './digital-debit-card-detail.component.html',
  styleUrls: ['./digital-debit-card-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GlobalPipesModule, ProductModule],
  providers: [DigitalDebitCardFacade]
})
export class DigitalDebitCardDetailComponent implements OnInit, OnDestroy {
  @Input() relativeParentId: string;
  @Input() digitalDebitCardDetail: DigitalDebitCardDetail;

  private subscription: Subscription;

  public actions: ProductAction[];

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private facade: DigitalDebitCardFacade
  ) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => {
        void this.modalCtrl.dismiss();
      }
    );
    this.actions = mapDigitalDebitCardActionsList();
  }

  ngOnDestroy(): void {
    this.facade.closeToast();
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(state: boolean = false): void {
    void this.modalCtrl.dismiss(state);
  }

  public async copyNumberToClipboard(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await Clipboard.write({
        string: this.digitalDebitCardDetail?.numberDigitalCard
      });
    }

    this.facade.showToast({
      type: ToastType.success,
      title: 'Número copiado',
      override: {
        positionClass: 'toast-top-center-digital-debit-card-detail'
      }
    });
  }

  public showFrequentQuestions(): void {
    this.facade.showFrequentQuestions();
  }

  public showUse(): void {
    this.facade.showDigitalDebitCardUse();
  }

  public actionSelected(productAction: ProductAction): void {
    this.actionsFunctions()[productAction.type]();
  }

  private actionsFunctions(): {
    EditTDD: () => Promise<void>;
    DeleteTDD: () => Promise<void>;
    ReissueTDD: () => Promise<void>;
  } {
    this.facade.closeToast();
    const modalSettingDefault: Partial<ModalOptions> = {
      componentProps: {
        relativeParentId: this.relativeParentId,
        card: this.digitalDebitCardDetail
      },
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    };
    return {
      [ProductActionType.EditTDD]: async () => {
        const modal = await this.modalCtrl.create({
          ...modalSettingDefault,
          id: 'digital-debit-card-edit',
          component: DigitalDebitCardEditComponent
        });
        await modal.present();
      },
      [ProductActionType.DeleteTDD]: async () => {
        const modal = await this.modalCtrl.create({
          ...modalSettingDefault,
          id: 'digital-debit-card-cancel',
          component: DigitalDebitCardCancelComponent
        });
        await modal.present();
      },
      [ProductActionType.ReissueTDD]: async () => {
        const modal = await this.modalCtrl.create({
          ...modalSettingDefault,
          id: 'digital-debit-card-reissue',
          component: DigitalDebitCardReissueComponent
        });
        await modal.present();
      }
    };
  }

  get isPossibleCopyToClipboard(): boolean {
    return !!navigator.clipboard;
  }
}
