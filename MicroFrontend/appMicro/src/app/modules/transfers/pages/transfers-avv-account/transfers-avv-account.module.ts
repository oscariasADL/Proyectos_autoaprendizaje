import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfersAvvAccountTowardAccountComponent } from '@modules/transfers/pages/transfers-avv-account/components/transfers-avv-account-toward-account/transfers-avv-account-toward-account.component';
import { TransfersModule } from '../../transfers.module';
import { TransfersAvvAccountPageRoutingModule } from './transfers-avv-account-routing.module';
import { TransfersAvvAccountPage } from './transfers-avv-account.page';
import { TransfersBaseAccountsTowardComponent } from '@modules/transfers/components/transfers-base-accounts-toward/transfers-base-accounts-toward.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersAvvAccountPageRoutingModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransfersAvvAccountPage,
    TransfersAvvAccountTowardAccountComponent,
    TransfersBaseAccountsTowardComponent
  ]
})
export class TransfersAvvAccountModule {}
