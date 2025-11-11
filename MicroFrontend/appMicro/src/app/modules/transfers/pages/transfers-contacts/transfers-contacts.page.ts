import { Component, inject, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TRANSFERS } from '@commons/constants/navigate.constants';
import { FeePayload } from '@commons/entities/fee/fee.interface';
import {
  TRANSFER_EXIT_DATA,
  TRANSFERS_AVAILABLE_FIELD
} from '@modules/transfers/constants/transfers.constants';
import { transfersContactsAmountValidators } from '@modules/transfers/helpers/transfer-form.helper';
import {
  mapFeePayload,
  mapTransfersConfirm,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { TransfersContactsBase } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.base';
import {
  TRANSFER_CONTACTS_STEPS,
  TransferContactSlide,
  TRANSFERS_CONTACTS_INFO_ALERT
} from './constants/transfers-contacts.constants';
import { mapTransfersContactsSlides } from './mappers/transfers-contacts-slides.mapper';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';

@Component({
  selector: 'app-transfers-contacts',
  templateUrl: './transfers-contacts.page.html',
  styleUrls: ['./transfers-contacts.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransferContactSlide.from,
    alternativeSlide: TransferContactSlide.amount
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFER_CONTACTS_STEPS,
    exitData: TRANSFER_EXIT_DATA,
    data: (component: TransfersContactsPage) =>
      mapTransfersContactsSlides(component.form),
    confirmMapper: mapTransfersConfirm,
    voucherMapper: mapTransfersVoucher
  },
  { step: TransferContactSlide.from, field: TRANSFERS_AVAILABLE_FIELD }
)
export class TransfersContactsPage
  extends TransfersContactsBase
  implements OnInit
{
  private spiConsentService = inject(SpiConsentService);

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.informationService
      .showPanelIfNecessary(TRANSFERS_CONTACTS_INFO_ALERT)
      .then();
    this.facade.fetchContacts();

    this.spiConsentService.fetchSpiConsent();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      amount: [
        null,
        [Validators.required, transfersContactsAmountValidators.bind(this)]
      ],
      contact: [null],
      contactProduct: [null],
      ownProduct: [null],
      transferType: [null],
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
    const contactProduct = this.form.get('contactProduct').value;

    return {
      transactionId: mapFeePayload(transferType, contactProduct),
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
  public transferContact(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
