import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PFMRoutingModule } from './pfm-routing.module';
import { PFMModuleName, PFMState } from '@modules/pfm/store/pfm.state';
import { PFMEffect } from '@modules/pfm/store/pfm.effect';
import { pfmReducer } from '@modules/pfm/store/pfm.reducer';
import { PFMService } from '@modules/pfm/services/pfm.service';
import { PFMFacade } from '@modules/pfm/pfm.facade';
import { ProductDetailSummaryComponent } from '@modules/pfm/components/product-detail-summary/product-detail-summary.component';
import { ProductDetailMovementListComponent } from '@modules/pfm/components/product-detail-movement-list/product-detail-movement-list.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ChangeCategoryModalComponent } from '@modules/pfm/components/change-category-modal/change-category-modal.component';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { AdviserAvalComponent } from './components/adviser-aval/adviser-aval.component';

export const PFM_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<PFMState>>(
  'PFM Module State'
);

@NgModule({
  declarations: [
    ProductDetailSummaryComponent,
    ProductDetailMovementListComponent,
    ChangeCategoryModalComponent,
    AdviserAvalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PFMRoutingModule,
    GlobalPipesModule,
    StoreModule.forFeature(PFMModuleName, PFM_REDUCER_TOKEN),
    EffectsModule.forFeature([PFMEffect]),
    FormsAvvModule
  ],
  exports: [
    ProductDetailSummaryComponent,
    ProductDetailMovementListComponent,
    AdviserAvalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: PFM_REDUCER_TOKEN,
      useValue: pfmReducer
    },
    PFMService,
    PFMFacade
  ]
})
export class PFMModule {}
