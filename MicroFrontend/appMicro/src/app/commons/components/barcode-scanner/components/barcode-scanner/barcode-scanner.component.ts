import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrScannerTemplateComponent } from '@commons/components/barcode-scanner/components/qr-scanner-template/qr-scanner-template.component';
import { BarcodeScannerTemplateComponent } from '@commons/components/barcode-scanner/components/barcode-scanner-template/barcode-scanner-template.component';

import { BarcodeScannerResultWithSize } from 'scanbot-web-sdk/@types';
import {
  BarcodeScannerUserGuidance,
  BarcodeType
} from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';
import {
  BARCODE_FORMAT,
  BARCODE_SCANNER_CONFIGURATION,
  BARCODE_SCANNER_PREPARE_ERROR_ALERT,
  SCANNER_TIMEOUT_MS
} from '@commons/components/barcode-scanner/constants/barcode-scanner.constants';
import { BarcodeScannerService } from '@commons/components/barcode-scanner/services/barcode-scanner.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { AlertService } from '@commons/services/alert.service';
import { barcodeScanningResultsMapper } from '@commons/components/barcode-scanner/mappers/barcode-scanner.mapper';
import { Capacitor } from '@capacitor/core';
import { QR_MOCK_RAW_WEB } from '@modules/qr/constants/qr-pay-scan.constants';
import ScanbotSDK from 'scanbot-web-sdk/ui';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    QrScannerTemplateComponent,
    BarcodeScannerTemplateComponent
  ],
  providers: [BarcodeScannerService]
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() barcodeType: BarcodeType;
  @Input() useFlashlight: boolean = false;
  @Input() barcodeScannerUserGuidance: BarcodeScannerUserGuidance;

  public readonly BARCODE_TYPES = BarcodeType;
  private SCANNER_TIMEOUT_MS = SCANNER_TIMEOUT_MS;
  private timer: number = undefined;

  constructor(
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private barcodeScannerService: BarcodeScannerService
  ) {}

  ngOnInit() {
    void this.initScanner();
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.timer);
  }

  public closeModal() {
    this.barcodeScannerService.pause();
    this.barcodeScannerService.dispose();
    void this.modalCtrl.dismiss({ exit: true });
  }

  public toggleFlashlight(): void {
    const isFlashlightOn = this.barcodeScannerService.flashlightStatus;

    if (isFlashlightOn) {
      this.barcodeScannerService.turnOffTorch();
    } else {
      this.barcodeScannerService.turnOnTorch();
    }
  }

  private async initScanner() {
    const isReadyForScan = await this.prepareScanner();
    if (isReadyForScan) {
      await this.barcodeScannerService.initialize();

      await this.createScanner();
    }
  }

  private async createScanner(): Promise<void> {
    if (!Capacitor.isNativePlatform()) {
      const scanResult =
        this.barcodeType === BarcodeType.QR ? QR_MOCK_RAW_WEB : '';
      void this.modalCtrl.dismiss({ barcode: scanResult });
      return;
    }
    const license = await this.barcodeScannerService.getLicenseInfo();
    if (license.isValid()) {
      try {
        await this.barcodeScannerService.createBarcodeScanner({
          ...BARCODE_SCANNER_CONFIGURATION,
          detectionParameters: {
            barcodeFormatConfigurations: [
              new ScanbotSDK.Config.BarcodeFormatCommonConfiguration({
                formats: [BARCODE_FORMAT[this.barcodeType]]
              })
            ]
          },
          onBarcodesDetected: (result: BarcodeScannerResultWithSize) => {
            this.barcodeScannerService.pause();
            this.handleBarcodeResults(barcodeScanningResultsMapper(result));
          }
        });
        this.startScannerLifeTime();
      } catch (error) {
        console.error('Error creating barcode scanner', error);
      }
    } else {
      console.error('License is not valid');
    }
  }

  private async prepareScanner(): Promise<boolean> {
    try {
      return await this.barcodeScannerService.prepareScanner();
    } catch (e) {
      this.alertService
        .create({
          ...BARCODE_SCANNER_PREPARE_ERROR_ALERT,
          description: e
        })
        .then(() => {
          this.modalCtrl.dismiss({ exit: true }, null, this.id);
        });
      return Promise.resolve(false);
    }
  }

  private handleBarcodeResults(scanResult: string) {
    this.barcodeScannerService.dispose();
    window.clearTimeout(this.timer);
    void this.modalCtrl.dismiss({ barcode: scanResult });
  }

  private startScannerLifeTime(): void {
    this.timer = window.setTimeout(
      () => this.closeModal(),
      this.SCANNER_TIMEOUT_MS
    );
  }

  get flashlightStatus(): boolean {
    return this.barcodeScannerService.flashlightStatus;
  }
}
