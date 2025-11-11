import { Injectable } from '@angular/core';
//import { ScanResult } from '@capacitor-community/barcode-scanner';
//import { BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

import { QR_SCAN_RESULT_DEFAULT } from '@modules/qr/constants/qr.constants';
import { Observable, of } from 'rxjs';
import { QrData } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { TrxPurpose } from '@commons/entities/scan/qr.entities';

@Injectable()
export class QrServiceMock {
  /*public prepareQrScanner(): void {}

  public async checkPermission(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async startQRScanner(): Promise<ScanResult> {
    return Promise.resolve({
      hasContent: true,
      content: '87347834783487347834783478'
    });
  }*/

  /*public stopQrScanner(): void {}*/

  public scanQR(): Promise<any> {
    return Promise.resolve(QR_SCAN_RESULT_DEFAULT);
  }

  public parseQR(metadata: string): Observable<QrData> {
    return of({
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
  }

  private scanBarcode(): Promise<any> {
    return Promise.resolve(QR_SCAN_RESULT_DEFAULT);
  }
}
