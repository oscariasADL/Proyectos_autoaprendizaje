import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TransfersBaseAccountsTowardComponent } from '@modules/transfers/components/transfers-base-accounts-toward/transfers-base-accounts-toward.component';

@Component({
  selector: 'app-transfers-unregistered-accounts-toward-account',
  templateUrl:
    './transfers-unregistered-accounts-toward-account.component.html',
  styleUrls: [
    './transfers-unregistered-accounts-toward-account.component.sass'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfersUnregisteredAccountsTowardAccountComponent
  extends TransfersBaseAccountsTowardComponent
  implements OnInit
{
  ngOnInit(): void {
    this.initForm();
  }
}
