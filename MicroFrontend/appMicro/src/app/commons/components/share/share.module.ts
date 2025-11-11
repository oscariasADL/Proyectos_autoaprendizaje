import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ShareFacade } from '@commons/components/share/share.facade';
import { ShareEffect } from '@commons/components/share/store/share.effect';
import { shareReducer } from '@commons/components/share/store/share.reducer';
import {
  shareFeatureName,
  ShareState
} from '@commons/components/share/store/share.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

export const SHARE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ShareState>
>('Share Module State');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(shareFeatureName, SHARE_REDUCER_TOKEN),
    EffectsModule.forFeature([ShareEffect])
  ],
  providers: [
    ShareFacade,
    {
      provide: SHARE_REDUCER_TOKEN,
      useValue: shareReducer
    }
  ]
})
export class ShareModule {}
