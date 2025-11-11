import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { IonicModule } from '@ionic/angular';
import { MovementModule } from '@modules/movement/movement.module';
import { ProductDetailMovementsComponent } from '@modules/product-detail/components/product-detail-movements/product-detail-movements.component';
import { CdtRenewalModule } from '@modules/product-options/cdt-renewal/cdt-renewal.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ProductModule } from '../product/product.module';
import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { ProductsFacade } from '@modules/products/products.facade';
import { ProductDetailFacade } from './product-detail.facade';
import { ProductDetailPage } from './product-detail.page';
import { ProductDetailService } from './services/product-detail.service';
import { ProductDetailEffect } from './store/product-detail.effect';
import { productDetailReducer } from './store/product-detail.reducer';
import {
  productDetailFeatureName,
  ProductDetailState
} from './store/product-detail.state';
import { PFMModule } from '@modules/pfm/pfm.module';
import { CancelAccountModule } from '@modules/product-options/cancel-account/cancel-account.module';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { MarketingCampaignsModule } from '@modules/marketing-campaigns/marketing-campaigns.module';
import { DigitalDebitCardPanelComponent } from '@modules/digital-debit-card/component/digital-debit-card-panel/digital-debit-card-panel.component';
import { SecurityMediaActivationPageModule } from '@modules/security/security-media-activation/security-media-activation.module';
import { VirtualCreditCardPanelComponent } from '@modules/virtual-credit-card/components/virtual-credit-card-panel/virtual-credit-card-panel.component';
import { WalletProductDetailPanelComponent } from '@modules/wallets/components/wallet-product-detail-panel/wallet-product-detail-panel.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ProductDetailState>
>('Product Detail Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPageRoutingModule,
    GlobalPipesModule,
    StoreModule.forFeature(productDetailFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([ProductDetailEffect]),
    HeadersModule,
    ProductModule,
    MovementModule,
    CdtRenewalModule,
    DigitalDebitCardPanelComponent,
    PFMModule,
    CancelAccountModule,
    MarketingCampaignsModule,
    FeatureToggleDirective,
    SecurityMediaActivationPageModule,
    VirtualCreditCardPanelComponent,
    WalletProductDetailPanelComponent
  ],
  declarations: [ProductDetailPage, ProductDetailMovementsComponent],
  providers: [
    ProductDetailFacade,
    ProductsFacade,
    ProductDetailService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: productDetailReducer
    }
  ]
})
export class ProductDetailPageModule {}
