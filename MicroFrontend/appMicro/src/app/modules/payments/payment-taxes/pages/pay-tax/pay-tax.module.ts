import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchListModule } from '@commons/components/search-list/search-list.module';
import { IonicModule } from '@ionic/angular';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { PaymentTaxesModule } from '../../payment-taxes.module';
import { PayTaxPageRoutingModule } from './pay-tax-routing.module';
import { PayTaxPage } from './pay-tax.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayTaxPageRoutingModule,
    PaymentTaxesModule,
    GenericStepperModule
  ],
  declarations: [PayTaxPage]
})
export class PayTaxPageModule {}
