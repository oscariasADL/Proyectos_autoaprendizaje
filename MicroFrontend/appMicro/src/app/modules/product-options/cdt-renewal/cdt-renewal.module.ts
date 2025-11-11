import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CdtRenewalFacade } from '@modules/product-options/cdt-renewal/cdt-renewal.facade';
import { CdtRenewalNoticeComponent } from '@modules/product-options/cdt-renewal/components/cdt-renewal-notice/cdt-renewal-notice.component';
import { CdtRenewalService } from '@modules/product-options/cdt-renewal/services/cdt-renewal.service';
import { CdtRenewalEffect } from '@modules/product-options/cdt-renewal/store/cdt-renewal.effect';
import { cdtRenewalReducer } from '@modules/product-options/cdt-renewal/store/cdt-renewal.reducer';
import {
  cdtRenewalFeatureName,
  CdtRenewalState
} from '@modules/product-options/cdt-renewal/store/cdt-renewal.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<CdtRenewalState>
>('Cdt Renewal Module State');

@NgModule({
  declarations: [CdtRenewalNoticeComponent],
  exports: [CdtRenewalNoticeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(cdtRenewalFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([CdtRenewalEffect]),
    GlobalPipesModule
  ],
  providers: [
    CdtRenewalFacade,
    CdtRenewalService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: cdtRenewalReducer
    }
  ]
})
export class CdtRenewalModule {}
