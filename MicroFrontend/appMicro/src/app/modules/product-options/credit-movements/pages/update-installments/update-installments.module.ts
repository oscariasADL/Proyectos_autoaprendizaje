import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CreditMovementsModule } from '@modules/product-options/credit-movements/credit-movements.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';

import { UpdateInstallmentsPageRoutingModule } from './update-installments-routing.module';

import { UpdateInstallmentsPage } from './update-installments.page';
import { UpdateInstallmentsListComponent } from '@modules/product-options/credit-movements/pages/update-installments/components/update-installments-list/update-installments-list.component';
import { ModifyInstallmentsComponent } from '@modules/product-options/credit-movements/pages/update-installments/components/modify-installments/modify-installments.component';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateInstallmentsPageRoutingModule,
    CreditMovementsModule,
    GenericStepperModule,
    ReactiveFormsModule,
    FormsAvvModule
  ],
  declarations: [
    UpdateInstallmentsPage,
    UpdateInstallmentsListComponent,
    ModifyInstallmentsComponent
  ]
})
export class UpdateInstallmentsPageModule {}
