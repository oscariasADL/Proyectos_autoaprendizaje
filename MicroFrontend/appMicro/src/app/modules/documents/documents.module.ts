import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { DocumentsFacade } from '@modules/documents/documents.facade';
import { documentsReducer } from '@modules/documents/store/documents.reducer';
import {
  documentsFeatureName,
  DocumentsState
} from '@modules/documents/store/documents.state';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

export const DOCUMENTS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<DocumentsState>
>('Documents Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    StoreModule.forFeature(documentsFeatureName, DOCUMENTS_REDUCER_TOKEN),
    FeatureToggleDirective
  ],
  declarations: [DocumentsPage],
  providers: [
    DocumentsFacade,
    {
      provide: DOCUMENTS_REDUCER_TOKEN,
      useValue: documentsReducer
    }
  ]
})
export class DocumentsPageModule {}
