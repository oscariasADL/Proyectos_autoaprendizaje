import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';

import { WithdrawPageRoutingModule } from './withdraw-routing.module';

import { WithdrawPage } from './withdraw.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    FeatureToggleDirective
  ],
  declarations: [WithdrawPage]
})
export class WithdrawPageModule {}
