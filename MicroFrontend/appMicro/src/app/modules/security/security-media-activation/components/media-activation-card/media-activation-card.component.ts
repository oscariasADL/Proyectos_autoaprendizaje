import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ActivationProduct,
  ActivationStatusDescription,
  ActivationStatusLabel
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { ACTIVATION_STATUS_CLASS } from '../../constants/security-media-activation.constants';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';

@Component({
  selector: 'app-media-activation-card',
  templateUrl: './media-activation-card.component.html',
  styleUrls: ['./media-activation-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaActivationCardComponent {
  @Input() product: ActivationProduct;
  @Input() icon: string;
  @Input() allowCardClick: boolean;

  @Output() options: EventEmitter<void> = new EventEmitter<void>();

  constructor(private facade: SecurityMediaActivationFacade) {}

  get validStatus(): boolean {
    return Object.values(ActivationStatusDescription)
      .map((item) => item.toLowerCase())
      .includes(this.product?.status?.toLowerCase());
  }

  public get digitalDebitCards(): ActivationProduct[] {
    return this.facade.digitalDebitCards$.currentValue();
  }

  public isDigitalDebitCard(digitalDebitCardNumber: string): boolean {
    const exists = this.digitalDebitCards.find((item: any) => {
      return item.numberDigitalCard === digitalDebitCardNumber;
    });
    return !!exists;
  }

  get statusClass(): string {
    return this.validStatus
      ? ACTIVATION_STATUS_CLASS[this.product?.status?.toLowerCase()]
      : ACTIVATION_STATUS_CLASS[
          ActivationStatusDescription.BLOCKED.toLocaleLowerCase()
        ];
  }

  get statusLabel(): string {
    return this.validStatus
      ? ActivationStatusLabel[
          this.product.status === 'POR ACTIVAR'
            ? 'POR_ACTIVAR'
            : this.product.status
        ]
      : ActivationStatusDescription.BLOCKED;
  }
}
