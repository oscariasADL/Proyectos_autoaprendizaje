import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { IonContent, Platform } from '@ionic/angular';
import { ProductAction } from '@modules/product/entities/product-action.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-action-tour',
  templateUrl: './product-action-tour.component.html',
  styleUrls: ['./product-action-tour.component.sass']
})
export class ProductActionTourComponent implements OnInit, OnDestroy {
  @Input() actions: ProductAction[];
  @Input() listId: string;
  @Input() detailContainer: IonContent;

  public hideContent: boolean = true;

  private subscription: Subscription;

  constructor(private modalCtrl: ModalController, private platform: Platform) {}

  ngOnInit(): void {
    this.alignComponents();

    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.third,
      () => {
        this.close();
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

  public close(): void {
    this.modalCtrl.dismiss();
  }

  private alignComponents(): void {
    const productActionsList = document.getElementById(this.listId);
    const separation = 56;

    const moveElements = () => {
      const rect = productActionsList.getBoundingClientRect();
      const list = document.getElementById('product-actions-list-tour');
      const info = document.getElementById('product-action-tour-info');

      list.style.top = rect.y + 'px';
      info.style.top = rect.y - info.clientHeight - separation + 'px';

      this.hideContent = false;
    };

    if (!isNullOrUndefined(productActionsList)) {
      setTimeout(() => {
        const rect = productActionsList.getBoundingClientRect();
        const list = document.getElementById('product-actions-list-tour');
        const info = document.getElementById('product-action-tour-info');

        const smallerThanScreenSize =
          rect.y - info.clientHeight - separation < 0;

        const largerThanScreenSize =
          rect.y + list.clientHeight > window.innerHeight;

        if (smallerThanScreenSize || largerThanScreenSize) {
          const contentHeight =
            info.clientHeight + list.clientHeight + separation;

          const newPosition = contentHeight / 2 - separation;

          const duration = 300;

          this.detailContainer
            .scrollToPoint(0, newPosition, duration)
            .then(() => moveElements());
        } else {
          moveElements();
        }
      }, 0);
    }
  }
}
