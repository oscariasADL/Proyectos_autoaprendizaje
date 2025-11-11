import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { PaymentCard } from '@modules/shared/entities/payment-card.interface';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentCardComponent {
  @Input() card: PaymentCard;

  @Output() pay: EventEmitter<void> = new EventEmitter<void>();
}
