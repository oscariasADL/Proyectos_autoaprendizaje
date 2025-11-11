import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import { Observable, Subscription } from 'rxjs';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ProductModule } from '@modules/product/product.module';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { VirtualCreditCardDetail } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';
import { getFranchise } from '@modules/product/helpers/product.helper';
import {
  ProductAction,
  ProductActionType
} from '@modules/product/entities/product-action.interface';
import { mapVirtualCreditCardActionsList } from '@modules/virtual-credit-card/mappers/virtual-credit-card.mapper';
import { ModalOptions } from '@ionic/core';
import { VirtualCreditCardCancelComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-cancel/virtual-credit-card-cancel.component';
import { VirtualCreditCardReissueComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-reissue/virtual-credit-card-reissue.component';
import { VirtualCreditCardEditComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-edit/virtual-credit-card-edit.component';
import { WalletProductDetailPanelComponent } from '@modules/wallets/components/wallet-product-detail-panel/wallet-product-detail-panel.component';
import { TypeAccount } from '@commons/entities/product/type-account';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-virtual-credit-card-detail',
  templateUrl: './virtual-credit-card-detail.component.html',
  styleUrls: ['./virtual-credit-card-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    GlobalPipesModule,
    ProductModule,
    PreloadImageDirective,
    IonicModule,
    WalletProductDetailPanelComponent,
    FeatureToggleDirective
  ],
  providers: [VirtualCreditCardFacade]
})
export class VirtualCreditCardDetailComponent implements OnInit, OnDestroy {
  @Input() virtualCreditCardDetail: VirtualCreditCardDetail;
  @Input() acctTypeParent: string;
  @Input() numberProductParent: string;

  public actions: ProductAction[];
  public accountType: TypeAccount = TypeAccount.CCA;
  public readonly featureFlagsKey = FeatureFlagsKey;
  private subscription: Subscription;

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private facade: VirtualCreditCardFacade
  ) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => {
        void this.modalCtrl.dismiss();
      }
    );
    this.actions = mapVirtualCreditCardActionsList();
  }

  ngOnDestroy(): void {
    this.facade.closeToast();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(state: boolean = false): void {
    void this.modalCtrl.dismiss(state);
  }

  public async copyNumberToClipboard(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await Clipboard.write({
        string: this.virtualCreditCardDetail?.numberProductTCV
      });
    }

    this.facade.showToast({
      type: ToastType.success,
      title: 'Número copiado',
      override: {
        positionClass: 'toast-top-center-virtual-credit-card-detail'
      }
    });
  }

  public showFrequentQuestions(): void {
    this.facade.showFrequentQuestions();
  }

  public showUse(): void {
    this.facade.showVirtualCreditCardUse();
  }

  public actionSelected(productAction: ProductAction): void {
    this.actionsFunctions()[productAction.type]();
  }

  private actionsFunctions(): {
    EditTCV: () => Promise<void>;
    CancelTCV: () => Promise<void>;
    ReissueTCV: () => Promise<void>;
  } {
    const modalSettingDefault: Partial<ModalOptions> = {
      componentProps: {
        acctTypeParent: this.acctTypeParent,
        numberProductParent: this.numberProductParent,
        virtualCreditCardDetail: this.virtualCreditCardDetail
      },
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    };
    return {
      [ProductActionType.EditTCV]: async () => {
        const modal = await this.modalCtrl.create({
          ...modalSettingDefault,
          id: 'virtual-credit-card-edit',
          component: VirtualCreditCardEditComponent
        });
        await modal.present();
      },
      [ProductActionType.CancelTCV]: async () => {
        const modal = await this.modalCtrl.create({
          ...modalSettingDefault,
          id: 'virtual-credit-card-cancel',
          component: VirtualCreditCardCancelComponent
        });
        await modal.present();
      },
      [ProductActionType.ReissueTCV]: async () => {
        const modal = await this.modalCtrl.create({
          ...modalSettingDefault,
          id: 'virtual-credit-card-reissue',
          component: VirtualCreditCardReissueComponent
        });
        await modal.present();
      }
    };
  }

  get isPossibleCopyToClipboard(): boolean {
    return !!navigator.clipboard;
  }

  get franchiseImage(): string {
    return `virtual-credit-card/virtual-credit-card-${getFranchise(
      this.virtualCreditCardDetail.numberProductTCV
    ).toLowerCase()}.png`;
  }

  get maxCardsLimit$(): Observable<number> {
    return this.facade.maxCardsLimit$;
  }

  get totalCardsCreated$(): Observable<number> {
    return this.facade.totalCardsCreated$;
  }
}
