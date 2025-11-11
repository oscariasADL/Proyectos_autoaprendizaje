import { Injectable } from '@angular/core';
import {
  EventBus,
  EventDriven
} from '@avaldigitallabs/adl-commons-lib-frontend-event-bus';

@Injectable({
  providedIn: 'root'
})
export class CustomEventService {
  private eventBus: EventBus;
  private productTopic: any;

  constructor() {
    this.eventBus = EventBus.getInstance(
      false,
      EventDriven.CustomEvent | EventDriven.PostMessage
    );
  }

  public publishCustomEvent(eventName: string, detail: object): void {
    this.productTopic = this.eventBus.accessTopic(eventName);
    this.productTopic.publish(detail, true);
  }

  public subscribeToCustomEvent(eventName: string) {
    this.productTopic = this.eventBus.accessTopic(eventName);
    return this.productTopic;
  }

  public clearStoredEvent(): void {
    if (this.productTopic) {
      this.productTopic.clearStoredTopic();
    }
  }
}
