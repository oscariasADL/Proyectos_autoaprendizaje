import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TRANSFERS } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { FeePayload } from '@commons/entities/fee/fee.interface';
import {
  TRANSFERS_AVAILABLE_FIELD,
  TRANSFER_EXIT_DATA
} from '@modules/transfers/constants/transfers.constants';
import {
  accountNumberValidators,
  transferUnregisteredAccountsAmountValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import {
  mapFeePayload,
  mapTransfersConfirm,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { TransfersUnregisteredAccountsBase } from '@modules/transfers/pages/transfers-unregistered-accounts/transfers-unregistered-accounts.base';
import {
  TRANSFERS_UNREGISTERED_ACCOUNTS_INFO_ALERT,
  TransferUnregisteredAccountsSlide,
  TRANSFER_UNREGISTERED_ACCOUNTS_STEPS
} from './constants/transfers-unregistered-accounts.constants';
import { mapTransfersUnregisteredAccountsSlides } from './mappers/transfers-unregistered-accounts-slides.mapper';

@Component({
  selector: 'app-transfers-unregistered-accounts',
  templateUrl: './transfers-unregistered-accounts.page.html',
  styleUrls: ['./transfers-unregistered-accounts.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransferUnregisteredAccountsSlide.from,
    alternativeSlide: TransferUnregisteredAccountsSlide.amount
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFER_UNREGISTERED_ACCOUNTS_STEPS,
    exitData: TRANSFER_EXIT_DATA,
    data: (component: TransfersUnregisteredAccountsPage) =>
      mapTransfersUnregisteredAccountsSlides(component.form),
    confirmMapper: mapTransfersConfirm,
    voucherMapper: mapTransfersVoucher
  },
  {
    step: TransferUnregisteredAccountsSlide.from,
    field: TRANSFERS_AVAILABLE_FIELD
  }
)
export class TransfersUnregisteredAccountsPage
  extends TransfersUnregisteredAccountsBase
  implements OnInit
{
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.informationService.showPanelIfNecessary(
      TRANSFERS_UNREGISTERED_ACCOUNTS_INFO_ALERT
    );
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      amount: [
        null,
        [
          Validators.required,
          transferUnregisteredAccountsAmountValidators.bind(this)
        ]
      ],
      phoneNumber: [null],
      towardAccountType: [null],
      towardAccount: [
        null,
        [Validators.required, accountNumberValidators.bind(this)]
      ],
      transferType: [null],
      confirmation: [null],
      contactData: [null],
      addenda: [null],
      fee: [null],
      costGmf: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const amount = this.form.get('amount').currencyValue();
    const product = this.form.get('fromProduct').value;
    const transferType = this.form.get('transferType').value;
    return {
      transactionId: mapFeePayload(transferType),
      accountId: product.id,
      accountType: product.type,
      amount
    };
  }

  @GenericStepperAction
  public transferUnregisterAccount(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
