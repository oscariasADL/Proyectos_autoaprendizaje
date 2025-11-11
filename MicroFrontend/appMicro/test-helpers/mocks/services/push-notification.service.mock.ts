import { Injectable } from '@angular/core';
import { NotificationResponse } from '@app/commons/entities/notifications/notification.entities';
import { AdlDigipassService } from '@app/commons/services/adl-digipass.service';
import { AdlSecureMessagingService } from '@app/commons/services/adl-secure-messaging.service';
import { NotificationsService } from '@app/commons/services/notifications.service';
import { NotificationMailboxEnum } from '@app/modules/notifications/constanst/notification.constants';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { of } from 'rxjs';

@Injectable()
export class PushNotificationServiceMock {
  private adlDigipass: AdlDigipassService;
  private adlSecureMessaging: AdlSecureMessagingService;
  private service: NotificationsService;

  public getNotificationInfo(
    notificationId: string,
    db
  ): Observable<NotificationResponse> {
    const notificationResponse: NotificationResponse = {
      content: [
        {
          id: '00525900h45323493398',
          title: 'Este es tu código para autorizar la inscripción de contacto',
          message:
            'Este código lo veraz reflejado en tu Banca Virtual para aprobar y continuar con la transacción',
          date: '2021-08-11T15:25:29',
          read: true,
          isTransaction: false,
          qrCode: '321312323',
          timestamp: '2024-12-24T09:40:30',
          token: '13123',
          notificationType: NotificationMailboxEnum.DEFAULT
        },
        {
          id: '****2773',
          title: 'Transacción por Autorizar',
          message:
            '00C15FE262367C92D5D2B8F56D7DABE90925D35ED1D7A07668CBBF6CB5946767E0C7E670F9627DB7CA39AEC609FF993FD01DA711D26B3C18372F07F9BDA7809E35FB835CBD25F20F981B561C230AAC85E80CEADEE76DA78BA683FA32A26641F949C5856894CBFB24972B408518946AED231E9D81F19312F6D20C9AD0D35B4C69E3A1C9F86BCC8E7649E1F673FE14FF907715E0F1AFDA5B062465A1FCF4EEDF545CC24DF7E31D9073DD2174EF4981F21A819068DE8A79718E8DC90DB129E2588C9611DC31D345E26B3A01B8BD0C33CA62C6A64AE06D053454CAC732584BED976830AC207A0E4FBC1ED7482A904992ACC3F920C1BDC68875351141AA0FAE1BB1ACDDDA1FFAC539A877BED2B8EB6228E7C1CC60E825DC4822028F4C5D0F61BC7AEC9510D5DEAEC10D1395FBA174030F7CAD68771B125E2E1D36EBE028A1DD0062A2B6B23C5ED4B33CA8986C37762BC13F11D84D3A2AD0A7A7FA8222F2C569B3F9EF44A4219974DD0909616A7F02A66749A7ED35FC229FDDD3FD7DA658CC9FAC9E4FDFEE458780862D70A1A6FC86DE959D75A000525BAD4707D52B0194935292D171FDEC3C6C37BD37F1A398FA087BAE3A2F912910EE46378791F199E7B35E662B9D958A49BAA046D3D2247B',
          date: '2025-02-21T11:51:33',
          read: true,
          isTransaction: false,
          notificationType: NotificationMailboxEnum.PUSH
        }
      ]
    };
    return of(notificationResponse);
  }

  public async decryptNotificationMessage(message: string): Promise<any> {
    return Promise.resolve();
  }
}
