import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';

import { PocketsModule } from '@modules/pockets/pockets.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';
import { EditPocketWithReturnsPage } from './edit-pocket-with-returns.page';
import { EditPocketWithReturnsPageRoutingModule } from './edit-pocket-with-returns-routing.module';
import { PocketDetailWithReturnsFacade } from '../pocket-detail-with-returns/pocket-detail-with-returns.facade';
import { ConfirmPocketWithReturnsComponent } from './components/confirm-pocket-with-returns/confirm-pocket-with-returns.component';
import { PocketithReturnsEditEffect } from './store/edit-pocket-with-returns.effect';
import { EditPocketWithReturnsFacade } from './store/edit-pocket-with-returns.facade';
import { PocketWithReturnsGuard } from './guards/pocket-with-returns.guard';
import { CommonsModule } from '@app/commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    IonicModule,
    EditPocketWithReturnsPageRoutingModule,
    PocketsModule,
    EffectsModule.forFeature([PocketithReturnsEditEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    FormsAvvModule
  ],
  declarations: [EditPocketWithReturnsPage, ConfirmPocketWithReturnsComponent],
  providers: [
    PocketDetailWithReturnsFacade,
    EditPocketWithReturnsFacade,
    PocketWithReturnsGuard
  ]
})
export class EditPocketWithReturnsPageModule {}
