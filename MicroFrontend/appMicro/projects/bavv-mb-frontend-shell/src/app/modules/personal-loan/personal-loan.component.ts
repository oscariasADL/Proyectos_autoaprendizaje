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
  PERSONAL_LOAN_MICROFRONTEND,
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
  PERSONAL_LOAN_MICROFRONTEND_EVENTS,
  PersonalLoanActions,
  MICROFRONTEND_TOPICS,
  MOBILE_AVV_CHANNEL
} from '@commons/constants/microfrontend-events.constants';
import { AuthTimerService } from '@commons/services/auth-timer.service';
import { CustomEventService } from '@commons/services/custom-events.service';
import { environment as ENV } from '@environment';
import { format } from 'date-fns';
import { filter, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-personal-loan',
  templateUrl: './personal-loan.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalLoanComponent implements OnInit, OnDestroy {
  options: WebComponentWrapperOptions = {
    type: 'script',
    remoteEntry: ENV.microfrontends.personalLoan.remoteEntryUrl,
    exposedModule: ENV.microfrontends.personalLoan.exposedModule,
    remoteName: ENV.microfrontends.personalLoan.remoteName,
    elementName: ENV.microfrontends.personalLoan.elementName
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
    const PERSONAL_LOAN_EXIT_DATA: AlertSheetProperties = {
      type: AlertSheetType.question,
      icon: 'billete.svg',
      id: 'personal-loan-confirm-exit-alert',
      title: 'PERSONAL_LOAN.EXIT_ALERT.TITLE',
      description: 'PERSONAL_LOAN.EXIT_ALERT.DESCRIPTION',
      buttons: [
        'PERSONAL_LOAN.EXIT_ALERT.BUTTON_OK',
        'PERSONAL_LOAN.EXIT_ALERT.BUTTON_CANCEL'
      ]
    };
    const response = await this.alertService.create(PERSONAL_LOAN_EXIT_DATA);

    if (!response) {
      this.publishExitEvent();
      this.router.navigate(REQUEST_PRODUCTS);
    }
  }

  private waitForHeartBeatEvent() {
    const heartBeatSubs = this.customEventService
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
              ? PERSONAL_LOAN_MICROFRONTEND_EVENTS.error
              : PERSONAL_LOAN_MICROFRONTEND_EVENTS.success,
            PersonalLoanActions.RESPONSE_DATA_FROM_MICROFRONTEND_PERSONAL_LOAN,
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
            PERSONAL_LOAN_MICROFRONTEND_EVENTS.redirectToHomeEvent,
            PersonalLoanActions.REDIRECT_TO_HOME_EVENT,
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
        path: PERSONAL_LOAN_MICROFRONTEND[0],
        channel: MOBILE_AVV_CHANNEL
      }
    );
    trackEvents(
      PERSONAL_LOAN_MICROFRONTEND_EVENTS.exit,
      PersonalLoanActions.EXIT_FROM_MICROFRONTEND_PERSONAL_LOAN,
      EventType.DataToMicrofrontend
    );
  }
}
