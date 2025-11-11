import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpiKeysMFComponent } from './spi-keys.component';
import { AppFacade } from '@app/app.facade';
import { NavController } from '@ionic/angular';
import { EventBus } from '@avaldigitallabs/adl-commons-lib-frontend-event-bus';
import { BANK_GROUP } from '@app/commons/constants/card.constants';
import { HOME } from '@app/commons/constants/navigate.constants';
import { BehaviorSubject } from 'rxjs';
import { environment as ENV } from '@environment';

describe('SpiKeysMFComponent', () => {
  let component: SpiKeysMFComponent;
  let fixture: ComponentFixture<SpiKeysMFComponent>;
  let facadeMock: jasmine.SpyObj<AppFacade>;
  let navControllerMock: jasmine.SpyObj<NavController>;
  let eventBusSpy: jasmine.SpyObj<EventBus>;
  let mockTopicSpi: any;
  let mockTopicClose: any;

  const mockUserData = {
    token: 'mock-token',
    dataBasicClientDto: {
      ip: '192.168.1.1'
    }
  };

  const mockComplementaryServices = {
    service1: 'value1'
  };

  beforeEach(async () => {
    facadeMock = jasmine.createSpyObj('AppFacade', [], {
      userData$: new BehaviorSubject(mockUserData),
      complementaryServicesState$: new BehaviorSubject(
        mockComplementaryServices
      )
    });

    navControllerMock = jasmine.createSpyObj('NavController', [
      'navigateForward'
    ]);

    mockTopicSpi = {
      publish: jasmine.createSpy('publish'),
      unsubscribe: jasmine.createSpy('unsubscribe')
    };

    mockTopicClose = {
      subscribe: jasmine.createSpy('subscribe'),
      unsubscribe: jasmine.createSpy('unsubscribe')
    };

    eventBusSpy = jasmine.createSpyObj('EventBus', ['accessTopic']);
    eventBusSpy.accessTopic.and.callFake((topic: string) => {
      if (topic === 'spiSessionTopic') return mockTopicSpi;
      if (topic === 'spiCloseSesion') return mockTopicClose;
      return null;
    });

    spyOn(EventBus, 'getInstance').and.returnValue(eventBusSpy);

    await TestBed.configureTestingModule({
      declarations: [SpiKeysMFComponent],
      providers: [
        { provide: AppFacade, useValue: facadeMock },
        { provide: NavController, useValue: navControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpiKeysMFComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize EventBus topics on construction', () => {
    expect(EventBus.getInstance).toHaveBeenCalledWith(true);
    expect(eventBusSpy.accessTopic).toHaveBeenCalledWith('spiSessionTopic');
    expect(eventBusSpy.accessTopic).toHaveBeenCalledWith('spiCloseSesion');
  });

  it('should publish session data when user data and complementary services are available', () => {
    const expectedDate = jasmine.any(String);

    fixture.detectChanges();

    expect(mockTopicSpi.publish).toHaveBeenCalledWith(
      {
        token: mockUserData.token,
        entity: 'bavv',
        channel: 'MB',
        entityCode: BANK_GROUP.VILLAS_CODE,
        entityNit: '860035827-5',
        ipAddress: mockUserData.dataBasicClientDto.ip,
        date: expectedDate,
        complementaryServices: mockComplementaryServices
      },
      true
    );
  });

  it('should navigate to HOME when receiving close session event', () => {
    const subscribeCallback =
      mockTopicClose.subscribe.calls.mostRecent().args[0];

    subscribeCallback({ topicValue: { action: 'exit' } });

    expect(navControllerMock.navigateForward).toHaveBeenCalledWith(HOME);
  });

  it('should not navigate when receiving close session event with different action', () => {
    const subscribeCallback =
      mockTopicClose.subscribe.calls.mostRecent().args[0];

    subscribeCallback({ topicValue: { action: 'other' } });

    expect(navControllerMock.navigateForward).not.toHaveBeenCalled();
  });

  it('should unsubscribe from topics on destroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();

    expect(mockTopicSpi.unsubscribe).toHaveBeenCalled();
    expect(mockTopicClose.unsubscribe).toHaveBeenCalled();
  });

  it('should have correct WebComponentWrapperOptions configuration', () => {
    expect(component.options.type).toBe('script');
    expect(component.options).toEqual({
      type: 'script',
      remoteEntry: ENV.microfrontends.spiKeys.remoteEntryUrl,
      exposedModule: ENV.microfrontends.spiKeys.exposedModule,
      remoteName: ENV.microfrontends.spiKeys.remoteName,
      elementName: ENV.microfrontends.spiKeys.elementName
    });
  });
});
