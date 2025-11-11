import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';
import { DebitPurchaseTowardComponent } from './components/debit-purchase-toward/debit-purchase-toward.component';
import { DebitPurchasePageRoutingModule } from './debit-purchase-routing.module';
import { DebitPurchaseFacade } from './debit-purchase.facade';
import { DebitPurchasePage } from './debit-purchase.page';
import { DebitPurchaseService } from './service/debit-purchase.service';
import { DebitPurchaseEffect } from './store/debit-purchase.effect';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DebitPurchasePageRoutingModule,
    GenericStepperModule,
    GlobalPipesModule,
    EffectsModule.forFeature([DebitPurchaseEffect]),
    ReactiveFormsModule,
    FormsAvvModule,
    ProductModule
  ],
  declarations: [DebitPurchasePage, DebitPurchaseTowardComponent],
  providers: [DebitPurchaseFacade, DebitPurchaseService]
})
export class DebitPurchasePageModule {}
