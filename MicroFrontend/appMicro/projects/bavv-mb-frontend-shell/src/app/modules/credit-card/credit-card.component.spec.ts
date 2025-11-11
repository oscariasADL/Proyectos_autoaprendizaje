import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardComponent } from './credit-card.component';
import { Router } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { AlertService } from '@app/commons/services/alert.service';
import { CustomEventService } from '@commons/services/custom-events.service';
import { AuthTimerService } from '@commons/services/auth-timer.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MICROFRONTEND_TOPICS,
  MOBILE_AVV_CHANNEL
} from '@commons/constants/microfrontend-events.constants';
import {
  DETAIL_HOUSING_MICROFRONTEND,
  REQUEST_PRODUCTS
} from '@app/commons/constants/navigate.constants';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;
  let customEventServiceSpy: jasmine.SpyObj<CustomEventService>;
  let authTimerServiceSpy: jasmine.SpyObj<AuthTimerService>;
  let facadeSpy: jasmine.SpyObj<AppFacade>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    customEventServiceSpy = jasmine.createSpyObj('CustomEventService', [
      'subscribeToCustomEvent',
      'publishCustomEvent',
      'clearStoredEvent'
    ]);
    authTimerServiceSpy = jasmine.createSpyObj('AuthTimerService', [
      'stopWatching'
    ]);
    facadeSpy = jasmine.createSpyObj('AppFacade', ['basicData$']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CreditCardComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CustomEventService, useValue: customEventServiceSpy },
        { provide: AuthTimerService, useValue: authTimerServiceSpy },
        { provide: AppFacade, useValue: facadeSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to events and initialize documentNumber', () => {
      facadeSpy.basicData$ = of({ documentNumber: '123456' });
      component.ngOnInit();
      expect(component.documentNumber).toBe('123456');
      expect(customEventServiceSpy.subscribeToCustomEvent).toHaveBeenCalledWith(
        MICROFRONTEND_TOPICS.HEART_BEAT
      );
      expect(customEventServiceSpy.subscribeToCustomEvent).toHaveBeenCalledWith(
        MICROFRONTEND_TOPICS.PRODUCT_SUMMARY
      );
      expect(customEventServiceSpy.subscribeToCustomEvent).toHaveBeenCalledWith(
        MICROFRONTEND_TOPICS.REDIRECT_TO_HOME_EVENT
      );
    });
  });

  describe('goBack', () => {
    it('should call alertService.create and publish exit event', async () => {
      alertServiceSpy.create.and.returnValue(Promise.resolve(true));

      await component.goBack();

      expect(alertServiceSpy.create).toHaveBeenCalled();
      expect(customEventServiceSpy.publishCustomEvent).toHaveBeenCalledWith(
        MICROFRONTEND_TOPICS.EXIT_EVENT,
        jasmine.objectContaining({
          documentNumber: component.documentNumber,
          currentDate: jasmine.any(String),
          path: DETAIL_HOUSING_MICROFRONTEND[0],
          channel: MOBILE_AVV_CHANNEL
        })
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(REQUEST_PRODUCTS);
    });

    it('should not call publishExitEvent or navigate if alert is canceled', async () => {
      alertServiceSpy.create.and.returnValue(Promise.resolve(false));

      await component.goBack();

      expect(customEventServiceSpy.publishCustomEvent).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call clearStoredEvent on ngOnDestroy', () => {
      component.ngOnDestroy();
      expect(customEventServiceSpy.clearStoredEvent).toHaveBeenCalled();
    });
  });
});
