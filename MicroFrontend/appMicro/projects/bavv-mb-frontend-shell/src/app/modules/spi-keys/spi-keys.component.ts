import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools/lib/web-components/web-component-wrapper';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { combineLatest, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { AppFacade } from '@app/app.facade';
import { avalBanks } from '@app/commons/constants/aval-banks.constans';
import { BANK_GROUP } from '@app/commons/constants/card.constants';
import { channels } from '@app/commons/constants/channels.constants';
import {
  BRE_B_TRANSFERS,
  CARE_CHANNELS,
  HOME
} from '@app/commons/constants/navigate.constants';
import {
  EventBus,
  EventDriven
} from '@avaldigitallabs/adl-commons-lib-frontend-event-bus';
import { environment as ENV } from '@environment';
import { fetchProductSpiUserKeysAction } from '@app/modules/product/store/product.actions';
import { SpiKeyTransferResponse } from '@modules/home/entities/spi-channel.entities';
import { BreBContactSelectedResponse } from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';

@Component({
  selector: 'app-spi-keys-mf',
  templateUrl: './spi-keys.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./spi-keys.component.sass']
})
export class SpiKeysMFComponent implements OnInit, OnDestroy {
  private eventBus = EventBus.getInstance(
    false,
    EventDriven.CustomEvent | EventDriven.PostMessage
  );
  private spiSessionTopic = this.eventBus.accessTopic('spiSessionTopic');
  private spiCloseSession = this.eventBus.accessTopic('spiCloseSesion');
  private spiGoPqrs = this.eventBus.accessTopic('spiCustomerSupport');
  private spiKeyTransfer = this.eventBus.accessTopic('spiKeyTransfer');
  private selectedContactInBreB = this.eventBus.accessTopic(
    'selectedContactInBreB'
  );
  private userDataSubscription: Subscription;
  options: WebComponentWrapperOptions = {
    type: 'script',
    remoteEntry: ENV.microfrontends.spiKeys.remoteEntryUrl,
    exposedModule: ENV.microfrontends.spiKeys.exposedModule,
    remoteName: ENV.microfrontends.spiKeys.remoteName,
    elementName: ENV.microfrontends.spiKeys.elementName
  };

  constructor(
    private facade: AppFacade,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.userDataSubscription = combineLatest({
      userData: this.facade.userData$,
      complementaryServices: this.facade.complementaryServicesState$
    }).subscribe({
      next: ({ userData, complementaryServices }) => {
        const decoded = jwtDecode(userData.token);
        const routeTo = this.route.snapshot.queryParamMap.get('routeTo');
        const key = this.route.snapshot.queryParamMap.get('key');

        this.spiSessionTopic.publish(
          {
            token: decoded.jti ?? decoded.sub,
            entity: avalBanks.BAVV.name,
            channel: channels.mb,
            entityCode: BANK_GROUP.VILLAS_CODE,
            entityNit: avalBanks.BAVV.nit,
            ipAddress: userData.dataBasicClientDto.ip,
            date: new Date().toISOString(),
            complementaryServices: complementaryServices,
            path: {
              ...(routeTo && { routeTo }),
              ...(key && { data: { key } })
            }
          },
          true
        );
      }
    });

    this.spiCloseSession.subscribe((topicDetail) => {
      if (topicDetail.topicValue && topicDetail.topicValue.action === 'exit') {
        this.facade.dispatch([fetchProductSpiUserKeysAction()]);
        this.navCtrl.navigateForward(HOME);
      }
    });

    this.spiGoPqrs.subscribe((topicDetail) => {
      if (topicDetail.topicValue) {
        this.navCtrl.navigateForward(CARE_CHANNELS);
      }
    });

    this.selectedContactInBreB.subscribe(
      (topicDetail) => {
        const topicValue: BreBContactSelectedResponse = topicDetail.topicValue;
        void this.navCtrl.navigateForward(BRE_B_TRANSFERS, {
          queryParams: {
            spiKey: topicValue?.selectedContactKey,
            isFavoriteContact: topicValue?.isFav
          }
        });
      },
      { onlyOnce: true }
    );

    this.spiKeyTransfer.subscribe(
      (spiKeyTransferResponse: SpiKeyTransferResponse) => {
        const spiKey = spiKeyTransferResponse.topicValue?.keyValue;
        const isSavedContact =
          spiKeyTransferResponse.topicValue?.isSavedContact;

        const queryParams = {
          ...(spiKey && { spiKey }),
          ...(isSavedContact && { isSavedContact })
        };
        void this.navCtrl.navigateRoot(BRE_B_TRANSFERS, { queryParams });
      }
    );
  }
  ngOnDestroy(): void {
    this.spiCloseSession.unsubscribe();
    this.spiGoPqrs.unsubscribe();
    this.spiSessionTopic.unsubscribe();
    this.userDataSubscription.unsubscribe();
    this.spiKeyTransfer.unsubscribe();
    this.selectedContactInBreB.unsubscribe();
  }
}
