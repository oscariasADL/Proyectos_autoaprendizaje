import { Component, Input } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';

import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { CommonsModule } from '@commons/commons.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-pocket-create-voucher',
  templateUrl: './pocket-create-voucher.component.html',
  styleUrls: ['./pocket-create-voucher.component.sass'],
  standalone: true,
  imports: [
    NgIf,
    GlobalPipesModule,
    VoucherModule,
    CommonsModule,
    HeadersModule,
    UpperCasePipe
  ]
})
export class PocketCreateVoucherComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() approvalId: string;
  @Input() voucherItems: VoucherItem[];
  @Input() noticeMessage: string;

  constructor(private modalCtrl: ModalController) {}

  public closeModal() {
    void this.modalCtrl.dismiss();
  }
}
