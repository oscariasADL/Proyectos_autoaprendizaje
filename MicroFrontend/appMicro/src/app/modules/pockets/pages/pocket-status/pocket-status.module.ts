import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PocketStatusFacade } from '@modules/pockets/pages/pocket-status/pocket-status.facade';
import { PocketStatusEffect } from '@modules/pockets/pages/pocket-status/store/pocket-status.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PocketsModule,
    EffectsModule.forFeature([PocketStatusEffect])
  ],
  providers: [PocketStatusFacade]
})
export class PocketStatusModule {}
