import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { SERVICES } from '@commons/constants/navigate.constants';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { PaymentServicesFacade } from '../../payment-services.facade';
import {
  PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD,
  PAYMENT_UNREGISTERED_SERVICE_EXIT_DATA,
  PAYMENT_UNREGISTERED_SERVICE_STEPS,
  PaymentUnregisteredServiceSlide
} from './constants/payment-unregistered-service.constants';
import {
  mapPaymentUnregisteredServiceConfirm,
  mapPaymentUnregisteredServiceVoucher
} from './mappers/payment-unregistered-service-confirm.mapper';
import { mapPaymentUnregisteredServiceSlides } from './mappers/payment-unregistered-service-slides.mapper';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';

@Component({
  selector: 'app-payment-unregistered-service',
  templateUrl: './payment-unregistered-service.page.html',
  styleUrls: ['./payment-unregistered-service.page.sass']
})
@GenericStepperInit(
  {
    initSlide: PaymentUnregisteredServiceSlide.from.toString(),
    alternativeSlide: PaymentUnregisteredServiceSlide.service.toString(),
    field: PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD
  },
  {
    backUrl: SERVICES,
    steps: PAYMENT_UNREGISTERED_SERVICE_STEPS,
    exitData: PAYMENT_UNREGISTERED_SERVICE_EXIT_DATA,
    data: (component: PaymentUnregisteredServicePage) =>
      mapPaymentUnregisteredServiceSlides(component.form),
    confirmMapper: mapPaymentUnregisteredServiceConfirm,
    voucherMapper: mapPaymentUnregisteredServiceVoucher
  },
  {
    step: PaymentUnregisteredServiceSlide.from.toString(),
    field: PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD
  }
)
export class PaymentUnregisteredServicePage
  extends GenericStepperBase
  implements OnInit, OnDestroy
{
  constructor(
    protected injector: Injector,
    private facade: PaymentServicesFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.facade.destroyToast();
  }

  public nextStep(slide: string): void {
    if (slide === (PAYMENT_UNREGISTERED_SERVICE_STEPS.length - 1).toString()) {
      this.facade.showToastMaxAmountWarning('UNREGISTERED');
    } else {
      this.facade.destroyToast();
    }
    super.nextStep(slide);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      bill: [null],
      reference: [null, [Validators.required]],
      payValue: [
        null,
        [
          Validators.required,
          (control: UntypedFormControl): ValidationErrors => {
            const formGroup = this.form;
            if (!!formGroup && !!control) {
              const value: number = control.value;
              const fromProduct = this.form.get('fromProduct');
              if (
                !isNullOrUndefined(value) &&
                !isNullOrUndefined(fromProduct.value) &&
                fromProduct.value[
                  PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD
                ] < value
              ) {
                return { transferValueToSendNotFunds: true };
              }
            }
            return null;
          }
        ]
      ],
      amountType: 'Valor_facturador_principal',
      invoiceNumber: null,
      maxPaymentDateComplete: null,
      agreementType: null,
      isBarcode: false,
      isSelectNewBill: true,
      fee: [null],
      costGmf: [null],
      confirmation: [null]
    });
  }

  protected async setConfirmationData(confirmationStep: string): Promise<void> {
    if (this.isBarcode.value) {
      this.facade.disableLoading();
      if (
        this.fromProduct.value[PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD] <
        this.payValue.value
      ) {
        this.data[
          PaymentUnregisteredServiceSlide.confirmation
        ].data.noticeError =
          'PAYMENTS.SERVICES.UNREGISTERED_STEP_REFERENCE.NOT_FOUNDS';
      } else if (
        this.payValue.value >
        this.facade.boundsByKey(ParameterKey.paymentServiceAmountMax)
      ) {
        this.data[
          PaymentUnregisteredServiceSlide.confirmation
        ].data.noticeError =
          'PAYMENTS.SERVICES.UNREGISTERED_STEP_REFERENCE.NOTICE_1';
      } else {
        this.data[
          PaymentUnregisteredServiceSlide.confirmation
        ].data.noticeError = null;
      }
    } else {
      this.data[PaymentUnregisteredServiceSlide.confirmation].data.noticeError =
        null;
    }

    return super.setConfirmationData(confirmationStep);
  }

  @GenericStepperAction
  public sendPayment(): void {
    if (this.form.valid) {
      const {
        bill,
        fromProduct,
        reference,
        payValue,
        amountType,
        invoiceNumber,
        maxPaymentDateComplete,
        agreementType
      } = this.form.value;

      const { isBiller, orgIdNum } = bill;
      const payload = {
        productOrigin: {
          accountType: fromProduct.type,
          accountId: fromProduct.id
        },
        amount: sanitizeCurrency(payValue).toString(),
        referenceId: reference,
        biller: isBiller,
        organizationId: orgIdNum,
        amountType,
        invoiceNumber,
        maxPaymentDateComplete,
        agreementType
      };
      this.facade.payBill(payload, this.alertStepData(), false);
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
    const { fromProduct, payValue } = this.form.value;

    return {
      productNumber: fromProduct.numberProduct,
      productType: fromProduct.type,
      amountTransaction: payValue,
      availableBalance: fromProduct.availableBalance
    };
  }

  get bill(): AbstractControl {
    return this.form.get('bill');
  }

  get reference(): AbstractControl {
    return this.form.get('reference');
  }

  get payValue(): AbstractControl {
    return this.form.get('payValue');
  }

  get isBarcode(): AbstractControl {
    return this.form.get('isBarcode');
  }

  get fromProduct(): AbstractControl {
    return this.form.get('fromProduct');
  }

  get amountType(): AbstractControl {
    return this.form.get('amountType');
  }

  get invoiceNumber(): AbstractControl {
    return this.form.get('invoiceNumber');
  }

  get maxPaymentDateComplete(): AbstractControl {
    return this.form.get('maxPaymentDateComplete');
  }

  get isSelectNewBill(): AbstractControl {
    return this.form.get('isSelectNewBill');
  }

  get PaymentUnregisteredServiceSlide(): typeof PaymentUnregisteredServiceSlide {
    return PaymentUnregisteredServiceSlide;
  }
}
