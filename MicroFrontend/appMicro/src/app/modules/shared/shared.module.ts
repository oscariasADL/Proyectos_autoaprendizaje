import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { PaymentCardComponent } from '@modules/shared/components/payment-card/payment-card.component';

@NgModule({
  declarations: [PaymentCardComponent],
  imports: [CommonModule, GlobalPipesModule],
  exports: [PaymentCardComponent]
})
export class SharedModule {}
