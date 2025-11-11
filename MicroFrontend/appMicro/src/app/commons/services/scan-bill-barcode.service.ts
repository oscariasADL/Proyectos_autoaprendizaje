import { Injectable } from '@angular/core';

/*import { AppFacade } from '@app/app.facade';
import { Capacitor } from '@capacitor/core';
import { SCAN_BARCODE_OPTIONS_DEFAULT } from '@commons/constants/scan.constants';
import { ScanBarcodeOptions } from '@commons/entities/scan/scan.entitites';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import {
  BarcodeScanner,
  BarcodeScanResult
} from '@ionic-native/barcode-scanner/ngx';
import { PaymentServicesError } from '@modules/payments/payment-services/constants/payment-services.constants';*/

@Injectable({
  providedIn: 'root'
})
export class ScanBillBarcodeService {
  /*constructor(
    private facade: AppFacade,
    private alertService: AlertService,
    private barcodeScanner: BarcodeScanner
  ) {}

  public scanBarcode(
    _options?: ScanBarcodeOptions
  ): Promise<BarcodeScanResult> {
    const options: ScanBarcodeOptions = {
      ...SCAN_BARCODE_OPTIONS_DEFAULT,
      ..._options
    };

    if (!Capacitor.isNativePlatform()) {
      return Promise.resolve<BarcodeScanResult>(options.default);
    }

    return new Promise<BarcodeScanResult>((resolve, reject) =>
      this.barcodeScanner
        .scan(options.options)
        .then((barcodeScan: BarcodeScanResult) =>
          !barcodeScan.cancelled
            ? resolve(barcodeScan)
            : this.facade.disableLoading()
        )
        .catch((err) => {
          this.facade.disableLoading();
          return this.alertService.create(options.error);
        })
        .then((retry) => (retry ? this.scanBarcode() : null))
    );
  }

  public mapList(serviceCode: string, list: any[], fieldName: string): any {
    if (list?.length === 0) {
      throw new Error(PaymentServicesError.agreementLoad);
    }

    if (list?.length > 1) {
      const listAux = list.find(
        (l) =>
          l[fieldName].replace(/^0+/, '') === serviceCode.replace(/^0+/, '')
      );
      if (isNullOrUndefined(listAux)) {
        throw new Error(PaymentServicesError.agreementFilter);
      } else {
        return listAux;
      }
    }
    return list[0];
  }*/
}
