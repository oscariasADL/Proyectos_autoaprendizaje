import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PocketDeleteFacade } from '@modules/pockets/pages/pocket-delete/pocket-delete.facade';
import { PocketDeleteEffect } from '@modules/pockets/pages/pocket-delete/store/pocket-delete.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PocketsModule,
    EffectsModule.forFeature([PocketDeleteEffect])
  ],
  providers: [PocketDeleteFacade]
})
export class PocketDeleteModule {}
