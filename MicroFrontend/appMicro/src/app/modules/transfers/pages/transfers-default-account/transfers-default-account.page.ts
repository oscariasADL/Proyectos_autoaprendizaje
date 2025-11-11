import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { TransfersDefaultAccountFacade } from '@modules/transfers/pages/transfers-default-account/transfers-default-account.facade';
import { DefaultAccount } from '@modules/transfers/pages/transfers-default-account/entities/transfers-default-account.entities';
import { getFullProductType } from '@modules/product/helpers/product.helper';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { TRANSFERS_DEFAULT_ACCOUNT_REMOVE } from '@modules/transfers/pages/transfers-default-account/constants/transfers-default-account.constants';

@Component({
  selector: 'app-transfers-default-account',
  templateUrl: './transfers-default-account.page.html',
  styleUrls: ['./transfers-default-account.page.sass']
})
export class TransfersDefaultAccountPage implements OnInit, OnDestroy {
  public readonly defaultAccount$: Observable<DefaultAccount> =
    this.facade.transferDefaultAccount$.pipe(
      filter((defaultAccount) => !isNullOrUndefined(defaultAccount)),
      map((defaultAccount) => ({
        ...defaultAccount,
        accountId: `${getFullProductType({
          type: defaultAccount.accountType
        })} No. ${defaultAccount.accountId}`
      }))
    );

  constructor(
    private alertService: AlertService,
    private facade: TransfersDefaultAccountFacade
  ) {}

  ngOnInit() {
    this.facade.fetchDefaultAccount();
  }

  ngOnDestroy() {
    this.facade.closeToast();
  }

  public async deleteDefaultAccount(): Promise<void> {
    const confirm = await this.alertService.create(
      TRANSFERS_DEFAULT_ACCOUNT_REMOVE
    );
    if (confirm) {
      this.facade.deleteDefaultAccount();
    }
  }

  get working$(): Observable<boolean> {
    return this.facade.transferDefaultAccountWorking$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.transferDefaultAccountCompleted$;
  }
}
