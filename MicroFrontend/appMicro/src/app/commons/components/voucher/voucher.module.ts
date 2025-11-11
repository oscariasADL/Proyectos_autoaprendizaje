import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VoucherListComponent } from '@commons/components/voucher/components/voucher-list/voucher-list.component';
import { VoucherComponent } from '@app/commons/components/voucher/voucher/voucher.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

@NgModule({
  declarations: [VoucherListComponent, VoucherComponent],
  imports: [CommonModule, GlobalPipesModule],
  exports: [VoucherListComponent, VoucherComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VoucherModule {}
