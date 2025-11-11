import { Component, inject, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { TransfersAvalKeyBase } from '@modules/transfers/pages/transfers-aval-key/transfers-aval-key.base';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import {
  TRANSFER_AVAL_KEY_STEPS,
  TRANSFER_EXIT_DATA,
  TransferAvalKeySlide,
  TRANSFERS_AVAL_KEY_INFO_ALERT
} from '@modules/transfers/pages/transfers-aval-key/constants/transfers-aval-key.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { FeePayload } from '@commons/entities/fee/fee.interface';
import {
  mapFeePayload,
  mapTransfersVoucher
} from '@modules/transfers/mappers/transfers-confirm.mapper';
import { TRANSFERS } from '@commons/constants/navigate.constants';
import { mapTransfersAvalKeySlides } from '@modules/transfers/pages/transfers-aval-key/mappers/transfers-aval-key-slides.mapper';
import { TRANSFERS_AVAILABLE_FIELD } from '@modules/transfers/constants/transfers.constants';
import { TransferAvalKeyForm } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import {
  transferNoteValidators,
  transfersCel2celAmountValidators
} from '@modules/transfers/helpers/transfer-form.helper';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { mapTransfersAvalKeyConfirm } from '@modules/transfers/pages/transfers-aval-key/mappers/transfers-aval-key.mapper';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';

@Component({
  selector: 'app-transfers-aval-key',
  templateUrl: './transfers-aval-key.page.html',
  styleUrls: ['./transfers-aval-key.page.sass']
})
@GenericStepperInit(
  {
    initSlide: TransferAvalKeySlide.from,
    alternativeSlide: TransferAvalKeySlide.towardAvalKey
  },
  {
    backUrl: TRANSFERS,
    steps: TRANSFER_AVAL_KEY_STEPS,
    exitData: TRANSFER_EXIT_DATA,
    data: (component: TransfersAvalKeyPage) =>
      mapTransfersAvalKeySlides(component.form),
    confirmMapper: mapTransfersAvalKeyConfirm,
    voucherMapper: mapTransfersVoucher
  },
  {
    step: TransferAvalKeySlide.from,
    field: TRANSFERS_AVAILABLE_FIELD
  }
)
export class TransfersAvalKeyPage
  extends TransfersAvalKeyBase
  implements OnInit
{
  private spiConsentService = inject(SpiConsentService);

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    this.initStepper();
    void this.informationService.showPanelIfNecessary(
      TRANSFERS_AVAL_KEY_INFO_ALERT
    );

    this.spiConsentService.fetchSpiConsent();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      towardAvalKey: [null],
      towardProduct: [null],
      contactName: [null],
      amount: [
        null,
        [Validators.required, transfersCel2celAmountValidators.bind(this)]
      ],
      transferType: [TransferType.SEND_BRE_B],
      addenda: this.formBuilder.group({
        note: [
          null,
          [
            transferNoteValidators.bind(this),
            Validators.minLength(
              this.facade.boundsByKey(ParameterKey.transferNoteMinLength)
            )
          ]
        ]
      }),
      fee: [],
      confirmation: []
    }) as FormGroup<TransferAvalKeyForm>;
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
  public transferAvalKey(): void {
    if (this.form.valid) {
      this.facade.transfer(
        mapTransferPayload(this.form.value),
        this.alertStepData()
      );
    }
  }
}
