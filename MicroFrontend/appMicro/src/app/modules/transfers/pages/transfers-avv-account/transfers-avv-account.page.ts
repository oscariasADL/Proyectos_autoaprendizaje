import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TRANSFERS } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { FeePayload } from '@commons/entities/fee/fee.interface';
import {
  TRANSFER_EXIT_DATA,
  TRANSFERS_AVAILABLE_FIELD
} from '@modules/transfers/constants/transfers.constants';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import {
  accountNumberValidators,
  transferAvvAccountAmountValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import {
  mapFeePayload,
  mapTransfersConfirm,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { TransfersAvvAccountBase } from '@modules/transfers/pages/transfers-avv-account/transfers-avv-account.base';
import {
  TRANSFER_AVV_ACCOUNT_STEPS,
  TransferAvvAccountSlide,
  TRANSFERS_AVV_ACCOUNT_INFO_ALERT
} from './constants/transfers-avv-account.constants';
import { mapTransfersAvvAccountSlides } from './mappers/transfers-avv-account-slides.mapper';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';

@Component({
  selector: 'app-transfers-avv-account',
  templateUrl: './transfers-avv-account.page.html',
  styleUrls: ['./transfers-avv-account.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransferAvvAccountSlide.from,
    alternativeSlide: TransferAvvAccountSlide.amount
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFER_AVV_ACCOUNT_STEPS,
    exitData: TRANSFER_EXIT_DATA,
    data: (component: TransfersAvvAccountPage) =>
      mapTransfersAvvAccountSlides(component.form),
    confirmMapper: mapTransfersConfirm,
    voucherMapper: mapTransfersVoucher
  },
  {
    step: TransferAvvAccountSlide.from,
    field: TRANSFERS_AVAILABLE_FIELD
  }
)
export class TransfersAvvAccountPage
  extends TransfersAvvAccountBase
  implements OnInit
{
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.informationService.showPanelIfNecessary(
      TRANSFERS_AVV_ACCOUNT_INFO_ALERT
    );
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      amount: [
        null,
        [Validators.required, transferAvvAccountAmountValidators.bind(this)]
      ],
      towardAccountType: [null],
      towardAccount: [
        null,
        [Validators.required, accountNumberValidators.bind(this)]
      ],
      transferType: [TransferType.FAST_TRANSFER],
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

  @GenericStepperGMFPayload
  public gmfPayload(): GMFPayload {
    const { fromProduct, amount } = this.form.value;

    return {
      productNumber: fromProduct.numberProduct,
      productType: fromProduct.type,
      amountTransaction: sanitizeCurrency(amount),
      availableBalance: fromProduct.availableBalance
    };
  }

  @GenericStepperAction
  public transferAvvAccount(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
