import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FavoritesTransferPage } from '@modules/favorites/pages/favorites-transfer/favorites-transfer.page';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FavoritesTransferPageRoutingModule } from '@modules/favorites/pages/favorites-transfer/favorites-transfer.routing.module';
import { FavoritesModule } from '@modules/favorites/favorites.module';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { RechargesFacade } from '@modules/product-options/recharges/recharges.facade';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { TransfersModule } from '@modules/transfers/transfers.module';
import { RechargesPageModule } from '@modules/product-options/recharges/recharges.module';
import { WithdrawModule } from '@modules/withdraw/withdraw.module';
import { PaymentServicesPayPageModule } from '@modules/payments/payment-services/pages/payment-services-pay/payment-services-pay.module';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { FavoritesEditModule } from '@modules/favorites/pages/favorites-edit/favorites-edit.module';

@NgModule({
  declarations: [FavoritesTransferPage],
  imports: [
    CommonModule,
    IonicModule,
    HeadersModule,
    GlobalPipesModule,
    FavoritesTransferPageRoutingModule,
    FavoritesModule,
    VoucherModule,
    TransfersModule,
    RechargesPageModule,
    WithdrawModule,
    PaymentServicesPayPageModule,
    FavoritesEditModule
  ],
  providers: [
    TransfersFacade,
    RechargesFacade,
    WithdrawFacade,
    PaymentServicesFacade
  ]
})
export class FavoritesTransferModule {}
