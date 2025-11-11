import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TransfersBaseAccountsTowardComponent } from '@modules/transfers/components/transfers-base-accounts-toward/transfers-base-accounts-toward.component';

@Component({
  selector: 'app-transfers-avv-account-toward-account',
  templateUrl: './transfers-avv-account-toward-account.component.html',
  styleUrls: ['./transfers-avv-account-toward-account.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfersAvvAccountTowardAccountComponent
  extends TransfersBaseAccountsTowardComponent
  implements OnInit
{
  ngOnInit(): void {
    this.initForm();
  }
}
