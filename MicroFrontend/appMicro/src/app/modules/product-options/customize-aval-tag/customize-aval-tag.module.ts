import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';

import { CustomizeAvalTagEffect } from '@modules/product-options/customize-aval-tag/store/customize-aval-tag.effect';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CustomizeAvalTagFacade } from '@modules/product-options/customize-aval-tag/customize-aval-tag.facade';
import { CustomizeAvalTagRoutingModule } from '@modules/product-options/customize-aval-tag/customize-aval-tag-routing.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { CustomizeAvalTagService } from '@modules/product-options/customize-aval-tag/services/customize-aval-tag.service';
import { CustomizeAvalTagPage } from '@modules/product-options/customize-aval-tag/customize-aval-tag.page';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { CommonsModule } from '@app/commons/commons.module';
import { CustomizeAvalTagSelectComponent } from './components/customize-aval-tag-select/customize-aval-tag-select.component';
import { RadioBtnComponent } from './components/radio-btn/radio-btn.component';
import { TapRadioCardComponent } from './components/tap-radio-card/tap-radio-card.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { customizeAvalTagReducer } from './store/customize-aval-tag.reducer';
import CustomizeResultTransactionComponent from './components/customize-result-transaction/customize-result-transaction.component';
import { CustomizeResultFailedComponent } from './components/customize-result-failed/customize-result-failed.component';
import { CustomizeAvalTagModalTermsComponent } from '@modules/product-options/customize-aval-tag/components/customize-aval-tag-modal-terms/customize-aval-tag-modal-terms.component';
import { PreloadImageDirective } from '@commons/directives/preload-image/preload-image.directive';

@NgModule({
  declarations: [
    CustomizeAvalTagPage,
    CustomizeAvalTagSelectComponent,
    RadioBtnComponent,
    TapRadioCardComponent,
    CustomizeResultTransactionComponent,
    CustomizeResultFailedComponent,
    CustomizeAvalTagModalTermsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GlobalPipesModule,
    HeadersModule,
    CustomizeAvalTagRoutingModule,
    EffectsModule.forFeature([CustomizeAvalTagEffect]),
    StoreModule.forFeature('customizeAvalTag', customizeAvalTagReducer),
    IonicModule,
    FormsAvvModule,
    CommonsModule,
    FormsModule,
    PreloadImageDirective
  ],
  providers: [CustomizeAvalTagFacade, CustomizeAvalTagService]
})
export class CustomizeAvalTagModule {}
