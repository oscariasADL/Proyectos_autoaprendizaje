import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UseQuotaPageRoutingModule } from './use-quota-routing.module';

import { UseQuotaPage } from './use-quota.page';
import { UseQuotaFacade } from '@modules/product-options/use-quota/use-quota.facade';
import { UseQuotaService } from '@modules/product-options/use-quota/service/use-quota.service';
import { EffectsModule } from '@ngrx/effects';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { UseQuotaEffect } from '@modules/product-options/use-quota/store/use-quota.effect';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UseQuotaPageRoutingModule,
    EffectsModule.forFeature([UseQuotaEffect]),
    GenericStepperModule
  ],
  declarations: [UseQuotaPage],
  providers: [UseQuotaFacade, UseQuotaService]
})
export class UseQuotaPageModule {}
