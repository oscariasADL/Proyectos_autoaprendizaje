import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockCardTemporarilyPageRoutingModule } from './block-card-temporarily-routing.module';

import { BlockCardTemporarilyPage } from './block-card-temporarily.page';
import { BlockCardTemporarilyFacade } from '@modules/product-options/block-card-temporarily/block-card-temporarily.facade';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { BlockCardTemporarilyFromComponent } from '@modules/product-options/block-card-temporarily/components/block-card-temporarily-from/block-card-temporarily-from.component';
import { BlockCardTemporarilyDateComponent } from '@modules/product-options/block-card-temporarily/components/block-card-temporarily-date/block-card-temporarily-date.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockCardTemporarilyPageRoutingModule,
    GenericStepperModule,
    GlobalPipesModule
  ],
  declarations: [
    BlockCardTemporarilyPage,
    BlockCardTemporarilyFromComponent,
    BlockCardTemporarilyDateComponent
  ],
  providers: [BlockCardTemporarilyFacade, SecurityMediaActivationFacade]
})
export class BlockCardTemporarilyPageModule {}
