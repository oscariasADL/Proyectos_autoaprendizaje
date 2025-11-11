import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { AvalFacade } from '@modules/aval/aval.facade';
import { AvalProductCardComponent } from '@modules/aval/components/aval-product-card/aval-product-card.component';
import { AvalProductsComponent } from '@modules/aval/components/aval-products/aval-products.component';
import { StocksDetailComponent } from '@modules/aval/components/stocks-detail/stocks-detail.component';
import { StocksComponent } from '@modules/aval/components/stocks/stocks.component';
import { TuPlusComponent } from '@modules/aval/components/tu-plus/tu-plus.component';
import { AvalStocksDetailTitlePipe } from '@modules/aval/pipes/aval-stocks-detail-title.pipe';
import { AvalService } from '@modules/aval/services/aval.service';
import { AvalEffect } from '@modules/aval/store/aval.effect';
import { avalReducer } from '@modules/aval/store/aval.reducer';
import { avalFeatureName, AvalState } from '@modules/aval/store/aval.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { AvalRoutingModule } from './aval-routing.module';

export const AVAL_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<AvalState>
>('Aval Module State');

@NgModule({
  declarations: [
    AvalProductsComponent,
    AvalProductCardComponent,
    TuPlusComponent,
    StocksComponent,
    StocksDetailComponent,
    AvalStocksDetailTitlePipe
  ],
  imports: [
    CommonModule,
    AvalRoutingModule,
    GlobalPipesModule,
    IonicModule,
    HeadersModule,
    StoreModule.forFeature(avalFeatureName, AVAL_REDUCER_TOKEN),
    EffectsModule.forFeature([AvalEffect])
  ],
  providers: [
    AvalFacade,
    AvalService,
    AvalStocksDetailTitlePipe,
    {
      provide: AVAL_REDUCER_TOKEN,
      useValue: avalReducer
    }
  ]
})
export class AvalModule {}
