import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { DownloadFacade } from '@commons/components/download/download.facade';
import { DownloadEffect } from '@commons/components/download/store/download.effect';
import { downloadReducer } from '@commons/components/download/store/download.reducer';
import {
  downloadFeatureName,
  DownloadState
} from '@commons/components/download/store/download.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

export const DOWNLOAD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<DownloadState>
>('Download Module State');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(downloadFeatureName, DOWNLOAD_REDUCER_TOKEN),
    EffectsModule.forFeature([DownloadEffect])
  ],
  providers: [
    DownloadFacade,
    {
      provide: DOWNLOAD_REDUCER_TOKEN,
      useValue: downloadReducer
    }
  ]
})
export class DownloadModule {}
