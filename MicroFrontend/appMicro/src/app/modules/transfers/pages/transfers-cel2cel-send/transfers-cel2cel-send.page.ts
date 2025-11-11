import { Component, Injector, OnDestroy, OnInit } from '@angular/core';

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
  transferSendMoneyAmountValidators,
  transfersTransfiyaAmountValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import {
  mapFeePayload,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { mapTransfersCel2celConfirm } from '@modules/transfers/mappers/transfers-cel2cel.mapper';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { TransfersCel2celSendBase } from './transfers-cel2cel-send.base';
import {
  TRANSFERS_CEL2CEL_STEPS,
  TRANSFERS_TRANSFIYA_INFO_ALERT,
  TransfersCel2celSlide
} from './constants/transfers-cel2cel-send.constants';
import { mapTransfersCel2celSlides } from './mappers/transfers-cel2cel-send-slides.mapper';
import { TransfiyaInfoService } from '@commons/services/transfiya-info.service';
import { ModalController } from '@ionic/angular';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { TransfersCel2celFacade } from './transfers-cel2cel-send.facade';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';

@Component({
  selector: 'app-transfers-cel2cel-send',
  templateUrl: './transfers-cel2cel-send.page.html',
  styleUrls: ['./transfers-cel2cel-send.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransfersCel2celSlide.from,
    alternativeSlide: TransfersCel2celSlide.amount
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFERS_CEL2CEL_STEPS,
    exitData: TRANSFER_EXIT_DATA,
    data: (component: TransfersCel2celSendPage) =>
      mapTransfersCel2celSlides(component.form),
    confirmMapper: mapTransfersCel2celConfirm,
    voucherMapper: mapTransfersVoucher
  },
  {
    step: TransfersCel2celSlide.from,
    field: TRANSFERS_AVAILABLE_FIELD
  }
)
export class TransfersCel2celSendPage
  extends TransfersCel2celSendBase
  implements OnInit, OnDestroy
{
  constructor(
    protected injector: Injector,
    private transfiyaInfoService: TransfiyaInfoService,
    private modalCtrl: ModalController,
    private transfersCel2celFacade: TransfersCel2celFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.cel2celFacade.transfersCel2celSetUseTransfiya(null);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      amount: [
        null,
        [
          Validators.required,
          transferSendMoneyAmountValidators.bind(this),
          transfersTransfiyaAmountValidators.bind(this)
        ]
      ],
      phoneNumber: [null],
      transferType: [TransferType.SEND_CEL2CEL],
      confirmation: [null],
      contactData: [null],
      note: [null],
      addenda: this.formBuilder.group({
        note: [null],
        referenceId: [null]
      }),
      fee: [null],
      costGmf: [null],
      towardProduct: [null],
      confirmationMessage: ['TRANSFERS.CEL2CEL.SEND.CONFIRMATION_MESSAGE'],
      useTransfiya: [null]
    });
  }

  protected nextStep(slide: string): void {
    super.nextStep(slide);
    if (
      slide === 'confirmation' &&
      this.hasProductAval &&
      this.form.controls.transferType.value === TransferType.SEND_TRANSFIYA
    ) {
      this.showTransfiyaAlertInfo();
    }
  }

  private showTransfiyaAlertInfo(): void {
    const data = {
      ...TRANSFERS_TRANSFIYA_INFO_ALERT,
      linkAction: () => this.transfiyaInfoService.showTransfiyaInfo(),
      utagCategory: 'a un celular',
      utag: 'enviar plata - ¿que es transfiya? - cambiar numero',
      utagCancel: 'enviar plata - ¿que es transfiya? - usar transfiya',
      utagModal: 'enviar plata - ¿que es transfiya? - abrir'
    };
    const service = this.informationService.showPanelIfNecessary(data, true);
    service.then((res) => {
      if (!isNullOrUndefined(res)) {
        this.modalCtrl.dismiss();
        if (!res) {
          this.slideSelected('amount');
        }
      }
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
  public transfersCel2cel(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  get transfersCel2celTowardProducts() {
    return this.transfersCel2celFacade.transfersCel2celTowardProducts$.currentValue();
  }

  get hasProductAval(): boolean {
    return this.transfersCel2celTowardProducts?.length > 0;
  }
}
