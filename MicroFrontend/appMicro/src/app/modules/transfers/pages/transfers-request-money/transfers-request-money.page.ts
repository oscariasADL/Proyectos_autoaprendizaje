import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TRANSFERS } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { FeePayload } from '@commons/entities/fee/fee.interface';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import {
  transferPhoneNumberValidators,
  transfersTransfiyaAmountValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import {
  mapFeePayload,
  mapTransfersConfirm,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { TransfersRequestMoneyBase } from '@modules/transfers/pages/transfers-request-money/transfers-request-money.base';
import {
  REQUEST_MONEY_EXIT_DATA,
  TRANSFER_STEPS_REQUEST_MONEY,
  TransferRequestMoneySlide,
  TRANSFERS_REQUEST_MONEY_INFO_ALERT
} from './constants/transfers-request-money.constants';
import { mapTransfersForRequestMoneySlides } from './mappers/transfers-request-money-slides.mapper';

@Component({
  selector: 'app-transfers-request-money',
  templateUrl: './transfers-request-money.page.html',
  styleUrls: ['./transfers-request-money.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransferRequestMoneySlide.from,
    alternativeSlide: TransferRequestMoneySlide.amount
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFER_STEPS_REQUEST_MONEY,
    exitData: REQUEST_MONEY_EXIT_DATA,
    data: (component: TransfersRequestMoneyPage) =>
      mapTransfersForRequestMoneySlides.bind(component)(component.form),
    confirmMapper: mapTransfersConfirm,
    voucherMapper: mapTransfersVoucher
  }
)
export class TransfersRequestMoneyPage
  extends TransfersRequestMoneyBase
  implements OnInit
{
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.informationService
      .showPanelIfNecessary(TRANSFERS_REQUEST_MONEY_INFO_ALERT)
      .then();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      amount: [
        null,
        [Validators.required, transfersTransfiyaAmountValidators.bind(this)]
      ],
      phoneNumber: [
        null,
        [Validators.required, transferPhoneNumberValidators.bind(this)]
      ],
      transferType: [TransferType.REQUEST_TRANSFIYA],
      contactData: [null],
      confirmation: [null],
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
  public transferRequestMoney(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
