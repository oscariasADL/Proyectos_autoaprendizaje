import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { WithdrawModule } from '@modules/withdraw/withdraw.module';

import { MoneyOrdersPageRoutingModule } from './money-orders-routing.module';

import { MoneyOrdersPage } from './money-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoneyOrdersPageRoutingModule,
    WithdrawModule
  ],
  declarations: [MoneyOrdersPage]
})
export class MoneyOrdersPageModule {}
