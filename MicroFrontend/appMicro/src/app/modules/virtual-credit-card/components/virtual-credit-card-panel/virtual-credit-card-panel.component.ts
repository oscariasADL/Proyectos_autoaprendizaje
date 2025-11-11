import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  IonModal,
  ModalController,
  ModalOptions,
  NavController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { mapFetchVirtualCreditCardPayload } from '@modules/virtual-credit-card/mappers/virtual-credit-card.mapper';
import { VirtualCreditCardModule } from '@modules/virtual-credit-card/virtual-credit-card.module';
import {
  VirtualCreditCard,
  VirtualCreditCardDetail
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';

import { srcImgFranchise } from '@modules/product/helpers/product.helper';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VIRTUAL_CREDIT_CARD_ACTIVATE } from '@commons/constants/navigate.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import { VirtualCreditCardCancelComponent } from '../virtual-credit-card-cancel/virtual-credit-card-cancel.component';

@Component({
  selector: 'app-virtual-credit-card-panel',
  templateUrl: './virtual-credit-card-panel.component.html',
  styleUrls: ['./virtual-credit-card-panel.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    VirtualCreditCardModule,
    IonicModule,
    GlobalPipesModule
  ]
})
export class VirtualCreditCardPanelComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  @Input() product: ProductDetail;
  @Input() currentRoute?: string;
  private numberProductParent: string = null;

  public readonly canAddVirtualCreditCard$: Observable<boolean> =
    this.facade.maxCardsLimit$.pipe(
      withLatestFrom(this.facade.totalCardsCreated$),
      map(
        ([maxCardsLimit, totalCardsCreated]) =>
          totalCardsCreated < maxCardsLimit
      )
    );

  constructor(
    private navCtrl: NavController,
    private facade: VirtualCreditCardFacade,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const homeProduct = this.facade.getProduct(
      TypeAccount.CCA,
      this.product.id
    );
    this.numberProductParent = homeProduct?.idUM;
    this.facade.fetchVirtualCreditCards(
      mapFetchVirtualCreditCardPayload({
        ...this.product,
        numberProduct: homeProduct?.idUM
      })
    );
    this.facade.setCreditLimit(this.product.creditLimit);
  }

  ngOnDestroy() {
    this.facade.resetVirtualCreditCards();
  }

  public showVirtualCreditCardDetail(card: VirtualCreditCard): void {
    if (this.modal.canDismiss) {
      void this.modal.dismiss();
    }

    this.facade.fetchVirtualCreditCarDetail({
      acctTypeParent: this.product.type,
      numberProductParent: this.numberProductParent,
      numberProductTCV: card.numberProductTCV
    });
  }

  public activateVirtualCreditCard(): void {
    this.facade.setProductSelectedDetail(this.product);
    this.facade.setActivateUrlBackTo(this.currentRoute);
    void this.navCtrl.navigateForward(VIRTUAL_CREDIT_CARD_ACTIVATE);
  }
  public async cancelVCC(card: VirtualCreditCard) {
    const virtualCreditCardDetail: Partial<VirtualCreditCardDetail> = {
      numberProductTCV: card.numberProductTCV,
      maxAmtTCV: card.amount.toString(),
      nickname: card.nickname
    };
    const modalSettingDefault: Partial<ModalOptions> = {
      componentProps: <Partial<VirtualCreditCardDetail>>{
        acctTypeParent: this.product.type,
        numberProductParent: this.numberProductParent,
        virtualCreditCardDetail
      },
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    };

    const modal = await this.modalCtrl.create({
      ...modalSettingDefault,
      id: 'virtual-credit-card-cancel',
      component: VirtualCreditCardCancelComponent
    });
    await modal.present();
  }
  public getSrcImgFranchise(cardNumber: string): string {
    return srcImgFranchise(cardNumber);
  }

  public openModal() {
    void this.modal.present();
  }

  get cardList$(): Observable<VirtualCreditCard[]> {
    return this.facade.virtualCreditCardList$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.completed$;
  }
}
