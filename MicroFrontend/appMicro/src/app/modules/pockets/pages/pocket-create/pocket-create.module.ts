import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { PocketCreateEffect } from '@modules/pockets/pages/pocket-create/store/pocket-create.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';

import { PocketCreatePageRoutingModule } from './pocket-create-routing.module';

import { PocketCreatePage } from './pocket-create.page';
import { PocketCreateCustomizationComponent } from '@modules/pockets/components/pocket-create-customization/pocket-create-customization.component';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { DropdownModalProductsComponent } from '@modules/forms-avv/components/dropdown-modal-products/dropdown-modal-products.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocketCreatePageRoutingModule,
    PocketsModule,
    EffectsModule.forFeature([PocketCreateEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    FormsAvvModule,
    DropdownModalProductsComponent,
    PocketCreateCustomizationComponent
  ],
  declarations: [PocketCreatePage]
})
export class PocketCreatePageModule {}
