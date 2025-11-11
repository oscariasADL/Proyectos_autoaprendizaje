import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeModule } from '@commons/components/range/range.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { CardAdvanceFacade } from '@modules/product-options/card-advance/card-advance.facade';
import { CardAdvanceAmountComponent } from '@modules/product-options/card-advance/components/card-advance-amount/card-advance-amount.component';
import { CardAdvanceService } from '@modules/product-options/card-advance/service/card-advance.service';
import { CardAdvanceEffect } from '@modules/product-options/card-advance/store/card-advance.effect';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';

import { CardAdvancePageRoutingModule } from './card-advance-routing.module';

import { CardAdvancePage } from './card-advance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardAdvancePageRoutingModule,
    EffectsModule.forFeature([CardAdvanceEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    FormsAvvModule,
    ReactiveFormsModule,
    RangeModule
  ],
  declarations: [CardAdvancePage, CardAdvanceAmountComponent],
  providers: [CardAdvanceFacade, CardAdvanceService]
})
export class CardAdvancePageModule {}
