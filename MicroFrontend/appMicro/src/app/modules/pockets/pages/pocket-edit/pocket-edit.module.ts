import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

import { PocketEditPageRoutingModule } from '@modules/pockets/pages/pocket-edit/pocket-edit-routing.module';

import { PocketEditPage } from '@modules/pockets/pages/pocket-edit/pocket-edit.page';
import { PocketEditEffect } from '@modules/pockets/pages/pocket-edit/store/pocket-edit.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';
import { PocketEditUpdateComponent } from '@modules/pockets/pages/pocket-edit/components/pocket-edit-update/pocket-edit-update.component';
import { CommonsModule } from '@app/commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    IonicModule,
    PocketEditPageRoutingModule,
    PocketsModule,
    EffectsModule.forFeature([PocketEditEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    FormsAvvModule
  ],
  declarations: [PocketEditPage, PocketEditUpdateComponent]
})
export class PocketEditPageModule {}
