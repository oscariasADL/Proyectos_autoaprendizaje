import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

import { ModalController } from '@commons/controllers/modal.controller';
import { TypeTarget } from '@modules/favorites/entities/favorites.interface';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ACCOUNT_TYPE_LIST } from '@modules/product/constants/product.constants';
import { favoriteEditAccountNumberValidators } from '@modules/favorites/pages/favorites-edit/helpers/favorites-validators.helper';
import { transferPhoneNumberValidators } from '@modules/transfers/helpers/transfer-form.helper';
import { moneyOrdersWhoValidators } from '@modules/withdraw/pages/money-orders/helpers/money-orders-validators.helpers';

@Component({
  selector: 'app-favorites-amount-input',
  templateUrl: './favorites-target-input.html',
  styleUrls: ['./favorites-target-input.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesTargetInputComponent implements OnInit {
  @Input() initValue: string;
  @Input() typeTargetVal: TypeTarget;
  @Input() accountType: string;

  public targetFormControl: UntypedFormControl;
  public towardAccountTypeFormControl: UntypedFormControl;
  public productAccountTypes: DropdownList[] = ACCOUNT_TYPE_LIST;
  public TITLES: any = {
    [TypeTarget.ACCOUNT]: 'TRANSFERS.UNREGISTER_ACCOUNTS.TOWARD_ACCOUNT.TITLE',
    [TypeTarget.CELLPHONE]: 'TRANSFERS.SEND_MONEY.TOWARD_CELL_PHONE.TITLE',
    [TypeTarget.DOCUMENT]: 'WITHDRAW.MONEY_ORDERS.SLIDE.WHO.TITLE'
  };

  constructor(
    private modalCtrl: ModalController,
    private facade: FavoritesFacade
  ) {
    this.targetFormControl = new UntypedFormControl(this.initValue);
    this.towardAccountTypeFormControl = new UntypedFormControl(
      this.accountType
    );
  }

  ngOnInit(): void {
    this.targetFormControl.setValue(this.initValue);
    this.towardAccountTypeFormControl.setValue(this.accountType);
    this.setValidators();
  }

  public async saveChanges(): Promise<void> {
    this.targetFormControl.markAsTouched();
    if (
      this.targetFormControl.valid &&
      this.towardAccountTypeFormControl.valid
    ) {
      await this.closeModal({
        target: this.targetFormControl.normalize(),
        accountType: this.towardAccountTypeFormControl.value
      });
    }
  }

  public async closeModal(data: any = null): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }

  private setValidators(): void {
    switch (this.typeTargetVal) {
      case TypeTarget.ACCOUNT:
        this.targetFormControl.setValidators([
          Validators.required,
          favoriteEditAccountNumberValidators.bind(this)
        ]);
        this.towardAccountTypeFormControl.setValidators([Validators.required]);
        break;
      case TypeTarget.CELLPHONE:
        this.targetFormControl.setValidators([
          Validators.required,
          transferPhoneNumberValidators.bind(this)
        ]);
        break;
      case TypeTarget.DOCUMENT:
        this.targetFormControl.setValidators([
          moneyOrdersWhoValidators.bind(this)
        ]);
        break;
    }
  }

  get typeTarget(): typeof TypeTarget {
    return TypeTarget;
  }
}
