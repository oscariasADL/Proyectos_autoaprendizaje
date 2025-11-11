import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  OnDestroy,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  SERVICES_PAY_MULTIPLE_AVAILABLE_FIELD,
  SERVICES_PAY_MULTIPLE_EXIT_DATA,
  SERVICES_PAY_MULTIPLE_INFO_ALERT,
  SERVICES_PAY_MULTIPLE_STEPS,
  ServicesPayMultipleSlide
} from '@modules/payments/payment-services/pages/payment-services-pay-multiple/constants/services-pay-multiple.constants';
import { HOME } from '@commons/constants/navigate.constants';
import { mapServicesPayMultipleSlides } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/mappers/services-pay-multiple-slides.mapper';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { StepperTypes } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { InformationService } from '@commons/services/information.service';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  mapServicesPayMultipleConfirm,
  mapServicesPayMultipleVoucher
} from '@modules/payments/payment-services/pages/payment-services-pay-multiple/mappers/services-pay-multiple-confirm.mapper';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { mapServicesPayMultiplePayload } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/mappers/services-pay-multiple-payload.mapper';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';

@Component({
  selector: 'app-payment-services-pay-multiple',
  templateUrl: './payment-services-pay-multiple.page.html',
  styleUrls: ['./payment-services-pay-multiple.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: ServicesPayMultipleSlide.service,
    alternativeSlide: ServicesPayMultipleSlide.service
  },
  {
    backUrl: HOME,
    steps: SERVICES_PAY_MULTIPLE_STEPS,
    exitData: SERVICES_PAY_MULTIPLE_EXIT_DATA,
    data: (component: PaymentServicesPayMultiplePage) =>
      mapServicesPayMultipleSlides(component.form),
    confirmMapper: mapServicesPayMultipleConfirm,
    voucherMapper: mapServicesPayMultipleVoucher
  },
  {
    step: ServicesPayMultipleSlide.from,
    field: SERVICES_PAY_MULTIPLE_AVAILABLE_FIELD
  }
)
export class PaymentServicesPayMultiplePage
  extends GenericStepperBase
  implements OnInit, OnDestroy
{
  protected readonly StepperTypes = StepperTypes;
  public readonly services$: Observable<PaymentBill[]> =
    this.facade.services$.pipe(
      map(
        (services) =>
          services?.biller?.filter((bill) => bill.biller && bill.amount) || []
      )
    );

  constructor(
    protected injector: Injector,
    private facade: PaymentServicesFacade,
    private informationService: InformationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    this.initStepper();
    void this.informationService.showPanelIfNecessary(
      SERVICES_PAY_MULTIPLE_INFO_ALERT
    );
    const stepperBody = this.document.querySelector(
      '.generic-stepper-body'
    ) as HTMLElement;
    if (!isNullOrUndefined(stepperBody)) {
      stepperBody.style.paddingBottom = '0px';
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.facade.destroyToast();
  }

  public nextStep(slide: string): void {
    super.nextStep(slide);

    if (slide === ServicesPayMultipleSlide.from) {
      this.data[ServicesPayMultipleSlide.from].data.validateAmount = Number(
        this.totalAmount.currencyValue()
      );
      this.cdRef.detectChanges();
    }

    if (slide === ServicesPayMultipleSlide.confirmation) {
      this.facade.showToastMaxAmountWarning('REGISTERED');
      return;
    }
    this.facade.destroyToast();
  }

  public async setNextStep(data: any): Promise<void> {
    const { value } = data;
    if (value === StepperTypes.informationPanel.toString()) {
      await this.informationService.showPanel(SERVICES_PAY_MULTIPLE_INFO_ALERT);
    } else {
      await super.setNextStep(data);
    }
  }

  @GenericStepperAction
  public payBills(): void {
    if (this.form.valid) {
      this.facade.destroyToast();
      this.facade.payBillsMultiple(
        mapServicesPayMultiplePayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.PaymentBills,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperGMFPayload
  public gmfPayload(): GMFPayload {
    const { fromProduct, totalAmount } = this.form.value;

    return {
      productNumber: fromProduct.numberProduct,
      productType: fromProduct.type,
      amountTransaction: totalAmount,
      availableBalance: fromProduct.availableBalance
    };
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [null, [Validators.required]],
      totalAmount: [0, [Validators.required]],
      paymentBills: this.formBuilder.array([]),
      selectedBills: [[]],
      countBillSelection: [0],
      confirmation: [null],
      fee: [0],
      costGmf: [null]
    });
    this.services$
      .subscribe((bills) =>
        bills.forEach((bill) => this.paymentBills.push(new FormControl(false)))
      )
      .unsubscribe();
  }

  get paymentBills(): FormArray {
    return this.form.get('paymentBills') as FormArray;
  }

  get totalAmount(): AbstractControl {
    return this.form.get('totalAmount');
  }
}
