import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { SecurityHomeFacade } from '@modules/security/security-home/security-home.facade';

import { SecurityHomePageRoutingModule } from './security-home-routing.module';

import { SecurityHomePage } from './security-home.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityHomePageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    FeatureToggleDirective
  ],
  declarations: [SecurityHomePage],
  providers: [SecurityHomeFacade]
})
export class SecurityHomePageModule {}
