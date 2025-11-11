import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@commons/controllers/modal.controller';

import {
  isHexadecimal,
  isNullOrUndefined
} from '@commons/helpers/text.helpers';
import { QrAuthorizationFacade } from '@modules/qr/pages/qr-authorization/qr-authorization.facade';
import { AdlDigipassService } from '@commons/services/adl-digipass.service';
import { AdlSecureMessagingService } from '@commons/services/adl-secure-messaging.service';
import { DecryptSecureChannelMessageBodyOptions } from '@avaldigitallabs/one-span-digipass';
import { AlertService } from '@commons/services/alert.service';
import { CustomFactKeys } from '@modules/qr/pages/qr-authorization/entities/qr-authorization.interface';
import { QR_AUTHORIZATION_SCAN_ERROR } from '@modules/qr/constants/qr.constants';
import {
  QR_AUTHORIZATION,
  QR_PAY
} from '@commons/constants/navigate.constants';
import { InformationService } from '@commons/services/information.service';
import { QR_PAY_SCAN_PERMISSION_ALERT } from '@modules/qr/constants/qr-pay-scan.constants';
import { BarcodeScannerComponent } from '@commons/components/barcode-scanner/components/barcode-scanner/barcode-scanner.component';
import { BarcodeType } from '@commons/components/barcode-scanner/entities/barcode-scanner.interface';
import {
  BARCODE_SCANNER_USER_GUIDANCE,
  WRONG_SCAN_ALERT_ERROR
} from '@modules/qr/pages/qr-authorization/constants/qr-authorization.constants';
// import { NonEnrolledModalComponent } from '@modules/qr/pages/qr-authorization/components/non-enrolled-modal/non-enrolled-modal.component';

export const QrAuthorizationGuardCanActivate: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const navCtrl = inject(NavController);
  const modalCtrl = inject(ModalController);
  const adlDigipass = inject(AdlDigipassService);
  const adlSecureMessaging = inject(AdlSecureMessagingService);
  const alertService = inject(AlertService);
  const informationService = inject(InformationService);
  const facade = inject(QrAuthorizationFacade);

  /*const dynamicVector = await adlDigipass.dynamicVector();
  if (isNullOrUndefined(dynamicVector)) {
    const modal = await modalCtrl.create({
      component: NonEnrolledModalComponent,
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    });

    await modal.present();
    return Promise.resolve(false);
  }*/

  const qrCodeParam = !isNullOrUndefined(route.queryParams?.qrCode)
    ? route.queryParams.qrCode
    : null;

  let secureChannelMessageRequest: string;
  if (isNullOrUndefined(qrCodeParam))
    await informationService.showPanelIfNecessary(QR_PAY_SCAN_PERMISSION_ALERT);

  try {
    if (isNullOrUndefined(qrCodeParam)) {
      const modal = await modalCtrl.create({
        component: BarcodeScannerComponent,
        componentProps: {
          id: 'qr-authorization-barcode-scanner-modal',
          barcodeType: BarcodeType.QR,
          barcodeScannerUserGuidance: BARCODE_SCANNER_USER_GUIDANCE
        },
        showBackdrop: false,
        mode: 'md',
        cssClass: 'avv-custom-full-modal barcode-scanning-modal'
      });

      await modal.present();
      const { data: dataBarcode } = await modal.onDidDismiss();

      secureChannelMessageRequest = dataBarcode?.barcode;
      const isExit = dataBarcode.exit as boolean;
      if (isExit) return Promise.resolve(false);

      if (!isHexadecimal(secureChannelMessageRequest)) {
        alertService.create(WRONG_SCAN_ALERT_ERROR).then((response) => {
          if (response) {
            navCtrl.navigateForward(QR_PAY);
          }
        });
        return Promise.resolve(false);
      }

      facade.scanningQr(); //enable loading
    } else {
      secureChannelMessageRequest = qrCodeParam;
    }

    if (isNullOrUndefined(secureChannelMessageRequest)) {
      throw new Error();
    }

    const options: DecryptSecureChannelMessageBodyOptions = {
      secureChannelMessageRequest,
      staticVector: await adlDigipass.staticVector(),
      dynamicVector: await adlDigipass.dynamicVector(),
      fingerprint: await adlDigipass.fingerprint()
    };
    const { decryptedBody } = await adlDigipass.decryptSecureChannelMessageBody(
      options
    );

    const { dynamicCode } =
      await adlDigipass.generateSignatureFromSecureChannel(options);

    const { data } = await adlSecureMessaging.parseBodyTransaction({
      value: decryptedBody
    });
    const finalTitle = data[CustomFactKeys.NICKNAME_TRANSACTION] ?? '';

    facade.setQrData(finalTitle, data, dynamicCode);

    return Promise.resolve(true);
  } catch (e) {
    alertService
      .create({
        ...QR_AUTHORIZATION_SCAN_ERROR
      })
      .then((response) => {
        if (!isNullOrUndefined(response)) {
          navCtrl.navigateForward(QR_AUTHORIZATION);
        }
      });
    return Promise.resolve(false);
  } finally {
    facade.disableLoading();
  }
};
