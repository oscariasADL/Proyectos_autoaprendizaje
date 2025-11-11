import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailCampaignComponent } from '@modules/marketing-campaigns/components/product-detail-campaign/product-detail-campaign.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { MarketingCampaignsFacade } from '@modules/marketing-campaigns/marketing-campaigns.facade';
import { VoucherCampaignComponent } from './components/voucher-campaign/voucher-campaign.component';
import { IonicModule } from '@ionic/angular';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';
import { SliderCampaignComponent } from './components/slider-campaign/slider-campaign.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProductDetailCampaignComponent,
    VoucherCampaignComponent,
    SliderCampaignComponent
  ],
  imports: [
    CommonModule,
    GlobalPipesModule,
    IonicModule,
    SwiperModule,
    PreloadImageDirective
  ],
  exports: [
    ProductDetailCampaignComponent,
    VoucherCampaignComponent,
    SliderCampaignComponent
  ],
  providers: [MarketingCampaignsFacade]
})
export class MarketingCampaignsModule {}
