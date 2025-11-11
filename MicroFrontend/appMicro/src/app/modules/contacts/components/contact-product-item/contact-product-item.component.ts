import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ContactProduct } from '@modules/contacts/entities/contact.interface';

@Component({
  selector: 'app-contact-product-item',
  templateUrl: './contact-product-item.component.html',
  styleUrls: ['./contact-product-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactProductItemComponent {
  @Input() product: ContactProduct;

  @Output() action: EventEmitter<void> = new EventEmitter<void>();
}
