import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfersAvvPhoneTowardCellPhoneComponent } from '@modules/transfers/pages/transfers-avv-phone/components/transfers-avv-phone-toward-cell-phone/transfers-avv-phone-toward-cell-phone.component';
import { TransfersModule } from '../../transfers.module';
import { TransfersAvvPhonePageRoutingModule } from './transfers-avv-phone-routing.module';
import { TransfersAvvPhonePage } from './transfers-avv-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersAvvPhonePageRoutingModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransfersAvvPhonePage,
    TransfersAvvPhoneTowardCellPhoneComponent
  ]
})
export class TransfersAvvPhoneModule {}
