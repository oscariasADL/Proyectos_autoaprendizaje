import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { Observable, map, firstValueFrom } from 'rxjs';
import { format, parseISO } from 'date-fns';

import { HOME } from '@commons/constants/navigate.constants';
import {
  QR_CANCEL_EXIT_DATA,
  QR_CANCEL_STEPS
} from '@modules/qr/pages/qr-pay/constants/qr-cancel.constants';
import {
  QR_PAY_DYNAMIC_STEPS,
  QR_PAY_EXIT_DATA,
  QR_PAY_STATIC_STEPS,
  QrPaySlide
} from '@modules/qr/pages/qr-pay/constants/qr-pay.constants';
import {
  QrPaymentMethod,
  QrPaymentMethodData
} from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';
import {
  qrPayDaleAmountsFieldValidators,
  qrPayInstallmentsFieldValidators
} from '@modules/qr/pages/qr-pay/helpers/qr-pay-validators.helpers';
import {
  mapQrCancelConfirm,
  mapQrCancelVoucher
} from '@modules/qr/pages/qr-pay/mappers/qr-cancel-confirm.mapper';
import {
  mapQrDynamicPayConfirm,
  mapQrDynamicPayVoucher,
  mapQrStaticPayConfirm,
  mapQrStaticPayVoucher
} from '@modules/qr/pages/qr-pay/mappers/qr-pay-confirm.mapper';
import {
  mapQrCancelSlides,
  mapQrPaySlides
} from '@modules/qr/pages/qr-pay/mappers/qr-pay-slides.mapper';
import { QrPayBase } from '@modules/qr/pages/qr-pay/qr-pay.base';
import { QRType } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { Product } from '@commons/entities/product/product.interface';
import { mapProductsByFilter } from '@modules/product/mappers/product-filter.mapper';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';
import { GenericStepperGMFPayload } from '@app/commons/decorators/generic-stepper.decorator';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';
import { sanitizeCurrency } from '@app/commons/helpers/text.helpers';
import { mapTargetAccountFromSpiUserKey } from '@modules/qr/pages/qr-pay/mappers/qr-pay-payload.mapper';

@Component({
  selector: 'app-qr-pay',
  templateUrl: './qr-pay.page.html',
  styleUrls: ['./qr-pay.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrPayPage extends QrPayBase implements OnInit {
  public products$: Observable<Product[]> = this.facade.balance$.pipe(
    map((balance) =>
      mapProductsByFilter(balance, {
        typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA],
        excludeSubtypeAccountProducts: [ProductTypeDetail.CER]
      })
    )
  );

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.isForPay) {
      this.setCurrentSlide(QrPaySlide.data);
      this.initPayForm();
      void this.initPayFormValues();
      this.initPayConfiguration();
    } else {
      this.setCurrentSlide(QrPaySlide.confirmation);
      this.initCancelForm();
      this.initCancelConfiguration();
      this.setConfirmationData(QrPaySlide.confirmation);
    }
  }

  private initPayForm(): void {
    this.form = this.formBuilder.group({
      qrMetadata: [null, [Validators.required]],
      data: [this.facade.qrPayData$.currentValue(), [Validators.required]],
      fromProduct: [null, [Validators.required]],
      towardProduct: [null],
      installments: [null, [qrPayInstallmentsFieldValidators.bind(this)]],
      amount: [
        0,
        [Validators.required, qrPayDaleAmountsFieldValidators.bind(this)]
      ],
      qrType: [this.qrType$.currentValue() as QRType, Validators.required],
      isItBetweenAccounts: [
        (this.isItBetweenAccounts$.currentValue() as boolean) ?? false,
        Validators.required
      ],
      spiUserKey: [this.facade.spiUserKey$.currentValue()],
      date: [this.date$.currentValue()],
      confirmation: [null],
      deviceInfo: [this.facade.deviceInfo$.currentValue()],
      userData: [this.facade.userData$.currentValue()],
      costGmf: [null]
    });
  }

  private async initPayFormValues(): Promise<void> {
    this.form.patchValue({
      qrMetadata: await firstValueFrom(this.facade.qrScan$),
      towardProduct: mapTargetAccountFromSpiUserKey(
        await firstValueFrom(this.facade.spiUserKey$)
      )
    });
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

  private initCancelForm(): void {
    this.form = this.formBuilder.group({
      qrMetadata: [this.facade.qrScan$.currentValue()],
      data: [this.facade.qrPayData$.currentValue()],
      fromProduct: [this.qrPaymentMethodData$.currentValue().paymentMethod],
      installments: [this.qrPaymentMethodData$.currentValue().installments],
      date: [this.date$.currentValue()],
      qrType: [this.qrType$.currentValue() as QRType, Validators.required],
      isItBetweenAccounts: [false, Validators.required],
      confirmation: [null]
    });
  }

  private initPayConfiguration(): void {
    const qrType = this.form.get('qrType') as AbstractControl<QRType>;
    const STEPS =
      qrType.value.toString() === QRType.dynamic.toString()
        ? QR_PAY_DYNAMIC_STEPS
        : QR_PAY_STATIC_STEPS;
    const mapQrPayConfirm =
      qrType.value.toString() === QRType.dynamic.toString()
        ? mapQrDynamicPayConfirm
        : mapQrStaticPayConfirm;
    const mapQrPayVoucher =
      qrType.value.toString() === QRType.dynamic.toString()
        ? mapQrDynamicPayVoucher
        : mapQrStaticPayVoucher;
    super.setData(
      HOME,
      STEPS,
      QR_PAY_EXIT_DATA,
      mapQrPaySlides(this.form),
      mapQrPayConfirm,
      mapQrPayVoucher,
      null,
      this.payQR
    );
  }

  private initCancelConfiguration(): void {
    super.setData(
      HOME,
      QR_CANCEL_STEPS,
      QR_CANCEL_EXIT_DATA,
      mapQrCancelSlides(this.form),
      mapQrCancelConfirm,
      mapQrCancelVoucher,
      null,
      this.cancelQR
    );
  }

  get qrPaymentMethods$(): Observable<QrPaymentMethod> {
    return this.facade.qrPaymentMethods$;
  }

  get date$(): Observable<string> {
    return this.facade.date$.pipe(
      map((date: string) => format(parseISO(date), 'dd/MM/yyyy'))
    );
  }

  get qrPaymentMethodData$(): Observable<QrPaymentMethodData> {
    return this.facade.qrPaymentMethodData$;
  }

  get qrType$(): Observable<QRType> {
    return this.facade.qrType$;
  }

  get isItBetweenAccounts$(): Observable<boolean> {
    return this.facade.isItBetweenAccounts$;
  }

  get spiUserKey$(): Observable<TransferSpiUserKey> {
    return this.facade.spiUserKey$;
  }
}
