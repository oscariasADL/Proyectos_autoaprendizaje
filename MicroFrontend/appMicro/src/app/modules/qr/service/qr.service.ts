import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/*import { Capacitor } from '@capacitor/core';
import {
  BarcodeScanner,
  BarcodeScanResult
} from '@ionic-native/barcode-scanner/ngx';*/
import { Observable } from 'rxjs';
import { environment as ENV } from '@environment';

import { AlertService } from '@commons/services/alert.service';
/*import {
  QR_PAY_SCAN_ERROR,
  QR_SCAN_RESULT_DEFAULT,
  QR_SCANNER_OPTIONS
} from '@modules/qr/constants/qr.constants';*/

import { QrData } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { AppFacade } from '@app/app.facade';

@Injectable()
export class QrService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private facade: AppFacade //private barcodeScanner: BarcodeScanner
  ) {}

  public parseQR(metadata: string): Observable<QrData> {
    const url = urlBuilder.services(ENV.api.services.qr.code);
    return this.http.post<QrData>(url, { metadata });
  }

  /*public scanQR(): Promise<BarcodeScanResult> {
    return !Capacitor.isNativePlatform()
      ? new Promise<BarcodeScanResult>((resolve) =>
          resolve(QR_SCAN_RESULT_DEFAULT)
        )
      : this.scanBarcode();
  }

  private scanBarcode(): Promise<BarcodeScanResult> {
    return new Promise<BarcodeScanResult>((resolve, reject) =>
      this.barcodeScanner
        .scan(QR_SCANNER_OPTIONS)
        .then((barcodeScan: BarcodeScanResult) =>
          !barcodeScan.cancelled
            ? resolve(barcodeScan)
            : this.facade.disableLoading()
        )
        .catch((err) => {
          this.facade.disableLoading();
          return this.alertService.create(QR_PAY_SCAN_ERROR);
        })
        .then((retry) => (!!retry ? this.scanBarcode() : null))
    );
  }*/
}
