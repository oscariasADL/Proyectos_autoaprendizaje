import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { WithdrawModule } from '@modules/withdraw/withdraw.module';

import { CashWithdrawalsPageRoutingModule } from './cash-withdrawals-routing.module';

import { CashWithdrawalsPage } from './cash-withdrawals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashWithdrawalsPageRoutingModule,
    WithdrawModule
  ],
  declarations: [CashWithdrawalsPage]
})
export class CashWithdrawalsPageModule {}
