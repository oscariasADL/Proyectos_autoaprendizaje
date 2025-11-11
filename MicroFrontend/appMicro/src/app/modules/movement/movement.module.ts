import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { MovementItemComponent } from '@modules/movement/components/movement-item/movement-item.component';
import { MovementFacade } from '@modules/movement/movement.facade';
import { MovementService } from '@modules/movement/services/movement.service';
import { MovementEffect } from '@modules/movement/store/movement.effect';
import { movementReducer } from '@modules/movement/store/movement.reducer';
import {
  movementFeatureName,
  MovementState
} from '@modules/movement/store/movement.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

export const MOVEMENT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<MovementState>
>('Movement Module State');

@NgModule({
  declarations: [MovementItemComponent],
  exports: [MovementItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(movementFeatureName, MOVEMENT_REDUCER_TOKEN),
    EffectsModule.forFeature([MovementEffect]),
    GlobalPipesModule
  ],
  providers: [
    MovementFacade,
    MovementService,
    {
      provide: MOVEMENT_REDUCER_TOKEN,
      useValue: movementReducer
    }
  ]
})
export class MovementModule {}
