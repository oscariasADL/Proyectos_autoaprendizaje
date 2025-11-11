import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from '@modules/favorites/favorites-routing.module';
import { FavoritesService } from '@modules/favorites/services/favorites.service';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FavoritesAccountInputComponent } from '@modules/favorites/component/favorites-account-input/favorites-account-input';
import { FavoritesAmountInputComponent } from '@modules/favorites/component/favorites-amount-input/favorites-amount-input';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { FavoritesNameInputComponent } from '@modules/favorites/component/favorites-name-input/favorites-name-input';
import { FavoritesTargetInputComponent } from '@modules/favorites/component/favorites-target-input/favorites-target-input';
import { FavoritesAddendaInputComponent } from '@modules/favorites/component/favorites-addenda-input/favorites-addenda-input.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  favoritesFeatureName,
  FavoritesState
} from '@modules/favorites/store/favorites.state';
import { favoritesReducer } from '@modules/favorites/store/favorites.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesHomeEffect } from '@modules/favorites/store/favorites.effect';
import { TransfersCel2celSendService } from '../transfers/pages/transfers-cel2cel-send/services/transfers-cel2cel-send.service';

export const FAVORITES_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<FavoritesState>
>('Favorites Module State');

@NgModule({
  declarations: [
    FavoritesNameInputComponent,
    FavoritesAccountInputComponent,
    FavoritesAmountInputComponent,
    FavoritesTargetInputComponent,
    FavoritesAddendaInputComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    GlobalPipesModule,
    FormsAvvModule,
    ProductModule,
    StoreModule.forFeature(favoritesFeatureName, FAVORITES_REDUCER_TOKEN),
    EffectsModule.forFeature([FavoritesHomeEffect])
  ],
  providers: [
    FavoritesFacade,
    TransfersCel2celSendService,
    FavoritesService,
    {
      provide: FAVORITES_REDUCER_TOKEN,
      useValue: favoritesReducer
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FavoritesModule {}
