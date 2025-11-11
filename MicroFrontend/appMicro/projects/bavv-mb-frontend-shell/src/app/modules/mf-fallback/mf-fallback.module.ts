import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MfFallbackPageRoutingModule } from './mf-fallback-routing.module';

import { MfFallbackPage } from './mf-fallback.page';
import { HeadersModule } from '@app/commons/components/headers/headers.module';
import { CommonsModule } from '@app/commons/commons.module';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MfFallbackPageRoutingModule,
    HeadersModule,
    GlobalPipesModule
  ],
  declarations: [MfFallbackPage]
})
export class MfFallbackPageModule {}
