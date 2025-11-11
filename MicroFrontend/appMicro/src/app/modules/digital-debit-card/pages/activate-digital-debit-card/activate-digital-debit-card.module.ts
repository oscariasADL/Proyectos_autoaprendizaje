import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateDigitalDebitCardPageRoutingModule } from './activate-digital-debit-card-routing.module';

import { ActivateDigitalDebitCardPage } from './activate-digital-debit-card.page';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ActivateDigitalDebitCardInfoComponent } from '@modules/digital-debit-card/pages/activate-digital-debit-card/components/activate-digital-debit-card-info/activate-digital-debit-card-info.component';
import { ActivateDigitalDebitCardConfigComponent } from '@modules/digital-debit-card/pages/activate-digital-debit-card/components/activate-digital-debit-card-config/activate-digital-debit-card-config.component';
import { DigitalDebitCardModule } from '@modules/digital-debit-card/digital-debit-card.module';
import { ProductModule } from '@modules/product/product.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivateDigitalDebitCardPageRoutingModule,
    GenericStepperModule,
    GlobalPipesModule,
    DigitalDebitCardModule,
    ProductModule,
    FormsAvvModule
  ],
  declarations: [
    ActivateDigitalDebitCardPage,
    ActivateDigitalDebitCardInfoComponent,
    ActivateDigitalDebitCardConfigComponent
  ]
})
export class ActivateDigitalDebitCardPageModule {}
