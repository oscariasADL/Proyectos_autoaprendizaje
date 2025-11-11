import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherListComponent {
  @Input() items: VoucherItem[];
  @Input() className: string;
  @Input() utagCategory: string | null = null;

  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
}
