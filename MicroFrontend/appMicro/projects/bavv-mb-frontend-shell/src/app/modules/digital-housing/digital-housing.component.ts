import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import {
  DETAIL_HOUSING_MICROFRONTEND,
  HOME,
  REQUEST_PRODUCTS
} from '@app/commons/constants/navigate.constants';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';
import { EventType } from '@app/commons/entities/analytics/events.entities';
import { trackEvents } from '@app/commons/helpers/event.helpers';
import { AlertService } from '@app/commons/services/alert.service';
import {
  DIGITAL_HOUSING_MICROFRONTEND_EVENTS,
  DigitalHousingActions,
  MICROFRONTEND_TOPICS,
  MOBILE_AVV_CHANNEL
} from '@commons/constants/microfrontend-events.constants';
import { AuthTimerService } from '@commons/services/auth-timer.service';
import { CustomEventService } from '@commons/services/custom-events.service';
import { environment as ENV } from '@environment';
import { format } from 'date-fns';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-digital-housing',
  templateUrl: './digital-housing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalHousingComponent implements OnInit, OnDestroy {
  options: WebComponentWrapperOptions = {
    type: 'script',
    remoteEntry: ENV.microfrontends.digitalHousing.remoteEntryUrl,
    exposedModule: ENV.microfrontends.digitalHousing.exposedModule,
    remoteName: ENV.microfrontends.digitalHousing.remoteName,
    elementName: ENV.microfrontends.digitalHousing.elementName
  };

  documentNumber: string = '';
  constructor(
    private customEventService: CustomEventService,
    private authTimerService: AuthTimerService,
    private facade: AppFacade,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.waitForHeartBeatEvent();
    this.waitForMFEExitEvent();
    this.waitForProductSummaryEvent();

    this.facade.basicData$
      .pipe(
        filter((basicData) => !!basicData),
        take(1)
      )
      .subscribe(({ documentNumber }) => {
        this.documentNumber = documentNumber;
      });
  }

  ngOnDestroy(): void {
    this.customEventService.clearStoredEvent();
  }

  public async goBack() {
    const DIGITAL_HOUSING_EXIT_DATA: AlertSheetProperties = {
      type: AlertSheetType.question,
      icon: 'billete.svg',
      id: 'digital-housing-confirm-exit-alert',
      title: 'DIGITAL_HOUSING.EXIT_ALERT.TITLE',
      description: 'DIGITAL_HOUSING.EXIT_ALERT.DESCRIPTION',
      buttons: [
        'DIGITAL_HOUSING.EXIT_ALERT.BUTTON_OK',
        'DIGITAL_HOUSING.EXIT_ALERT.BUTTON_CANCEL'
      ]
    };
    const response = await this.alertService.create(DIGITAL_HOUSING_EXIT_DATA);

    if (!response) {
      this.publishExitEvent();
      this.router.navigate(REQUEST_PRODUCTS);
    }
  }

  private waitForHeartBeatEvent() {
    this.customEventService
      .subscribeToCustomEvent(MICROFRONTEND_TOPICS.HEART_BEAT)
      .subscribe(
        () => {
          this.facade.dispatchPing();
          this.authTimerService.stopWatching();
        },
        { readStoredMessage: false, onlyOnce: false }
      );
  }

  private waitForProductSummaryEvent() {
    this.customEventService
      .subscribeToCustomEvent(MICROFRONTEND_TOPICS.PRODUCT_SUMMARY)
      .subscribe(
        ({ topicValue }) => {
          trackEvents(
            topicValue.productResult === 'Error'
              ? DIGITAL_HOUSING_MICROFRONTEND_EVENTS.error
              : DIGITAL_HOUSING_MICROFRONTEND_EVENTS.success,
            DigitalHousingActions.RESPONSE_DATA_FROM_MICROFRONTEND_DIGITAL_HOUSING,
            EventType.DataToMicrofrontend
          );
        },
        { readStoredMessage: false, onlyOnce: true }
      );
  }

  private waitForMFEExitEvent() {
    this.customEventService
      .subscribeToCustomEvent(MICROFRONTEND_TOPICS.REDIRECT_TO_HOME_EVENT)
      .subscribe(
        () => {
          trackEvents(
            DIGITAL_HOUSING_MICROFRONTEND_EVENTS.redirectToHomeEvent,
            DigitalHousingActions.REDIRECT_TO_HOME_EVENT,
            EventType.DataToMicrofrontend
          );
          this.router.navigate(HOME);
        },
        { readStoredMessage: false, onlyOnce: false }
      );
  }

  private publishExitEvent() {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

    this.customEventService.publishCustomEvent(
      MICROFRONTEND_TOPICS.EXIT_EVENT,
      {
        documentNumber: this.documentNumber,
        currentDate: formattedDate,
        path: DETAIL_HOUSING_MICROFRONTEND[0],
        channel: MOBILE_AVV_CHANNEL
      }
    );
    trackEvents(
      DIGITAL_HOUSING_MICROFRONTEND_EVENTS.exit,
      DigitalHousingActions.EXIT_FROM_MICROFRONTEND_DIGITAL_HOUSING,
      EventType.DataToMicrofrontend
    );
  }
}
