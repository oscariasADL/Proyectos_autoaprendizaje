import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { PAYMENTS } from '@commons/constants/navigate.constants';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { ProductFilterSelector } from '@commons/entities/product/product-types.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { IonContent, NavController } from '@ionic/angular';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';
import {
  accountFilters,
  PAY_TAX_AVAILABLE_FIELD,
  PAY_TAX_EXIT_DATA,
  PAY_TAX_STEPS,
  PaytaxSlide
} from './constants/pay-tax.constants';
import {
  mapPayTaxConfirm,
  mapPayTaxVoucher
} from './mappers/pay-tax-confirm.mapper';
import { mapPaytaxSlides } from './mappers/pay-tax-slides.mapper';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';

@Component({
  selector: 'app-pay-tax',
  templateUrl: './pay-tax.page.html',
  styleUrls: ['./pay-tax.page.sass']
})
@GenericStepperInit(
  {
    initSlide: PaytaxSlide.from.toString(),
    alternativeSlide: PaytaxSlide.city.toString(),
    field: PAY_TAX_AVAILABLE_FIELD
  },
  {
    backUrl: PAYMENTS,
    steps: PAY_TAX_STEPS,
    exitData: PAY_TAX_EXIT_DATA,
    data: (component: PayTaxPage) => mapPaytaxSlides(component.form),
    confirmMapper: mapPayTaxConfirm,
    voucherMapper: mapPayTaxVoucher
  },
  { step: PaytaxSlide.from.toString(), field: PAY_TAX_AVAILABLE_FIELD }
)
export class PayTaxPage extends GenericStepperBase implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    protected injector: Injector,
    private facade: PaymentTaxesFacade,
    private navCtrl: NavController
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.cleanFields();
  }

  public onExit(): void {
    this.navCtrl.pop();
  }

  public scrollToTop(time: number): void {
    this.content.scrollToTop(time).then();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fromProduct: [this.productSelected(), [Validators.required]],
      city: [null, [Validators.required]],
      agreement: [null, [Validators.required]],
      reference: [null, [Validators.required]],
      agreementDetail: [null],
      isBarcode: [false, [Validators.required]],
      fee: [null],
      costGmf: [null],
      confirmation: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('fromProduct').value;
    return {
      transactionId: TransactionCostIds.PaymentTaxes,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperGMFPayload
  public gmfPayload(): GMFPayload {
    const { fromProduct, agreementDetail } = this.form.value;
    const amount = agreementDetail.amount;

    return {
      productNumber: fromProduct.numberProduct,
      productType: fromProduct.type,
      amountTransaction: sanitizeCurrency(amount),
      availableBalance: fromProduct.availableBalance
    };
  }

  @GenericStepperAction
  public sendPayment(): void {
    if (this.form.valid) {
      const { fromProduct, city, agreementDetail } = this.form.value;
      const payload = {
        productOrigin: {
          accountType: fromProduct.type,
          accountId: fromProduct.id
        },
        cityId: city.code,
        amount: sanitizeCurrency(agreementDetail.amount).toString(),
        referenceId: agreementDetail.referenceId,
        invoiceNumber: agreementDetail.invoiceNumber,
        organizationId: agreementDetail.organizationId,
        amountType: agreementDetail.amountType
      };
      this.facade.makePayment(payload, this.alertStepData());
    }
  }

  private cleanFields(): void {
    this.facade.cleanReferenceDetail();
  }

  get accountFilters(): ProductFilterSelector {
    return accountFilters;
  }

  get PaytaxSlide(): typeof PaytaxSlide {
    return PaytaxSlide;
  }
}
