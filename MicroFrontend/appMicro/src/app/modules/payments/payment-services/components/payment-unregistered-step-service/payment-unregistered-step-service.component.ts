import { TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlertSheetType } from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import { removeSubscriptions } from '@commons/utils/util';
import {
  BARCODE_SCANNER_USER_GUIDANCE_SERVICES,
  PaymentServicesError
} from '@modules/payments/payment-services/constants/payment-services.constants';
import {
  SearchBillBarcodeResponse,
  ServiceData
} from '../../entities/register-service.interface';
import { PaymentServicesFacade } from '../../payment-services.facade';
import { PaymentServicesService } from '../../services/payment-services.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { BarcodeScannerComponent } from '@commons/components/barcode-scanner/components/barcode-scanner/barcode-scanner.component';
import { BarcodeType } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';

@Component({
  selector: 'app-payment-unregistered-step-service',
  templateUrl: './payment-unregistered-step-service.component.html',
  styleUrls: ['./payment-unregistered-step-service.component.sass']
})
export class PaymentUnregisteredStepServiceComponent
  implements OnInit, OnDestroy
{
  @Input() bill: UntypedFormControl;
  @Input() reference: UntypedFormControl;
  @Input() payValue: UntypedFormControl;
  @Input() isBarcode: UntypedFormControl;
  @Input() fromProduct: UntypedFormControl;
  @Input() amountType: UntypedFormControl;
  @Input() invoiceNumber: UntypedFormControl;
  @Input() maxPaymentDateComplete: UntypedFormControl;
  @Input() isSelectNewBill: UntypedFormControl;

  @Output() continue: EventEmitter<boolean> = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];
  public isScanActive = false;

  constructor(
    private titleCase: TitleCasePipe,
    private alertService: AlertService,
    private analytics: AnalyticsService,
    private facade: PaymentServicesFacade,
    private service: PaymentServicesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    if (this.isSelectNewBill.value) {
      this.facade.searchCategoryClean();
    }
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  public onselectCategory(bill: ServiceData): void {
    this.isSelectNewBill.setValue(this.bill.value?.orgIdNum !== bill.orgIdNum);
    this.bill.setValue({
      ...bill,
      name: this.titleCase.transform(bill.name)
    });
    this.isBarcode.setValue(false);
    this.continue.emit(false);
  }

  /*public async scanBarcode(): Promise<void> {
    this.isSelectNewBill.setValue(true);
    this.facade.enableLoading();

    try {
      const { text: barcode } = await this.scanBillBarcode.scanBarcode();
      const bill = await this.searchBillBarcode(barcode);
      this.setBarcodeBillData(bill);
    } catch (error) {
      this.analytics.sendError('Barcode Error', error.message);
      this.facade.searchBillReferenceClean();
      this.facade.searchCategoryClean();
      this.facade.disableLoading();
      this.alertService
        .create({
          type: AlertSheetType.error,
          id: 'unregistered-service-error-alert',
          title: 'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_ERROR',
          description: error.message,
          buttons: [
            'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_BUTTON'
          ]
        })
        .then((retry) => (!!retry ? this.scanBarcode() : null));
    }
  }*/

  public async scanBarcode2(): Promise<void> {
    this.isSelectNewBill.setValue(true);
    this.facade.closeToast();
    try {
      this.isScanActive = true;
      const modal = await this.modalCtrl.create({
        id: 'payment-unregistered-step-service-barcode-scanner',
        component: BarcodeScannerComponent,
        componentProps: {
          id: 'payment-unregistered-step-service-barcode-scanner-modal',
          barcodeType: BarcodeType.BARCODE,
          barcodeScannerUserGuidance: BARCODE_SCANNER_USER_GUIDANCE_SERVICES
        },
        showBackdrop: false,
        mode: 'md',
        cssClass: 'avv-custom-full-modal barcode-scanning-modal'
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      const barcode = data?.barcode;
      const isExit: boolean = data?.exit ?? false;
      if (isExit) return;

      if (isNullOrUndefined(barcode)) {
        throw new Error('Error en la lectura de código de barras');
      }

      this.facade.enableLoading();
      const bill = await this.searchBillBarcode(barcode);
      this.setBarcodeBillData(bill);
    } catch (error) {
      void this.analytics.sendError('Barcode Error', error.message);
      this.facade.searchBillReferenceClean();
      this.facade.searchCategoryClean();
      this.facade.disableLoading();
      this.alertService
        .create({
          type: AlertSheetType.error,
          id: 'unregistered-service-error-alert',
          title:
            'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_ERROR',
          description: error.message,
          buttons: [
            'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_BUTTON'
          ]
        })
        .then((retry) => (!!retry ? this.scanBarcode2() : null));
    } finally {
      this.isScanActive = false;
    }
  }

  public setBarcodeBillData(bill: SearchBillBarcodeResponse): void {
    if (
      isNullOrUndefinedOrEmpty(bill?.nie) ||
      isNullOrUndefinedOrEmpty(bill?.amount)
    ) {
      throw new Error(PaymentServicesError.billError);
    }
    this.bill.setValue({
      ...bill,
      name: bill?.serviceType,
      isBiller: bill?.biller,
      orgIdNum: bill?.orgId.orgIdNum
    });
    this.reference.setValue(bill.nie);
    this.payValue.setValue(parseFloat(bill.amount));
    this.amountType.patchValue(bill.amountType);
    this.invoiceNumber.patchValue(bill.invoiceNum);
    this.isBarcode.setValue(true);
    this.continue.emit(true);
  }

  private async searchBillBarcode(
    barcode: string
  ): Promise<SearchBillBarcodeResponse> {
    try {
      return await this.service.searchBillBarcode({ barcode }).toPromise();
    } catch (error) {
      throw new Error(mapError(error));
    }
  }
}
