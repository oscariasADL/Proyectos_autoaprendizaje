import { Component, Input } from '@angular/core';
import { BalanceInfo } from '@commons/entities/product/balance.interface';

@Component({
  selector: 'app-balance-info',
  templateUrl: './balance-info.component.html',
  styleUrls: ['./balance-info.component.sass']
})
export class BalanceInfoComponent {
  @Input() balanceInfo: BalanceInfo;
  @Input() totalText: string;
  @Input() title: string;
}
