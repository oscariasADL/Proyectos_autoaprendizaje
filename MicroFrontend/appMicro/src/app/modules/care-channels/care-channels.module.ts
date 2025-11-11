import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CareChannelsPageRoutingModule } from './care-channels-routing.module';
import { CareChannelsFacade } from './care-channels.facade';
import { CareChannelsPage } from './care-channels.page';
import { PreferredCustomerComponent } from './components/preferred-customer/preferred-customer.component';
import { CareChannelsService } from './services/care-channels.service';
import { CarechannelsEffect } from './store/care-channels.effect';
import { carechannelsReducer } from './store/care-channels.reducer';
import { carechannelsFeatureName } from './store/care-channels.state';
import { AppFacade } from '@app/app.facade';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeadersModule,
    GlobalPipesModule,
    CareChannelsPageRoutingModule,
    StoreModule.forFeature(carechannelsFeatureName, carechannelsReducer),
    EffectsModule.forFeature([CarechannelsEffect])
  ],
  declarations: [CareChannelsPage, PreferredCustomerComponent],
  providers: [CareChannelsFacade, AppFacade, CareChannelsService]
})
export class CareChannelsPageModule {}
