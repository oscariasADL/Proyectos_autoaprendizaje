import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletCardListPage } from '@modules/wallets/pages/wallet-card-list/wallet-card-list.page';
import { IonicModule } from '@ionic/angular';
import { WalletCardListRoutingModule } from '@modules/wallets/pages/wallet-card-list/wallet-card-list-routing.module';
import { WalletsModule } from '@modules/wallets/wallets.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WalletCardListRoutingModule,
    WalletsModule,
    GlobalPipesModule,
    HeadersModule
  ],
  declarations: [WalletCardListPage]
})
export class WalletCardListModule {}
