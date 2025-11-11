import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { CalendarModule } from '@commons/components/calendar/calendar.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { DigitalDebitCardModule } from '@modules/digital-debit-card/digital-debit-card.module';
import { HomePromotionsComponent } from '@modules/home/components/home-promotions/home-promotions.component';
import { ProductModule } from '../product/product.module';
import { HomeAlertsComponent } from './components/home-alerts/home-alerts.component';
import { HomeRequestProductsComponent } from './components/home-request-products/home-request-products.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HomeFacade } from './home.facade';
import { HomePage } from './home.page';
import { HomeEffect } from './store/home.effect';
import { homeReducer } from './store/home.reducer';
import { homeFeatureName, HomeState } from './store/home.state';
import { FavoritesModule } from '@modules/favorites/favorites.module';
import { FavoritesPanelModule } from '@modules/favorites/component/favorites-panel/favorites-panel.module';
import { HomeMarketingSpaceComponent } from '@modules/home/components/home-marketing-space/home-marketing-space.component';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { HomeStoriesComponent } from './components/home-stories/home-stories.component';
import { HomeStoriesViewComponent } from './components/home-stories-view/home-stories-view.component';
import { ProductsFacade } from '../products/products.facade';
import { DigitalDebitCardPanelComponent } from '@modules/digital-debit-card/component/digital-debit-card-panel/digital-debit-card-panel.component';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';
import { FavoritesEditModule } from '@modules/favorites/pages/favorites-edit/favorites-edit.module';
import { BreBTransfersModule } from '../transfers/pages/bre-b-transfers/bre-b-transfers.module';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<HomeState>
>('Home Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GlobalPipesModule,
    HeadersModule,
    StoreModule.forFeature(homeFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([HomeEffect]),
    ProductModule,
    TranslateModule.forChild(),
    CalendarModule,
    DigitalDebitCardModule,
    DigitalDebitCardPanelComponent,
    FavoritesModule,
    FavoritesPanelModule,
    FeatureToggleDirective,
    PreloadImageDirective,
    BreBTransfersModule
  ],
  declarations: [
    HomePage,
    HomeAlertsComponent,
    HomePromotionsComponent,
    HomeRequestProductsComponent,
    HomeMarketingSpaceComponent,
    HomeStoriesComponent,
    HomeStoriesViewComponent
  ],
  providers: [
    HomeFacade,
    ProductsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: homeReducer
    }
  ]
})
export class HomePageModule {}
