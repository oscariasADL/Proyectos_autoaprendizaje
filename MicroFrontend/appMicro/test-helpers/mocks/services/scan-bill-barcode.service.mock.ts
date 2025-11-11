import { Injectable } from '@angular/core';

/*import { ScanBarcodeOptions } from '@commons/entities/scan/scan.entitites';
import { BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';*/

@Injectable()
export class ScanBillBarcodeServiceMock {
  /*public scanBarcode(
    _options?: ScanBarcodeOptions
  ): Promise<BarcodeScanResult> {
    return null;
  }*/

  public mapList(serviceCode: string, list: any[], fieldName: string): any {
    return null;
  }
}
