import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { mapError } from '@commons/helpers/http.helpers';
import {
  isHexadecimal,
  isNullOrUndefined
} from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import { NavController } from '@ionic/angular';
import {
  BARCODE_SCANNER_USER_GUIDANCE_QR_PAY,
  QR_PAY_DATA_ERROR,
  WRONG_SCAN_ALERT_ERROR
} from '@modules/qr/pages/qr-pay/constants/qr-pay.constants';
import {
  QRType,
  TrxPurpose
} from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import { QrPayError } from '@modules/qr/pages/qr-pay/entities/qr-pay.interface';
import {
  QrPaymentMethod,
  QrPaymentMethodData,
  QrPaymentMethods
} from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';
import { mapPaymentMethods } from '@modules/qr/pages/qr-pay/mappers/qr-pay-product.mapper';
import { QrPayFacade } from '@modules/qr/pages/qr-pay/qr-pay.facade';
import { QrPayService } from '@modules/qr/pages/qr-pay/service/qr-pay.service';
import { defer, from, lastValueFrom, Observable, of } from 'rxjs';
import {
  catchError,
  finalize,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { transformMerchantIdIntoValidSpiKey } from '@modules/qr/pages/qr-pay/helpers/qr-pay-validators.helpers';
import {
  HOME,
  QR_AUTHORIZATION,
  QR_PAY
} from '@commons/constants/navigate.constants';
import { InformationService } from '@commons/services/information.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { QrService } from '@modules/qr/service/qr.service';
import {
  QR_PAY_SCAN_PERMISSION_ALERT,
  QR_PAY_SCAN_READING_ERROR_ALERT
} from '@modules/qr/constants/qr-pay-scan.constants';
import { BarcodeScannerComponent } from '@commons/components/barcode-scanner/components/barcode-scanner/barcode-scanner.component';
import { BarcodeType } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';
import { QrData } from '@commons/entities/scan/qr.entities';
import { StatusKeyDirectory } from '@commons/entities/transfers/transfers-spi-key.interface';

export const QrPayGuardCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const facade = inject(QrPayFacade);
  const service = inject(QrPayService);
  const navCtrl = inject(NavController);
  const analytics = inject(AnalyticsService);
  const alertService = inject(AlertService);

  facade.resetQRPay();

  return from(qrPayScanFn()).pipe(
    switchMap((qrPayScanProcessSuccess) => {
      if (!qrPayScanProcessSuccess) {
        facade.disableLoading();
        return of(false);
      }

      return facade.qrScan$.pipe(
        tap(() => facade.enableLoading()),
        withLatestFrom(facade.qrPayData$, facade.userData$),
        switchMap(([, qrData]) =>
          defer(async () => {
            facade.setQrType(qrData.qrType as any as QRType);

            if (qrData.trxPurpose === TrxPurpose.pay) {
              const merchantIdTransformed = transformMerchantIdIntoValidSpiKey(
                qrData.merchantCode
              );
              const spiUserKey = await lastValueFrom(
                service.fetchAccountSpiUserKey(merchantIdTransformed)
              );
              facade.setSpiUserKey(spiUserKey);

              const isItBetweenAccounts =
                spiUserKey?.statusDirectory === StatusKeyDirectory.DICE;
              facade.setIsItBetweenAccounts(isItBetweenAccounts);

              if (isItBetweenAccounts) {
                return true;
              }

              const paymentMethods: QrPaymentMethods = await lastValueFrom(
                service.paymentMethods()
              );

              const paymentMethodsMapped: QrPaymentMethod =
                mapPaymentMethods(paymentMethods);

              if (
                paymentMethodsMapped?.debitAccounts.length > 0 ||
                paymentMethodsMapped?.creditCards.length > 0
              ) {
                facade.setQRPaymentMethods(paymentMethodsMapped);
                return true;
              } else {
                if (!isItBetweenAccounts)
                  throw new Error(QrPayError.paymentMethods);
              }
            } else {
              let qrPaymentMethodData: QrPaymentMethodData;
              try {
                qrPaymentMethodData = await lastValueFrom(
                  service.paymentMethodQRData(qrData.referenceLabel)
                );
              } catch (e) {
                throw new Error(QrPayError.methodQRData);
              }

              if (!isNullOrUndefined(qrPaymentMethodData)) {
                facade.setQRPaymentMethodData(qrPaymentMethodData);
                return true;
              } else {
                throw new Error(QrPayError.methodQRData);
              }
            }
            throw new Error();
          }).pipe(
            catchError((error: HttpErrorResponse) => {
              //analytics.sendError('QR Pay Error', error.message);
              alertService.create({
                ...QR_PAY_DATA_ERROR,
                description: mapError(error)
              });
              navCtrl.navigateForward(HOME);
              return of(false);
            }),
            finalize(() => facade.disableLoading())
          )
        )
      );
    })
  );
};

const qrPayScanFn = async (): Promise<boolean> => {
  const navCtrl = inject(NavController);
  const informationService = inject(InformationService);
  const modalCtrl = inject(ModalController);
  const alertService = inject(AlertService);
  const facade = inject(QrPayFacade);
  const qrService = inject(QrService);

  const data = await informationService.showPanelIfNecessary(
    QR_PAY_SCAN_PERMISSION_ALERT
  );

  try {
    const modal = await modalCtrl.create({
      component: BarcodeScannerComponent,
      componentProps: {
        id: 'qr-authorization-barcode-scanner-modal',
        barcodeType: BarcodeType.QR,
        useFlashlight: true,
        barcodeScannerUserGuidance: BARCODE_SCANNER_USER_GUIDANCE_QR_PAY
      },
      showBackdrop: false,
      mode: 'md',
      cssClass: 'avv-custom-full-modal barcode-scanning-modal'
    });

    await modal.present();
    const { data: dataBarcode } = await modal.onDidDismiss();

    const scanResult = dataBarcode?.barcode;
    const isExit = dataBarcode.exit as boolean;
    if (isExit) return Promise.resolve(false);

    if (isHexadecimal(scanResult)) {
      alertService.create(WRONG_SCAN_ALERT_ERROR).then((response) => {
        if (response) {
          navCtrl.navigateForward(QR_AUTHORIZATION);
        }
      });
      return Promise.resolve(false);
    }

    facade.setQRScan(scanResult);
    facade.enableLoading();
    const qrData: QrData = await qrService.parseQR(scanResult).toPromise();
    if (isNullOrUndefined(qrData)) {
      throw new Error();
    }
    facade.setQRData(qrData);
    return Promise.resolve(true);
  } catch (e) {
    facade.disableLoading();
    alertService
      .create({
        ...QR_PAY_SCAN_READING_ERROR_ALERT
      })
      .then((response) => {
        if (!isNullOrUndefined(response)) {
          navCtrl.navigateForward(QR_PAY);
        }
      });
    return Promise.resolve(false);
  }
};
