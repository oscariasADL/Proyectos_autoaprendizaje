import { Component, Input } from '@angular/core';
import {
  ActivationProduct,
  ActivationStatusDescription,
  ActivationStatusLabel,
  ProductTypeActivation
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { ACTIVATION_STATUS_CLASS } from '@modules/security/security-media-activation/constants/security-media-activation.constants';

@Component({
  selector: 'app-block-account-media-card',
  templateUrl: './block-account-media-card.component.html',
  styleUrls: ['./block-account-media-card.component.sass']
})
export class BlockAccountMediaCardComponent {
  @Input() product: ActivationProduct;
  @Input() icon: string;

  get status(): boolean {
    return Object.values(ActivationStatusDescription)
      .map((item) => item.toLowerCase())
      .includes(this.product?.status?.toLowerCase());
  }

  get class(): string {
    return this.status
      ? ACTIVATION_STATUS_CLASS[this.product?.status?.toLowerCase()]
      : ACTIVATION_STATUS_CLASS[
          ActivationStatusDescription.BLOCKED.toLocaleLowerCase()
        ];
  }

  get label(): string {
    return this.status
      ? ActivationStatusLabel[
          this.product.status === 'POR ACTIVAR'
            ? 'POR_ACTIVAR'
            : this.product.status
        ]
      : ActivationStatusDescription.BLOCKED;
  }

  public mediaName(type: string): string {
    return ProductTypeActivation[type];
  }
}
