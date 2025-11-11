import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FindOtherFeaturesModule } from '@commons/components/find-other-features/find-other-features.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { TransfersModule } from '@modules/transfers/transfers.module';

import { TransfersHomePageRoutingModule } from './transfers-home-routing.module';

import { TransfersHomePage } from './transfers-home.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { CommonsModule } from '@commons/commons.module';
import { AddFavoriteCardComponent } from '@app/modules/favorites/component/add-favorite-card/add-favorite-card.component';
import { DenyAccountsDirective } from '@app/commons/directives/deny-accounts.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersHomePageRoutingModule,
    TransfersModule,
    HeadersModule,
    GlobalPipesModule,
    FindOtherFeaturesModule,
    CommonsModule,
    FeatureToggleDirective,
    DenyAccountsDirective,
    AddFavoriteCardComponent
  ],
  declarations: [TransfersHomePage]
})
export class TransfersHomePageModule {}
