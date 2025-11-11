import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingActivateVirtualCreditCardPageRoutingModule } from './onboarding-activate-virtual-credit-card-routing.module';

import { OnboardingActivateVirtualCreditCardPage } from './onboarding-activate-virtual-credit-card.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';
import { VirtualCreditCardModule } from '@modules/virtual-credit-card/virtual-credit-card.module';
import { CommonsModule } from '@app/commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    IonicModule,
    OnboardingActivateVirtualCreditCardPageRoutingModule,
    GlobalPipesModule,
    HeadersModule,
    PreloadImageDirective,
    VirtualCreditCardModule
  ],
  declarations: [OnboardingActivateVirtualCreditCardPage]
})
export class OnboardingActivateVirtualCreditCardPageModule {}
