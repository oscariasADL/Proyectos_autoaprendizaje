import { Injectable } from '@angular/core';
import {
  QrData,
  QRType,
  TrxPurpose
} from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import {
  QrCancelPayload,
  QrPayPayload
} from '@modules/qr/pages/qr-pay/entities/qr-pay.interface';
import {
  QrPaymentMethod,
  QrPaymentMethodData
} from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { ProductFactory } from '@testing/factories/product.factory';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';

@Injectable()
export class QrPayFacadeMock extends AppFacadeMock {
  public qrScan$: Observable<string> = new BehaviorSubject('');

  public qrPayData$: Observable<QrData> = new BehaviorSubject({
    emvIndicator: '',
    qrType: '',
    crc: '',
    securityHashCode: '',
    terminal: '',
    acquirerCode: '',
    merchantCode: '',
    ivaValue: '',
    incValue: '',
    merchantAggregatorCode: '',
    merchantCategoryCode: '',
    countryCode: '',
    merchantName: '',
    merchantCity: '',
    postalCode: '',
    channelCode: '',
    ivaConditionCode: '',
    ivaDomain: '',
    ivaBaseValue: '',
    incConditionCode: '',
    currencyCode: '',
    transactionAmount: '',
    trnConsecutiveCode: '',
    tipIndicator: '',
    tipValue: '',
    tipPercentage: '',
    totalTrxAmount: '',
    netTrxAmount: '',
    languagePreference: '',
    billingNumber: '',
    mobileNumber: '',
    storeLabel: '',
    loyaltyNumber: '',
    referenceLabel: '',
    customerLabel: '',
    trxPurpose: TrxPurpose.pay,
    additionalConsumerData: '',
    merchantLanguageName: '',
    merchantLanguageCity: '',
    acquirerDomain: '',
    securityHashDomain: '',
    merchantDomain: '',
    channelDomain: '',
    ivaConditionDomain: '',
    ivaBaseDomain: '',
    incConditionDomain: '',
    trnConsecutiveDomain: '',
    incDomain: ''
  });

  public qrPayType$: Observable<TrxPurpose> = new BehaviorSubject(
    TrxPurpose.pay
  );

  public qrPaymentMethods$: Observable<QrPaymentMethod> = new BehaviorSubject({
    creditCards: [],
    debitAccounts: []
  });

  public qrType$: Observable<QRType> = new BehaviorSubject(QRType.dynamic);

  public isItBetweenAccounts$: Observable<boolean> = new BehaviorSubject(false);

  public isValidCommerce$: Observable<boolean> = new BehaviorSubject(false);

  public isSpiUserKey$: Observable<boolean> = new BehaviorSubject(false);

  public spiUserKey$: Observable<TransferSpiUserKey> = new BehaviorSubject(
    null
  );

  public qrPaymentMethodData$: Observable<QrPaymentMethodData> =
    new BehaviorSubject({
      paymentMethod: new ProductFactory().create() as any,
      installments: '3'
    });

  public payQR(payload: QrPayPayload, data: AlertStepData): void {}

  public cancelQR(payload: QrCancelPayload, data: AlertStepData): void {}

  public resetQRPay(): void {}

  public setQRScan(qrScan: string): void {}

  public setQRData(qrData: QrData): void {}

  public setQRPaymentMethods(qrPaymentMethods: QrPaymentMethod): void {}

  public setQRPaymentMethodData(
    qrPaymentMethodData: QrPaymentMethodData
  ): void {}

  public setQrType(qrType: QRType): void {}

  public setIsItBetweenAccounts(isItBetweenAccounts: boolean) {}

  public setIsValidCommerce(isValidCommerce: boolean): void {}

  public setIsSpiUserKey(isSpiUserKey: boolean): void {}

  public setSpiUserKey(spiUserKey: TransferSpiUserKey): void {}
}
