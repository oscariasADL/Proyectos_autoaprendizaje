import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxRoutingModule } from './tax-routing.module';
import { TaxPage } from './tax.page';
import { IonicModule } from '@ionic/angular';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { TaxSelectYearComponent } from './components/tax-select-year/tax-select-year.component';
import { TaxService } from './services/tax.service';
import { TaxFacade } from './tax.facade';
import { EffectsModule } from '@ngrx/effects';
import { TaxEffect } from './store/tax.effect';
import { TaxState, taxFeatureName } from './store/tax.state';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { taxReducer } from './store/tax.reducer';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

export const TAX_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<TaxState>>(
  'Tax Module State'
);

@NgModule({
  declarations: [TaxPage, TaxSelectYearComponent],
  imports: [
    CommonModule,
    TaxRoutingModule,
    IonicModule,
    StoreModule.forFeature(taxFeatureName, TAX_REDUCER_TOKEN),
    EffectsModule.forFeature([TaxEffect]),
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule
  ],
  providers: [
    TaxFacade,
    TaxService,
    {
      provide: TAX_REDUCER_TOKEN,
      useValue: taxReducer
    }
  ]
})
export class TaxPageModule {}
