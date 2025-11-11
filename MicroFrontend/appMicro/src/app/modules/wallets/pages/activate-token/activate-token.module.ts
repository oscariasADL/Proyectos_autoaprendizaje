import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { ActivateTokenPageRoutingModule } from './activate-token-routing.module';

import { ActivateTokenPage } from './activate-token.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { TranslateModule } from '@ngx-translate/core';

import { ActivateTokenEffect } from '@modules/wallets/pages/activate-token/store/activate-token.effect';
import { ActivateTokenService } from '@modules/wallets/pages/activate-token/services/activate-token.service';
import {
  activateTokenFeatureName,
  ActivateTokenState
} from '@modules/wallets/pages/activate-token/store/activate-token.state';
import { activateTokenReducer } from '@modules/wallets/pages/activate-token/store/activate-token.reducer';
import { ActivateTokenFacade } from '@modules/wallets/pages/activate-token/activate-token.facade';

const ACTIVATE_TOKEN_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ActivateTokenState>
>('Activate Token Reducers');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivateTokenPageRoutingModule,
    GlobalPipesModule,
    TranslateModule,
    StoreModule.forFeature(
      activateTokenFeatureName,
      ACTIVATE_TOKEN_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ActivateTokenEffect])
  ],
  declarations: [ActivateTokenPage],
  providers: [
    ActivateTokenService,
    ActivateTokenFacade,
    {
      provide: ACTIVATE_TOKEN_REDUCER_TOKEN,
      useValue: activateTokenReducer
    }
  ]
})
export class ActivateTokenPageModule {}
