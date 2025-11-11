import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfersSendMoneyTowardCellPhoneComponent } from '@modules/transfers/pages/transfers-send-money/components/transfers-avv-phone-toward-cell-phone/transfers-send-money-toward-cell-phone.component';
import { TransfersModule } from '../../transfers.module';
import { TransfersSendMoneyPageRoutingModule } from './transfers-send-money-routing.module';
import { TransfersSendMoneyPage } from './transfers-send-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersSendMoneyPageRoutingModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransfersSendMoneyPage,
    TransfersSendMoneyTowardCellPhoneComponent
  ]
})
export class TransfersSendMoneyModule {}
