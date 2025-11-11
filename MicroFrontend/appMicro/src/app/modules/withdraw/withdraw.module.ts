import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { WithdrawService } from '@modules/withdraw/service/withdraw.service';
import { WithdrawEffect } from '@modules/withdraw/store/withdraw.effect';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([WithdrawEffect]),
    GenericStepperModule,
    GlobalPipesModule
  ],
  providers: [WithdrawFacade, WithdrawService],
  exports: [GenericStepperModule, GlobalPipesModule]
})
export class WithdrawModule {}
