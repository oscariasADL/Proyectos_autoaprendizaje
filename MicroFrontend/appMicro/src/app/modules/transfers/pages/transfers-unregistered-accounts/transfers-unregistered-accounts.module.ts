import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfersUnregisteredAccountsToWhoComponent } from '@modules/transfers/pages/transfers-unregistered-accounts/components/transfers-unregistered-accounts-to-who/transfers-unregistered-accounts-to-who.component';
import { TransfersUnregisteredAccountsTowardAccountComponent } from '@modules/transfers/pages/transfers-unregistered-accounts/components/transfers-unregistered-accounts-toward-account/transfers-unregistered-accounts-toward-account.component';
import { TransfersUnregisteredAccountsTowardCellPhoneComponent } from '@modules/transfers/pages/transfers-unregistered-accounts/components/transfers-unregistered-accounts-toward-cell-phone/transfers-unregistered-accounts-toward-cell-phone.component';
import { TransfersModule } from '../../transfers.module';
import { TransfersUnregisteredAccountsPageRoutingModule } from './transfers-unregistered-accounts-routing.module';
import { TransfersUnregisteredAccountsPage } from './transfers-unregistered-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersUnregisteredAccountsPageRoutingModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransfersUnregisteredAccountsPage,
    TransfersUnregisteredAccountsToWhoComponent,
    TransfersUnregisteredAccountsTowardAccountComponent,
    TransfersUnregisteredAccountsTowardCellPhoneComponent
  ]
})
export class TransfersUnregisteredAccountsPageModule {}
