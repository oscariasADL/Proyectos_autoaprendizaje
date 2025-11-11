import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfersCel2celHomePageRoutingModule } from './transfers-cel2cel-home-routing.module';

import { TransfersCel2celHomePage } from './transfers-cel2cel-home.page';
import { TransfersModule } from '@modules/transfers/transfers.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { CommonsModule } from '@commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersCel2celHomePageRoutingModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule,
    HeadersModule,
    CommonsModule,
    FeatureToggleDirective
  ],
  declarations: [TransfersCel2celHomePage]
})
export class TransfersCel2celHomePageModule {}
