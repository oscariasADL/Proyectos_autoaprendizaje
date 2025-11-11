import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { WalletsRoutingModule } from '@modules/wallets/wallets-routing.module';
import {
  WalletsState,
  walletsFeatureName
} from '@modules/wallets/store/wallets.state';
import { walletsReducer } from '@modules/wallets/store/wallets.reducer';
import { WalletsEffect } from '@modules/wallets/store/wallets.effect';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import { WalletsService } from '@modules/wallets/services/wallets.service';
import { WalletSdkEffect } from '@modules/wallets/store/wallet-sdk.effect';
import { DigitalWalletStrategyProvider } from '@modules/wallets/digital-wallet-provider';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';
import { FeatureToggleDirective } from '@app/commons/directives/feature-toggle/feature-toggle.directive';

const WALLETS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<WalletsState>
>('Wallets Reducers');

@NgModule({
  declarations: [],
  imports: [
    WalletsRoutingModule,
    FeatureToggleDirective,
    StoreModule.forFeature(walletsFeatureName, WALLETS_REDUCER_TOKEN),
    EffectsModule.forFeature([WalletsEffect, WalletSdkEffect])
  ],
  providers: [
    DigitalWalletStrategyProvider,
    DigitalWalletContextService,
    WalletsService,
    WalletsFacade,
    {
      provide: WALLETS_REDUCER_TOKEN,
      useValue: walletsReducer
    }
  ]
})
export class WalletsModule {}
