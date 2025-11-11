import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateVirtualCreditCardPageRoutingModule } from './activate-virtual-credit-card-routing.module';

import { ActivateVirtualCreditCardPage } from './activate-virtual-credit-card.page';
import { ActivateVirtualCreditCardConfirmComponent } from '@modules/virtual-credit-card/pages/activate-virtual-credit-card/components/activate-virtual-credit-card-confirm/activate-virtual-credit-card-confirm.component';
import { ActivateVirtualCreditCardConfigComponent } from '@modules/virtual-credit-card/pages/activate-virtual-credit-card/components/activate-virtual-credit-card-config/activate-virtual-credit-card-config.component';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VirtualCreditCardModule } from '@modules/virtual-credit-card/virtual-credit-card.module';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { CommonsModule } from '@app/commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    IonicModule,
    ActivateVirtualCreditCardPageRoutingModule,
    GenericStepperModule,
    GlobalPipesModule,
    VirtualCreditCardModule,
    PreloadImageDirective,
    FormsAvvModule
  ],
  declarations: [
    ActivateVirtualCreditCardPage,
    ActivateVirtualCreditCardConfigComponent,
    ActivateVirtualCreditCardConfirmComponent
  ]
})
export class ActivateVirtualCreditCardPageModule {}
