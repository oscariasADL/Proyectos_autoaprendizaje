import { TestBed } from '@angular/core/testing';
import { EventBus } from '@avaldigitallabs/adl-commons-lib-frontend-event-bus';
import { CustomEventService } from './custom-events.service';

describe('CustomEventService', () => {
  let service: CustomEventService;
  let eventBus: EventBus;
  let productTopic: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEventService);
    eventBus = EventBus.getInstance();
    productTopic = {
      publish: jasmine.createSpy('publish'),
      clearStoredTopic: jasmine.createSpy('clearStoredTopic')
    };
    spyOn(eventBus, 'accessTopic').and.returnValue(productTopic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should publish custom event', () => {
    const eventName = 'testEvent';
    const detail = { key: 'value' };
    service.publishCustomEvent(eventName, detail);
    expect(eventBus.accessTopic).toHaveBeenCalledWith(eventName);
    expect(productTopic.publish).toHaveBeenCalledWith(detail, true);
  });

  it('should subscribe to custom event', () => {
    const eventName = 'testEvent';
    const topic = service.subscribeToCustomEvent(eventName);
    expect(eventBus.accessTopic).toHaveBeenCalledWith(eventName);
    expect(topic).toBe(productTopic);
  });

  it('should clear stored event', () => {
    service.publishCustomEvent('testEvent', {});
    service.clearStoredEvent();
    expect(productTopic.clearStoredTopic).toHaveBeenCalled();
  });

  it('should not clear stored event if no topic', () => {
    service.clearStoredEvent();
    expect(productTopic.clearStoredTopic).not.toHaveBeenCalled();
  });
});
