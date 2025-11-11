import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfersRequestMoneyTowardComponent } from '@modules/transfers/pages/transfers-request-money/components/transfers-request-money-toward/transfers-request-money-toward.component';
import { TransfersModule } from '../../transfers.module';
import { TransfersRequestMoneyPageRoutingModule } from './transfers-request-money-routing.module';
import { TransfersRequestMoneyPage } from './transfers-request-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersRequestMoneyPageRoutingModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransfersRequestMoneyPage,
    TransfersRequestMoneyTowardComponent
  ]
})
export class TransfersRequestMoneyPageModule {}
