import { inject, Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { DeviceData } from '@app/commons/entities/device/device.interface';
import { NotificationResponse } from '@app/commons/entities/notifications/notification.entities';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { AdlDigipassService } from '@app/commons/services/adl-digipass.service';
import { AdlSecureMessagingService } from '@app/commons/services/adl-secure-messaging.service';
import { NotificationsService } from '@app/commons/services/notifications.service';
import { DecryptSecureChannelMessageBodyOptions } from '@avaldigitallabs/one-span-digipass';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private adlDigipass = inject(AdlDigipassService);
  private adlSecureMessaging = inject(AdlSecureMessagingService);
  private service = inject(NotificationsService);

  constructor(private facade: AppFacade) {}

  public getNotificationInfo(notificationId: string, db) {
    const { uuid: deviceId } =
      this.facade.deviceInfo$.currentValue() as DeviceData;
    const { typeDocument: documentType, document: documentNumber } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );

    return this.service.fetchNotifications({
      deviceId,
      documentType,
      documentNumber,
      id: notificationId
    });
  }

  public async decryptNotificationMessage(
    message: string
  ): Promise<Record<string, string>> {
    try {
      const options: DecryptSecureChannelMessageBodyOptions = {
        secureChannelMessageRequest: message,
        staticVector: await this.adlDigipass.staticVector(),
        dynamicVector: await this.adlDigipass.dynamicVector(),
        fingerprint: await this.adlDigipass.fingerprint()
      };
      const { decryptedBody } =
        await this.adlDigipass.decryptSecureChannelMessageBody(options);

      const { data } = await this.adlSecureMessaging.parseBodyTransaction({
        value: decryptedBody
      });
      return data;
    } catch (error) {
      return null;
    }
  }
}
