import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelAccountModalComponent } from '@modules/product-options/cancel-account/components/cancel-account-modal/cancel-account-modal.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { CancelAccountFacade } from '@modules/product-options/cancel-account/cancel-account.facade';
import { CancelAccountService } from '@modules/product-options/cancel-account/services/cancel-account.service';
import { EffectsModule } from '@ngrx/effects';
import { CancelAccountsEffect } from '@modules/product-options/cancel-account/store/cancel-accounts.effect';

@NgModule({
  declarations: [CancelAccountModalComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([CancelAccountsEffect]),
    GlobalPipesModule
  ],
  providers: [CancelAccountFacade, CancelAccountService]
})
export class CancelAccountModule {}
