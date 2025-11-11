import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { QrData } from '@commons/entities/scan/qr.entities';
import { TrxPurpose } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { QrPayDalePayload } from '@modules/qr/pages/qr-pay-dale/entities/qr-pay-dale.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

@Injectable()
export class QrPayDaleFacadeMock extends AppFacadeMock {
  public qrData$: Observable<QrData> = new BehaviorSubject({
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

  public qrScan$: Observable<string> = new BehaviorSubject('');

  public payQrDale(payload: QrPayDalePayload, data: AlertStepData): void {}
}
