import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { BlockTemporaryCalendarComponent } from '@modules/security/security-media-activation/components/block-temporary-calendar/block-temporary-calendar.component';
import { BlockTemporaryComponent } from '@modules/security/security-media-activation/components/block-temporary/block-temporary.component';
import { MediaActivationCardComponent } from '@modules/security/security-media-activation/components/media-activation-card/media-activation-card.component';
import { UnblockProductComponent } from '@modules/security/security-media-activation/components/unblock-product/unblock-product.component';
import { UnlockProductComponent } from '@modules/security/security-media-activation/components/unlock-product/unlock-product.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ActivateProductBlockComponent } from './components/activate-product-block/activate-product-block.component';
import { ActivateProductFromComponent } from './components/activate-product-from/activate-product-from.component';
import { ActivateProductPasswordComponent } from './components/activate-product-password/activate-product-password.component';
import { ActivateProductComponent } from './components/activate-product/activate-product.component';
import { MediaActivationCardOptionsComponent } from './components/media-activation-card-options/media-activation-card-options.component';
import { MediaActivationHomeComponent } from './components/media-activation-home/media-activation-home.component';
import { SecurityMediaActivationPageRoutingModule } from './security-media-activation-routing.module';
import { SecurityMediaActivationFacade } from './security-media-activation.facade';
import { SecurityMediaActivationPage } from './security-media-activation.page';
import { SecurityMediaActivationService } from './services/security-media-activation.service';
import { SecurityMediaActivationEffect } from './store/security-media.effect';
import { securityConfigReducer } from './store/security-media.reducer';
import { featureName } from './store/security-media.state';
import { PasswordBaseComponent } from '@modules/security/security-media-activation/components/password-base/password-base.component';
import { SwiperModule } from 'swiper/angular';
import { ProductCantLoadProductComponent } from '@app/modules/product/components/product-cant-load-product/product-cant-load-product.component';
import { CommonsModule } from '@app/commons/commons.module';
import { VirtualCreditCardBenefitsComponent } from './components/virtual-credit-card-benefits/virtual-credit-card-benefits.component';

@NgModule({
  declarations: [
    SecurityMediaActivationPage,
    MediaActivationHomeComponent,
    MediaActivationCardComponent,
    MediaActivationCardOptionsComponent,
    ActivateProductComponent,
    ActivateProductFromComponent,
    ActivateProductPasswordComponent,
    ActivateProductBlockComponent,
    UnlockProductComponent,
    UnblockProductComponent,
    BlockTemporaryComponent,
    BlockTemporaryCalendarComponent,
    PasswordBaseComponent,
    VirtualCreditCardBenefitsComponent
  ],
  imports: [
    CommonModule,
    CommonsModule,
    ReactiveFormsModule,
    IonicModule,
    SecurityMediaActivationPageRoutingModule,
    HeadersModule,
    StoreModule.forFeature(featureName, securityConfigReducer),
    EffectsModule.forFeature([SecurityMediaActivationEffect]),
    GlobalPipesModule,
    FormsAvvModule,
    SwiperModule,
    ProductCantLoadProductComponent
  ],
  providers: [SecurityMediaActivationService, SecurityMediaActivationFacade]
})
export class SecurityMediaActivationPageModule {}
