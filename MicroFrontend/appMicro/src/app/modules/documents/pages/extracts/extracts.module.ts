import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { ExtractsService } from '@modules/documents/pages/extracts/services/extracts.service';
import { ExtractsEffect } from '@modules/documents/pages/extracts/store/extracts.effect';
import { extractsReducer } from '@modules/documents/pages/extracts/store/extracts.reducer';
import {
  extractsFeatureName,
  ExtractsState
} from '@modules/documents/pages/extracts/store/extracts.state';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { ExtractsPageRoutingModule } from './extracts-routing.module';

import { ExtractsPage } from './extracts.page';
import { ExtractsSelectProductComponent } from '@modules/documents/pages/extracts/components/extracts-select-product/extracts-select-product.component';
import { ProductModule } from '@modules/product/product.module';
import { ExtractsSelectSubproductComponent } from '@modules/documents/pages/extracts/components/extracts-select-subproduct/extracts-select-subproduct.component';
import { ExtractsSelectedProductComponent } from '@modules/documents/pages/extracts/components/extracts-selected-product/extracts-selected-product.component';

export const EXTRACTS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ExtractsState>
>('Extracts Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtractsPageRoutingModule,
    StoreModule.forFeature(extractsFeatureName, EXTRACTS_REDUCER_TOKEN),
    EffectsModule.forFeature([ExtractsEffect]),
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule,
    ProductModule
  ],
  providers: [
    ExtractsFacade,
    ExtractsService,
    {
      provide: EXTRACTS_REDUCER_TOKEN,
      useValue: extractsReducer
    }
  ],
  declarations: [
    ExtractsPage,
    ExtractsSelectProductComponent,
    ExtractsSelectSubproductComponent,
    ExtractsSelectedProductComponent
  ]
})
export class ExtractsPageModule {}
