import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { AvalProductsPanelComponent } from '@modules/products/components/aval-products-panel/aval-products-panel.component';
import { productsReducer } from '@modules/products/store/products.reducer';
import {
  productsFeatureName,
  ProductsState
} from '@modules/products/store/products.state';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ProductModule } from '../product/product.module';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsFacade } from './products.facade';
import { ProductsPage } from './products.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

export const PRODUCTS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ProductsState>
>('Products Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    HeadersModule,
    ProductModule,
    StoreModule.forFeature(productsFeatureName, PRODUCTS_REDUCER_TOKEN),
    FormsAvvModule,
    GlobalPipesModule,
    FeatureToggleDirective
  ],
  declarations: [ProductsPage, AvalProductsPanelComponent],
  providers: [
    ProductsFacade,
    {
      provide: PRODUCTS_REDUCER_TOKEN,
      useValue: productsReducer
    }
  ]
})
export class ProductsPageModule {}
