import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertInfoComponent } from '@commons/components/alert-info/alert-info.component';
import { AlertSheetComponent } from '@commons/components/alert-sheet/alert-sheet.component';
import { AlertComponent } from '@commons/components/alert/alert.component';
import { DownloadModule } from '@commons/components/download/download.module';
import { ShareModule } from '@commons/components/share/share.module';
import { ToastComponent } from '@commons/components/toast/toast.component';
import { TransfiyaInfoComponent } from '@commons/components/transfiya-info/transfiya-info.component';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { InactiveChannelComponent } from './components/inactive-channel/inactive-channel.component';
import { LoadingComponent } from './components/loading/loading.component';
import { GlobalPipesModule } from './pipes/global-pipes.module';
import { PopoverComponent } from '@commons/components/popover/popover.component';
import { FavoritesCommonModule } from '@commons/components/favorites/favorites-common.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { AlertOptionsComponent } from '@commons/components/alert-options/alert-options.component';
import { AlertBaseComponent } from '@commons/components/alert-base/alert-base.component';
import { UtagDirective } from '@commons/directives/tealium/utag.directive';
import { PopupSecurityAlertComponent } from '@commons/components/popup-security-alert/popup-security-alert.component';
import { MarketingCampaignsModule } from '@modules/marketing-campaigns/marketing-campaigns.module';
import { NotificationComponent } from './components/notification/notification.component';
import { BalanceInfoComponent } from './components/balance-info/balance-info.component';
import { PreloadImageDirective } from './directives/preload-image/preload-image.directive';
import { IonicModule } from '@ionic/angular';
import { ImageSvgComponent } from './components/image-svg/image-svg.component';
import { PopupErrorLoginComponent } from './components/popup-error-login/popup-error-login.component';
import { MovementsDatePickerComponent } from './components/movements-date-picker/movements-date-picker.component';
import { OfflineComponent } from './components/offline/offline.component';
import { AlertBigPictureComponent } from './components/alert-big-picture/alert-big-picture.component';

@NgModule({
  declarations: [
    LoadingComponent,
    InactiveChannelComponent,
    TransfiyaInfoComponent,
    AlertSheetComponent,
    AlertInfoComponent,
    AlertBaseComponent,
    AlertComponent,
    AlertBigPictureComponent,
    AlertOptionsComponent,
    ToastComponent,
    PopoverComponent,
    PopupSecurityAlertComponent,
    UtagDirective,
    NotificationComponent,
    BalanceInfoComponent,
    ImageSvgComponent,
    PopupErrorLoginComponent,
    MovementsDatePickerComponent,
    OfflineComponent
  ],
  imports: [
    CommonModule,
    GlobalPipesModule,
    ShareModule,
    DownloadModule,
    VoucherModule,
    FavoritesCommonModule,
    FormsAvvModule,
    MarketingCampaignsModule,
    PreloadImageDirective,
    IonicModule
  ],
  exports: [
    LoadingComponent,
    InactiveChannelComponent,
    TransfiyaInfoComponent,
    AlertSheetComponent,
    AlertBigPictureComponent,
    AlertInfoComponent,
    AlertComponent,
    AlertOptionsComponent,
    ToastComponent,
    PopoverComponent,
    PopupSecurityAlertComponent,
    UtagDirective,
    NotificationComponent,
    BalanceInfoComponent,
    ImageSvgComponent,
    PopupErrorLoginComponent,
    MovementsDatePickerComponent,
    VoucherModule
  ]
})
export class CommonsModule {}
