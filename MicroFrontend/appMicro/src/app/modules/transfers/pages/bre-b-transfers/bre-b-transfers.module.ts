import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreBTransfersRoutingModule } from './bre-b-transfers-routing.module';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonsModule } from '@app/commons/commons.module';
import { FormsAvvModule } from '@app/modules/forms-avv/forms-avv.module';
import { DropdownModalProductsComponent } from '@app/modules/forms-avv/components/dropdown-modal-products/dropdown-modal-products.component';
import { BreBTransfersFacade } from './bre-b-transfers.facade';
import { BreBTransfersPage } from './bre-b-transfers.page';
import { BreBTransfersTowardComponent } from './components/bre-b-transfers-toward/bre-b-transfers-toward.component';
import { ProductModule } from '@app/modules/product/product.module';
import { BreBTransfersConfirmationComponent } from './components/bre-b-transfers-confirmation/bre-b-transfers-confirmation.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BreBTransfersEffect } from './store/bre-b-transfers.effect';
import {
  brebBTransfersFeatureName,
  BreBTransfersState
} from './store/bre-b-transfers.state';
import { breBTransfersReducer } from './store/bre-b-transfers.reducer';
import { TransfersService } from '../../service/transfers.service';
import { GenericStepperModule } from '@app/modules/templates/generic-stepper/generic-stepper.module';
import { VoucherModule } from '@app/commons/components/voucher/voucher.module';
import { BreBTransfersDataComponent } from './components/bre-b-transfers-data/bre-b-transfers-data.component';
import { BreBTransfersService } from '@modules/transfers/pages/bre-b-transfers/services/bre-b-transfers.service';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

export const BRE_B_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<BreBTransfersState>
>('BreB Transfers Module State');

@NgModule({
  declarations: [
    BreBTransfersPage,
    BreBTransfersTowardComponent,
    BreBTransfersConfirmationComponent,
    BreBTransfersDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreBTransfersRoutingModule,
    GlobalPipesModule,
    ReactiveFormsModule,
    CommonsModule,
    StoreModule.forFeature(brebBTransfersFeatureName, BRE_B_REDUCER_TOKEN),
    EffectsModule.forFeature([BreBTransfersEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    ReactiveFormsModule,
    FormsAvvModule,
    VoucherModule,
    DropdownModalProductsComponent,
    ProductModule,
    FeatureToggleDirective
  ],
  providers: [
    BreBTransfersFacade,
    TransfersService,
    BreBTransfersService,
    {
      provide: BRE_B_REDUCER_TOKEN,
      useValue: breBTransfersReducer
    }
  ]
})
export class BreBTransfersModule {}
