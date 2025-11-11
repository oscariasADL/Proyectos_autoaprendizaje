import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockAccountPageRoutingModule } from './block-account-routing.module';

import { BlockAccountPage } from './block-account.page';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { BlockAccountFormComponent } from '@modules/product-options/block-account/components/block-account-form/block-account-form.component';
import { BlockAccountInfoComponent } from '@modules/product-options/block-account/components/block-account-info/block-account-info.component';
import { BlockAccountMediaCardComponent } from '@modules/product-options/block-account/components/block-account-media-card/block-account-media-card.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  blockAccountFeatureName,
  BlockAccountState
} from '@modules/product-options/block-account/store/block-account.state';
import { EffectsModule } from '@ngrx/effects';
import { BlockAccountEffect } from '@modules/product-options/block-account/store/block-account.effect';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { BlockAccountService } from '@modules/product-options/block-account/services/block-account.service';
import { blockAccountReducer } from '@modules/product-options/block-account/store/block-account.reducer';
import { ProductDetailFacade } from '@modules/product-detail/product-detail.facade';
import { BlockAccountGuard } from '@modules/product-options/block-account/guards/block-account.guard';
import { HomeFacade } from '@modules/home/home.facade';

export const BLOCK_ACCOUNT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<BlockAccountState>
>('Block account Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BlockAccountPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule,
    StoreModule.forFeature(
      blockAccountFeatureName,
      BLOCK_ACCOUNT_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([BlockAccountEffect])
  ],
  declarations: [
    BlockAccountPage,
    BlockAccountFormComponent,
    BlockAccountInfoComponent,
    BlockAccountMediaCardComponent
  ],
  providers: [
    HomeFacade,
    BlockAccountFacade,
    BlockAccountService,
    ProductDetailFacade,
    BlockAccountGuard,
    {
      provide: BLOCK_ACCOUNT_REDUCER_TOKEN,
      useValue: blockAccountReducer
    }
  ]
})
export class BlockAccountPageModule {}
