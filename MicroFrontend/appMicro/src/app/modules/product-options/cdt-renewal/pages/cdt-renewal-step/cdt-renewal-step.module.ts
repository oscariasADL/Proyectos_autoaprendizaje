import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { CdtRenewalModule } from '@modules/product-options/cdt-renewal/cdt-renewal.module';

import { CdtRenewalStepPageRoutingModule } from './cdt-renewal-step-routing.module';

import { CdtRenewalStepPage } from './cdt-renewal-step.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CdtRenewalStepPageRoutingModule,
    HeadersModule,
    CdtRenewalModule,
    GlobalPipesModule
  ],
  declarations: [CdtRenewalStepPage]
})
export class CdtRenewalStepPageModule {}
