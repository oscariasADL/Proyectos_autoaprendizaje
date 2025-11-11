import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { ActivationProduct } from '../../entities/security-media.interface';
import {
  ActivateProductSteps,
  MediaStepsData
} from '../../store/security-media.state';
import { NavController } from '@ionic/angular';
import * as NAVIGATE_ from '@commons/constants/navigate.constants';
@Component({
  selector: 'app-activate-product-block',
  templateUrl: './activate-product-block.component.html',
  styleUrls: ['./activate-product-block.component.sass']
})
export class ActivateProductBlockComponent {
  @Input() product: ActivationProduct;

  @Output()
  continue: EventEmitter<MediaStepsData> = new EventEmitter<MediaStepsData>();

  constructor(
    private facade: SecurityMediaActivationFacade,
    private navCtrl: NavController
  ) {}

  public blockProduct(): void {
    this.continue.emit({
      step: ActivateProductSteps.sendBlockProduct,
      data: this.product.id
    });
  }

  public redirectLink(): void {
    this.facade.redirectExternal(LinkKey.linkCostTable);
  }
}
