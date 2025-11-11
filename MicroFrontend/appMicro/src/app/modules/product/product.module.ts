import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ProductActionItemComponent } from '@modules/product/components/product-action-item/product-action-item.component';
import { ProductActionModalComponent } from '@modules/product/components/product-action-modal/product-action-modal.component';
import { ProductActionTourComponent } from '@modules/product/components/product-action-tour/product-action-tour.component';
import { ProductCardItemComponent } from '@modules/product/components/product-card-item/product-card-item.component';
import { ProductCardComponent } from '@modules/product/components/product-card/product-card.component';
import { ProductDetailCardComponent } from '@modules/product/components/product-detail-card/product-detail-card.component';
import { ProductGroupCardComponent } from '@modules/product/components/product-group-card/product-group-card.component';
import { ProductSummaryComponent } from '@modules/product/components/product-summary/product-summary.component';
import { HiddenFormatPipe } from '@modules/product/pipes/hidden-format.pipe';
import { ProductFacade } from '@modules/product/product.facade';
import { ProductService } from '@modules/product/services/product.service';
import { ProductEffect } from '@modules/product/store/product.effect';
import { productReducer } from '@modules/product/store/product.reducer';
import {
  productFeatureName,
  ProductState
} from '@modules/product/store/product.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ProductActionsComponent } from './components/product-actions/product-actions.component';
import { ProductSquareCardComponent } from './components/product-square-card/product-square-card.component';
import { ProductToggleBalancesComponent } from './components/product-toggle-balances/product-toggle-balances.component';
import { HomeFacade } from '@modules/home/home.facade';
import { ProductCreditProductsErrorComponent } from '@modules/product/components/product-credit-products-error/product-credit-products-error.component';
import { LoginFacade } from '@modules/auth/login/login.facade';
import { AppFacade } from '@app/app.facade';
import { CommonsModule } from '@commons/commons.module';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { TagAvalPopoverComponent } from './components/product-card/tag-aval-popover/tag-aval-popover.component';
import { CardFooterItemComponent } from './components/product-card/card-footer-item/card-footer-item.component';
import { RegisterBrebKeyComponent } from './components/product-card/register-breb-key/register-breb-key.component';
import { AvalKeyDetailsComponent } from './components/product-detail-card/aval-key-details/aval-key-details.component';
import { ViewMoreKeysButtonComponent } from './components/product-card/view-more-keys-button/view-more-keys-button.component';
import { BreBKeyDetailsComponent } from './components/product-detail-card/bre-b-key-details/bre-b-key-details.component';
import { DenyAccountsDirective } from '@app/commons/directives/deny-accounts.directive';
import { SingleUnregisteredKeyButtonComponent } from './components/product-card/single-unregistered-key-button/single-unregistered-key-button.component';

export const PRODUCT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ProductState>
>('Product Module State');

@NgModule({
  declarations: [
    ProductSquareCardComponent,
    ProductActionsComponent,
    ProductActionItemComponent,
    ProductActionModalComponent,
    ProductCardComponent,
    ProductCardItemComponent,
    ProductSummaryComponent,
    ProductGroupCardComponent,
    ProductDetailCardComponent,
    ProductActionTourComponent,
    ProductToggleBalancesComponent,
    ProductCreditProductsErrorComponent,
    HiddenFormatPipe,
    TagAvalPopoverComponent,
    CardFooterItemComponent,
    RegisterBrebKeyComponent,
    SingleUnregisteredKeyButtonComponent,
    AvalKeyDetailsComponent,
    ViewMoreKeysButtonComponent,
    BreBKeyDetailsComponent
  ],
  exports: [
    ProductSquareCardComponent,
    ProductActionsComponent,
    ProductActionItemComponent,
    ProductActionModalComponent,
    ProductCardComponent,
    ProductCardItemComponent,
    ProductSummaryComponent,
    ProductGroupCardComponent,
    ProductDetailCardComponent,
    ProductActionTourComponent,
    ProductToggleBalancesComponent
  ],
  imports: [
    CommonModule,
    GlobalPipesModule,
    IonicModule,
    TranslateModule,
    RouterModule,
    StoreModule.forFeature(productFeatureName, PRODUCT_REDUCER_TOKEN),
    EffectsModule.forFeature([ProductEffect]),
    CommonsModule,
    FeatureToggleDirective,
    DenyAccountsDirective
  ],
  providers: [
    ProductFacade,
    HomeFacade,
    AppFacade,
    LoginFacade,
    ProductService,
    HiddenFormatPipe,
    {
      provide: PRODUCT_REDUCER_TOKEN,
      useValue: productReducer
    }
  ]
})
export class ProductModule {}
