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
  TRANSFER_EXIT_DATA,
  TRANSFERS_AVAILABLE_FIELD
} from '@modules/transfers/constants/transfers.constants';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { transferSendMoneyAmountValidators } from '@modules/transfers/helpers/transfer-form.helper';
import {
  mapFeePayload,
  mapTransfersConfirm,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { TransfersSendMoneyBase } from '@modules/transfers/pages/transfers-send-money/transfers-send-money.base';
import {
  TRANSFER_SEND_MONEY_STEPS,
  TRANSFERS_SEND_MONEY_INFO_ALERT,
  TransferSendMoneySlide
} from './constants/transfers-send-money.constants';
import { mapTransfersSendMoneySlides } from './mappers/transfers-send-money-slides.mapper';

@Component({
  selector: 'app-transfers-send-money',
  templateUrl: './transfers-send-money.page.html',
  styleUrls: ['./transfers-send-money.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransferSendMoneySlide.from,
    alternativeSlide: TransferSendMoneySlide.amount
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFER_SEND_MONEY_STEPS,
    exitData: TRANSFER_EXIT_DATA,
    data: (component: TransfersSendMoneyPage) =>
      mapTransfersSendMoneySlides(component.form),
    confirmMapper: mapTransfersConfirm,
    voucherMapper: mapTransfersVoucher
  },
  {
    step: TransferSendMoneySlide.from,
    field: TRANSFERS_AVAILABLE_FIELD
  }
)
export class TransfersSendMoneyPage
  extends TransfersSendMoneyBase
  implements OnInit
{
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.informationService.showPanelIfNecessary({
      ...TRANSFERS_SEND_MONEY_INFO_ALERT,
      linkAction: () => this.transfiyaInfoService.showTransfiyaInfo()
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      amount: [
        null,
        [Validators.required, transferSendMoneyAmountValidators.bind(this)]
      ],
      phoneNumber: [null],
      transferType: [TransferType.SEND_TRANSFIYA],
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
  public transferSendMoney(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
