import { Component, Injector, OnInit } from '@angular/core';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  REQUESTS_CEL2CEL_EXIT_DATA,
  TRANSFERS_CEL2CEL_REQUEST_INFO_ALERT,
  TRANSFERS_CEL2CEL_STEPS_REQUEST,
  TransfersCel2CelRequestSlide
} from '@modules/transfers/pages/transfers-cel2cel-request/constants/transfers-cel2cel-request.constants';
import { TRANSFERS } from '@commons/constants/navigate.constants';
import { mapTransfersCel2celForRequestSlides } from '@modules/transfers/pages/transfers-cel2cel-request/mappers/transfers-cel2cel-request-slides.mapper';
import {
  mapFeePayload,
  mapTransfersConfirm,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { TransfersRequestMoneyBase } from '@modules/transfers/pages/transfers-request-money/transfers-request-money.base';
import { Validators } from '@angular/forms';
import {
  transferNoteValidators,
  transferPhoneNumberValidators,
  transfersTransfiyaAmountValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { FeePayload } from '@commons/entities/fee/fee.interface';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { AlertService } from '@commons/services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transfers-cel2cel-request',
  templateUrl: './transfers-cel2cel-request.page.html',
  styleUrls: ['./transfers-cel2cel-request.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransfersCel2CelRequestSlide.from,
    alternativeSlide: TransfersCel2CelRequestSlide.amount
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFERS_CEL2CEL_STEPS_REQUEST,
    exitData: REQUESTS_CEL2CEL_EXIT_DATA,
    data: (component: TransfersCel2celRequestPage) =>
      mapTransfersCel2celForRequestSlides.bind(component)(component.form),
    confirmMapper: mapTransfersConfirm,
    voucherMapper: mapTransfersVoucher
  }
)
export class TransfersCel2celRequestPage
  extends TransfersRequestMoneyBase
  implements OnInit
{
  constructor(
    protected injector: Injector,
    private alertService: AlertService,
    private navCtrl: NavController
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initsForm();
    this.initStepper();
    this.informationService
      .showPanelIfNecessary(TRANSFERS_CEL2CEL_REQUEST_INFO_ALERT)
      .then();
  }

  private initsForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      amount: [
        null,
        [Validators.required, transfersTransfiyaAmountValidators.bind(this)]
      ],
      note: [null, [transferNoteValidators.bind(this)]],
      phoneNumber: [
        null,
        [Validators.required, transferPhoneNumberValidators.bind(this)]
      ],
      transferType: [TransferType.REQUEST_CEL2CEL],
      contactData: [null],
      confirmation: [null],
      addenda: this.formBuilder.group({
        note: [null],
        referenceId: [null]
      }),
      fee: [null],
      costGmf: [null]
    });
  }

  @GenericStepperfeePayload
  public feeCel2celPayload(): FeePayload {
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
  public transferCel2celRequestMoney(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
