import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { TransferType } from '@app/modules/transfers/entities/transfers.interface';
import { map, Subscription, take, tap } from 'rxjs';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { transferPhoneNumberValidators } from '@app/modules/transfers/helpers/transfer-form.helper';
import { AppFacade } from '@app/app.facade';
import {
  CEL2CEL_BANK_LIST,
  TRANSFIYA_INFO
} from '@app/modules/transfers/pages/transfers-cel2cel-send/constants/transfers-cel2cel-send.constants';
import { FavoritesFacade } from '@app/modules/favorites/favorites.facade';
import {
  MobileForm,
  ProductByPhoneNumber
} from '@app/modules/favorites/entities/favorites.interface';
import { ALPHABETIC_PATTERN } from '@app/commons/constants/regex.constants';
import { ParameterKey } from '@app/commons/entities/parameters/parameter.entities';
import { BANK_GROUP } from '@app/modules/transfers/constants/transfers.constants';

@Component({
  selector: 'app-mobile-form',
  templateUrl: './mobile-form.component.html',
  styleUrls: ['./mobile-form.component.sass']
})
export class MobileFormComponent implements OnInit, OnDestroy {
  @Input() utagEvent: UtagEvent;
  @Input() transfiyaUtagEvent: UtagEvent;
  @Input() form: FormGroup;
  @Output() payloadChanged = new EventEmitter<MobileForm>();
  public productIdSelected: string = '';
  public readonly banks = CEL2CEL_BANK_LIST;
  public readonly transfiyaInfo = TRANSFIYA_INFO;

  private formChangesSub: Subscription;
  private phoneNumberChangesSub: Subscription;

  constructor(
    private facade: AppFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnInit() {
    this.setInitiValues();
    this.form.get('accountNumber')?.clearValidators();
    this.form.get('accountNumber')?.updateValueAndValidity();

    this.setPhoneNumberValidators();
    this.phoneNumberChangesSub = this.phoneNumber.valueChanges.subscribe(
      (phoneNumber) => {
        if (phoneNumber) {
          this.phoneNumber.valid && this.fetchProducts();
        }
      }
    );

    this.formChangesSub = this.form.valueChanges.subscribe((value) => {
      const {
        product,
        transferType,
        phoneNumber,
        towardProduct,
        favoriteName,
        towardType
      } = value;
      if (phoneNumber && towardProduct) {
        const payload: MobileForm = {
          sourceAccount: {
            productType: product.type,
            productId: product.id,
            bank: BANK_GROUP.VILLAS_CODE
          },
          favoriteName,
          phoneNumber,
          transferType: transferType.value,
          towardType,
          targetAccount: {
            productId: towardProduct.account.accountId,
            bank: towardProduct.account.bankInfo.bankId,
            productType: towardProduct.account.accountType
          },
          txInfo: {
            txTarget: towardProduct.account.accountId,
            txType: 'cel2cel'
          },
          additionalTargetInfo: towardProduct.personInfo.name
        };
        this.payloadChanged.emit(payload);
      }
    });
  }

  ngOnDestroy() {
    this.formChangesSub?.unsubscribe();
    this.phoneNumberChangesSub?.unsubscribe();
    this.resetValidations();
  }

  private setInitiValues() {
    this.form.controls.towardProduct.setValue(null);
    this.form.controls.towardType.setValue(null);
    this.form.controls.phoneNumber.setValue(null);
  }

  public fetchProducts() {
    this.favoritesFacade.fetchTowardProductsByPhoneNumber(
      this.phoneNumber.value.replace(/\D/g, '')
    );
    this.towardProduct.setValidators([Validators.required]);
    this.towardProduct.updateValueAndValidity();
  }

  public setTowardBankInfo(bank: { id: string; name: string }) {
    if (this.transfersCel2celTowardProducts) {
      const { id, name } = { ...bank };

      const product: ProductByPhoneNumber =
        this.transfersCel2celTowardProducts.find(
          (towardProduct: ProductByPhoneNumber) =>
            towardProduct.account.bankInfo.bankId === id
        );

      this.productIdSelected = product.account.bankInfo.bankId;
      this.form.controls.towardProduct.setValue({ ...product, bankName: name });
      this.form.controls.towardType.setValue(TransferType.SEND_CEL2CEL);
    }
  }

  public bankInList(bankId: string): boolean {
    return this.transfersCel2celBankIds
      ? this.transfersCel2celBankIds.includes(bankId)
      : false;
  }

  private setPhoneNumberValidators() {
    this.phoneNumber.setValidators([
      Validators.required,
      transferPhoneNumberValidators.bind(this)
    ]);
  }

  public setTransferType(): void {
    this.form.controls.towardType.setValue(TransferType.SEND_TRANSFIYA);
    this.resetTowardProduct();
    this.payloadChanged.emit();
  }

  private resetTowardProduct() {
    this.form.controls.towardProduct.setValue(null);
    this.towardProduct.clearValidators();
    this.towardProduct.updateValueAndValidity();

    this.productIdSelected = null;
  }

  private resetValidations() {
    this.phoneNumber.clearValidators();
    this.towardProduct.clearValidators();
    this.towardType.clearValidators();

    this.phoneNumber.updateValueAndValidity();
    this.towardProduct.updateValueAndValidity();
    this.towardType.updateValueAndValidity();
    this.productIdSelected = null;
  }

  get transfersCel2celBankIds() {
    return this.favoritesFacade.transfersCel2celBankIds$.currentValue();
  }

  get transfersCel2celTowardProducts() {
    return this.favoritesFacade.cellToCellTransferProducts$.currentValue();
  }

  get phoneNumber(): AbstractControl {
    return this.form.get('phoneNumber');
  }

  get towardType() {
    return this.form.get('towardType');
  }

  get towardProduct() {
    return this.form.get('towardProduct');
  }

  get transfiyaType() {
    return TransferType.SEND_TRANSFIYA;
  }
}
