import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { Product } from '@commons/entities/product/product.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { mapPocketPayData } from '@modules/pockets/pages/pocket-pay/mappers/pocket-pay.mapper';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { ADD_CASH_TO_R_POCKETS } from '@app/modules/pockets/constants/add.constants';

@Component({
  selector: 'app-pocket-pay-data',
  templateUrl: './pocket-pay-data.component.html',
  styleUrls: ['./pocket-pay-data.component.sass']
})
export class PocketPayDataComponent {
  @Input() form: FormGroup;
  @Input() pocketDetail: Pocket;
  @Input() product: Product;
  @Input() utagEvent: UtagEvent = ADD_CASH_TO_R_POCKETS;

  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  constructor(private navCtrl: NavController) {}

  public backPage(): void {
    void this.navCtrl.back();
  }

  get detailItems(): VoucherItem[] {
    return mapPocketPayData(this.pocketDetail, this.product);
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
