import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonContent } from '@ionic/angular';

import { ModalController } from '@commons/controllers/modal.controller';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  tourEnterAnimation,
  tourLeaveAnimation
} from '@modules/product/animations/product.animation';
import { ProductActionModalComponent } from '@modules/product/components/product-action-modal/product-action-modal.component';
import { ProductActionTourComponent } from '@modules/product/components/product-action-tour/product-action-tour.component';
import { ProductAction } from '@modules/product/entities/product-action.interface';
import { mapProductAction } from '@modules/product/mappers/product-action.mapper';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';

const MAX_ACTIONS_TO_SHOW = 4;

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActionsComponent implements OnChanges {
  @Input() product: ProductDetail;
  @Input() productTypeDetailKey: ProductTypeDetail;
  @Input() detailContainer: IonContent;

  @Output()
  actionSelected: EventEmitter<ProductAction> =
    new EventEmitter<ProductAction>();

  public actions: ProductAction[];

  constructor(private modalCtrl: ModalController) {}

  ngOnChanges(): void {
    this.actions = mapProductAction(
      this.product,
      this.productTypeDetailKey,
      Capacitor.getPlatform()
    );
  }

  public async moreActions(): Promise<void> {
    const presentModel = await this.modalCtrl.create({
      component: ProductActionModalComponent,
      componentProps: {
        actions: this.actions,
        id: 'product-actions-modal'
      },
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });

    this.closePresent(presentModel);

    return await presentModel.present();
  }

  public async actionsTour(): Promise<void> {
    const presentModel = await this.modalCtrl.create({
      component: ProductActionTourComponent,
      componentProps: {
        listId: this.listId,
        actions: this.actions,
        detailContainer: this.detailContainer,
        id: 'product-actions-modal'
      },
      mode: 'md',
      cssClass: 'avv-custom-center-modal2',
      enterAnimation: tourEnterAnimation,
      leaveAnimation: tourLeaveAnimation
    });

    this.closePresent(presentModel);

    return await presentModel.present();
  }

  public closePresent(presentModel: HTMLIonModalElement): void {
    presentModel.onWillDismiss().then(({ data }) => {
      if (!isNullOrUndefined(data)) {
        const { action } = data;
        this.actionSelected.emit(action);
      }
    });
  }

  get maxNumberActions(): number {
    return MAX_ACTIONS_TO_SHOW;
  }

  get actionsTourId(): string {
    return 'product-actions-tour-' + this.product.id;
  }

  get listId(): string {
    return 'product-actions-list-' + this.product.id;
  }
  get typeAccount(): typeof TypeAccount {
    return TypeAccount;
  }
}
