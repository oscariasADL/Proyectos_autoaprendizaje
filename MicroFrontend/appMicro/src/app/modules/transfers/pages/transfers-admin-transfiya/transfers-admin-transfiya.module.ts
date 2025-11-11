import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfersAdminTransfiyaPageRoutingModule } from './transfers-admin-transfiya-routing.module';

import { TransfersAdminTransfiyaPage } from './transfers-admin-transfiya.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersAdminTransfiyaPageRoutingModule,
    GlobalPipesModule,
    HeadersModule,
    FeatureToggleDirective
  ],
  declarations: [TransfersAdminTransfiyaPage]
})
export class TransfersAdminTransfiyaPageModule {}
