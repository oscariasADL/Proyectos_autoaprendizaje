import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import {
  Pocket,
  PocketStatus
} from '@modules/pockets/entities/pockets.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { mapPocketTransferData } from '@modules/pockets/pages/pocket-transfer/mappers/pockets-transfer.mapper';
import {
  POCKET_TRANSFER_TYPES,
  PocketTransferType
} from '@modules/pockets/pages/pocket-transfer/constants/pocket-transfer.constants';
import { PocketTransferItemType } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';
import { NotificationTypeEnum } from '@commons/components/notification/constants/notification.constants';

@Component({
  selector: 'app-pocket-transfer-data',
  templateUrl: './pocket-transfer-data.component.html',
  styleUrls: ['./pocket-transfer-data.component.sass']
})
export class PocketTransferDataComponent {
  @Input() form: FormGroup;
  @Input() pocketDetail: Pocket;
  @Input() pockets: Pocket[];
  @Input() isPocketProfitability: boolean = false;
  @Output()
  continue: EventEmitter<void> = new EventEmitter<void>();

  protected readonly pocketTransferTypes: PocketTransferItemType[] =
    POCKET_TRANSFER_TYPES;
  public activeTransferType: PocketTransferType =
    PocketTransferType.parentAccount;

  constructor(private navCtrl: NavController) {}

  public changeActiveTransferType(type: PocketTransferType): void {
    if (type !== this.activeTransferType) {
      this.activeTransferType = type;

      this.targetPocket.reset();
      this.targetPocket.setValidators(
        this.activeTransferType === this.pocketTransferType.parentAccount
          ? []
          : [Validators.required]
      );
      this.targetPocket.updateValueAndValidity();
    }
  }

  public backPage(): void {
    void this.navCtrl.back();
  }

  get detailItems(): VoucherItem[] {
    return mapPocketTransferData(this.pocketDetail);
  }

  get pocketsAllowed(): Pocket[] {
    return this.pockets.filter(
      (pocket: Pocket) =>
        pocket.status !== PocketStatus.COMPLETED &&
        pocket.productIdParent.toString() ===
          this.pocketDetail.productIdParent.toString() &&
        pocket.numberProduct.toString() !==
          this.pocketDetail.numberProduct.toString()
    );
  }

  get pocketsAllowedList(): DropdownList[] {
    return this.pocketsAllowed.map((pocket: Pocket) => ({
      label: pocket.description,
      value: `${pocket.type}__${pocket.numberProduct}`
    }));
  }

  get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }

  get pocketTransferType(): typeof PocketTransferType {
    return PocketTransferType;
  }

  get targetPocket(): AbstractControl {
    return this.form.get('targetPocket');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
