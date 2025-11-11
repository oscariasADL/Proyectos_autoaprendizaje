import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ProductAction } from '@modules/product/entities/product-action.interface';

@Component({
  selector: 'app-product-action-item',
  templateUrl: './product-action-item.component.html',
  styleUrls: ['./product-action-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActionItemComponent {
  @Input() action: ProductAction;
  @Input() className: string = '';
  @Input() isNew: boolean = false;

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
