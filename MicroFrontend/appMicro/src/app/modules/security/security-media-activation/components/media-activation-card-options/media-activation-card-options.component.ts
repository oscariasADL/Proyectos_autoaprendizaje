import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { Platform } from '@ionic/angular';
import {
  ActivationProduct,
  MediaActivationOptionItem,
  MediaActivationType,
  ProductTypeActivation
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { Subscription } from 'rxjs';
import {
  MEDIA_ACTIVATION_CARD_OPTIONS,
  MEDIA_ACTIVATION_CARD_OPTIONS_RESTRICTED
} from '../../constants/security-media-activation.constants';

@Component({
  selector: 'app-media-activation-card-options',
  templateUrl: './media-activation-card-options.component.html',
  styleUrls: ['./media-activation-card-options.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaActivationCardOptionsComponent implements OnInit, OnDestroy {
  @Input() product: ActivationProduct;

  private subscription: Subscription;

  constructor(private modalCtrl: ModalController, private platform: Platform) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.third,
      () => {
        this.closeModal();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public selectType(type: MediaActivationType): void {
    this.modalCtrl.dismiss({ type });
  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
  }

  get optionsFiltered(): MediaActivationOptionItem[] {
    return this.mediaActivationCardOptions.filter((item) =>
      MEDIA_ACTIVATION_CARD_OPTIONS_RESTRICTED[item.type]
        ? MEDIA_ACTIVATION_CARD_OPTIONS_RESTRICTED[item.type].includes(
            ProductTypeActivation[this.product.activationType]
          )
        : true
    );
  }

  get mediaActivationCardOptions(): typeof MEDIA_ACTIVATION_CARD_OPTIONS {
    return MEDIA_ACTIVATION_CARD_OPTIONS;
  }
}
