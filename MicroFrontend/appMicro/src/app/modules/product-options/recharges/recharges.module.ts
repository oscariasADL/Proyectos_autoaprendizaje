import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ContactListPageModule } from '@modules/contacts/pages/contact-list/contact-list.module';
import { RechargesFacade } from '@modules/product-options/recharges/recharges.facade';
import { RechargesService } from '@modules/product-options/recharges/service/recharges.service';
import { RechargesEffect } from '@modules/product-options/recharges/store/recharges.effect';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';
import { RechargesPageRoutingModule } from './recharges-routing.module';
import { RechargesPage } from './recharges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechargesPageRoutingModule,
    EffectsModule.forFeature([RechargesEffect]),
    GenericStepperModule,
    ContactListPageModule,
    GlobalPipesModule
  ],
  declarations: [RechargesPage],
  providers: [RechargesFacade, RechargesService]
})
export class RechargesPageModule {}
