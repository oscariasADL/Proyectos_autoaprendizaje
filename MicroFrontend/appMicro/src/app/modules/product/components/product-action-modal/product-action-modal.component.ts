import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Platform } from '@ionic/angular';
import { ProductAction } from '@modules/product/entities/product-action.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-action-modal',
  templateUrl: './product-action-modal.component.html',
  styleUrls: ['./product-action-modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActionModalComponent implements OnInit, OnDestroy {
  @Input() actions: ProductAction[];

  private subscription: Subscription;

  constructor(private modalCtrl: ModalController, private platform: Platform) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.third,
      () => {
        this.modalCtrl.dismiss();
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(action: ProductAction): void {
    this.modalCtrl.dismiss({ action });
  }
}
