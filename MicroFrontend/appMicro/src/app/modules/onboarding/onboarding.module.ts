import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    GlobalPipesModule,
    SwiperModule
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
