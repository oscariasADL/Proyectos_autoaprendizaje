import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchListItem } from '@commons/components/search-list/entities/search-list.entities';
import { AlertSheetType } from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import { ScanBillBarcodeService } from '@commons/services/scan-bill-barcode.service';
import { PaymentServicesError } from '@modules/payments/payment-services/constants/payment-services.constants';
import { SearchBillBarcodeResponse } from '@modules/payments/payment-services/entities/register-service.interface';

import { CityPaymentTaxes } from '../../entities/payment-taxes.interface';
import { PaymentTaxesFacade } from '../../payment-taxes.facade';
import { PaymentTaxesService } from '../../services/payment-taxes.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { BarcodeScannerComponent } from '@commons/components/barcode-scanner/components/barcode-scanner/barcode-scanner.component';
import { BarcodeType } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';

@Component({
  selector: 'app-payments-taxes-step-city',
  templateUrl: './payments-taxes-step-city.component.html',
  styleUrls: ['./payments-taxes-step-city.component.sass']
})
export class PaymentsTaxesStepCityComponent implements OnInit {
  @Input() city: UntypedFormControl;
  @Input() agreement: UntypedFormControl;
  @Input() reference: UntypedFormControl;
  @Input() isBarcode: UntypedFormControl;
  @Output() continue: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private facade: PaymentTaxesFacade,
    private alertService: AlertService,
    private analytics: AnalyticsService,
    private taxesService: PaymentTaxesService,
    private scanBillBarcode: ScanBillBarcodeService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.facade.fetchCities();
  }

  /*public async scanBarcode(): Promise<void> {
    this.facade.enableLoading();

    try {
      const { text: barcode } = await this.scanBillBarcode.scanBarcode();
      const bill = await this.searchBillBarcode(barcode);
      this.setBarcodeBillData(bill);
    } catch (error) {
      this.analytics.sendError('Barcode Error', error.message);
      this.facade.disableLoading();
      this.alertService
        .create({
          type: AlertSheetType.error,
          id: 'payment-taxes-service-error-alert',
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
    try {
      const modal = await this.modalCtrl.create({
        id: 'payment-taxes-step-city-barcode-scanner',
        component: BarcodeScannerComponent,
        componentProps: {
          id: 'payment-taxes-step-city-barcode-scanner-modal',
          barcodeType: BarcodeType.BARCODE,
          barcodeScannerUserGuidance: {
            title:
              'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_TITLE',
            cancelButtonText: 'ACTIONS.CANCEL'
          }
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
      this.facade.disableLoading();
      this.alertService
        .create({
          type: AlertSheetType.error,
          id: 'payment-taxes-service-error-alert',
          title:
            'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_ERROR',
          description: error.message,
          buttons: [
            'PAYMENTS.SERVICES.UNREGISTERED_STEP_SERVICE.BARCODE_SCAN.BARCODE_BUTTON'
          ]
        })
        .then((retry) => (!!retry ? this.scanBarcode2() : null));
    }
  }

  public onSelectCity(city: CityPaymentTaxes): void {
    this.city.patchValue(city);
    this.isBarcode.patchValue(false);
    this.continue.emit(false);
  }

  public setBarcodeBillData(bill: SearchBillBarcodeResponse): void {
    if (
      isNullOrUndefinedOrEmpty(bill?.nie) ||
      isNullOrUndefinedOrEmpty(bill?.amount)
    ) {
      throw new Error(PaymentServicesError.billError);
    }
    this.city.patchValue({ code: '', name: '' });
    this.isBarcode.patchValue(true);
    this.agreement.setValue({
      ...bill,
      name: bill?.serviceType,
      isBiller: bill?.biller,
      invoiceNumber: bill?.invoiceNum,
      orgIdNum: bill?.orgId.orgIdNum,
      code: bill?.orgId.orgIdNum,
      amount: parseFloat(bill.amount)
    });
    this.reference.patchValue(bill.nie);
    this.facade.disableLoading();
    this.continue.emit(true);
  }

  private async searchBillBarcode(
    barcode: string
  ): Promise<SearchBillBarcodeResponse> {
    try {
      return await this.taxesService.searchBillBarcode({ barcode }).toPromise();
    } catch (error) {
      throw new Error(mapError(error));
    }
  }

  get cities$(): Observable<SearchListItem[]> {
    return this.facade.cities$.pipe(
      map((cities) => cities.map((city) => ({ title: city.name, item: city })))
    );
  }

  get errorCities$(): Observable<boolean> {
    return this.facade.errorCities$;
  }

  get workingCities$(): Observable<boolean> {
    return this.facade.workingCities$;
  }
}
