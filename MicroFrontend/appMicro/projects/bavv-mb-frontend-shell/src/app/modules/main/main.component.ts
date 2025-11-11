import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  CDT_MICROFRONTEND_EVENTS,
  CDTEventsActions,
  MICROFRONTEND_TOPICS
} from '@commons/constants/microfrontend-events.constants';
import { EventType } from '@commons/entities/analytics/events.entities';
import { trackEvents } from '@commons/helpers/event.helpers';
import { AuthTimerService } from '@commons/services/auth-timer.service';
import { CustomEventService } from '@commons/services/custom-events.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  constructor(
    private customEventService: CustomEventService,
    private authTimerService: AuthTimerService,
    private facade: AppFacade
  ) {}

  ngOnInit(): void {
    this.initProductSummaryEvent();
    this.initHeartBeatEvent();
  }

  private initProductSummaryEvent() {
    this.customEventService
      .subscribeToCustomEvent(MICROFRONTEND_TOPICS.PRODUCT_SUMMARY)
      .subscribe(
        ({ topicValue }) => {
          trackEvents(
            topicValue.productResult === 'Error'
              ? CDT_MICROFRONTEND_EVENTS.error
              : CDT_MICROFRONTEND_EVENTS.success,
            CDTEventsActions.RESPONSE_DATA_FROM_MICROFRONTEND_CDT,
            EventType.DataToMicrofrontend
          );
        },
        { readStoredMessage: false, onlyOnce: true }
      );
  }

  private initHeartBeatEvent() {
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
}
