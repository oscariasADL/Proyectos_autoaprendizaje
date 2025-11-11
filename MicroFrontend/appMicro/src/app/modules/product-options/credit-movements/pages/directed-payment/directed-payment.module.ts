import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreditMovementsModule } from '@modules/product-options/credit-movements/credit-movements.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { DirectedPaymentPageRoutingModule } from './directed-payment-routing.module';
import { DirectedPaymentPage } from './directed-payment.page';
import { DirectedPaymentListComponent } from '@modules/product-options/credit-movements/pages/directed-payment/components/directed-payment-list/directed-payment-list.component';
import { DirectedPaymentAmountComponent } from '@modules/product-options/credit-movements/pages/directed-payment/components/directed-payment-amount/directed-payment-amount.component';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { DropdownModalProductsComponent } from '@modules/forms-avv/components/dropdown-modal-products/dropdown-modal-products.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DirectedPaymentPageRoutingModule,
    CreditMovementsModule,
    GenericStepperModule,
    FormsAvvModule,
    DropdownModalProductsComponent
  ],
  declarations: [
    DirectedPaymentPage,
    DirectedPaymentListComponent,
    DirectedPaymentAmountComponent
  ]
})
export class DirectedPaymentPageModule {}
