import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { removeProperties } from '@commons/utils/util';
import { environment as ENV } from '@environment';
import {
  TransferPayload,
  TransferType
} from '@modules/transfers/entities/transfers.interface';
import { Observable } from 'rxjs';
import { AppFacade } from '@app/app.facade';
import { UserData } from '@commons/entities/auth/auth.entities';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Injectable()
export class TransfersService {
  constructor(private http: HttpClient, private appFacade: AppFacade) {}

  public transfer(body: TransferPayload): Observable<GenericResponse> {
    let url = ENV.api.services.transactions.transfers.own;
    const _body = removeProperties(body, ['transferType']);
    const transfiyaFingerprint =
      this.appFacade.transfiyaFingerprint$.currentValue();
    const deviceInfo = this.appFacade.deviceInfo$.currentValue();
    const { dataBasicClientDto: userData } =
      this.appFacade.userData$.currentValue() as UserData;
    _body.deviceAdmin = {
      brand: deviceInfo?.manufacturer ?? '-',
      osDevice: deviceInfo?.platform ?? '-',
      devModel: deviceInfo?.model ?? '-',
      simCard: {
        operator: transfiyaFingerprint?.Geolocation?.isp ?? '-',
        simCardId: '-'
      },
      locationInfo: {
        countryName: transfiyaFingerprint?.Geolocation?.country ?? '-',
        cityName: transfiyaFingerprint?.Geolocation?.city ?? '-',
        geoLocation: '-'
      }
    };

    if (
      [
        TransferType.REQUEST_TRANSFIYA,
        TransferType.REQUEST_CEL2CEL,
        TransferType.SEND_CEL2CEL,
        TransferType.SEND_TRANSFIYA
      ].includes(body.transferType)
    ) {
      _body.firstName = userData.firstName;
      _body.lastName = userData.lastName;
    }

    switch (body.transferType) {
      case TransferType.MY_ACCOUNTS_AVV:
        url = ENV.api.services.transactions.transfers.own;
        break;
      case TransferType.MY_CONTACTS:
        url = ENV.api.services.transactions.transfers.contacts;
        break;
      case TransferType.FAST_TRANSFER:
        url = ENV.api.services.transactions.transfers.fast;
        break;
      /*case TransferType.SEND_TRANSFIYA:
        url = ENV.api.services.transactions.transfiya_debit;
        break;*/
      case TransferType.REQUEST_TRANSFIYA:
        url = ENV.api.services.transactions.transfiya_request;
        break;
      case TransferType.REQUEST_CEL2CEL:
        url = ENV.api.services.transactions.transfiya_request;
        break;
      case TransferType.SEND_CEL2CEL:
      case TransferType.SEND_TRANSFIYA:
      case TransferType.SEND_AVAL_KEY:
        url = ENV.api.services.transactions.transfers.avvCel2cel;
        break;
      case TransferType.SEND_BRE_B:
        url = ENV.api.services.transactions.transfers.breB;
        break;
      case TransferType.SEND_AVV_PHONE:
        url = ENV.api.services.transactions.transfers.avvPhone;
        break;
    }

    let finalURL = urlBuilder.services(url);
    if (ENV.encrypt && body.transferType === TransferType.SEND_BRE_B) {
      const apiGateway: string = this.appFacade.featureFlagsByKey(
        FeatureFlagsKey.NewEndPointTransferBreB
      ) as string;
      finalURL = `${apiGateway}/storm${url}`;
    }

    return this.http.post<GenericResponse>(finalURL, {
      ..._body
    });
  }
}
