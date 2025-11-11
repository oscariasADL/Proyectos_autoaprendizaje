import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { NavController, Platform } from '@ionic/angular';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import {
  HOME,
  MOVEMENTS_DETAIL,
  POCKETS_DETAIL,
  PRODUCTS,
  PRODUCT_DETAIL
} from '../constants/navigate.constants';
import { AlertService } from './alert.service';
import { BackButtonService } from './back-button.service';

describe('BackButtonService', () => {
  let service: BackButtonService;
  let platformReadySpy, platformSpy, backButton, navControlSpy, routerSpy;

  beforeEach(() => {
    platformReadySpy = Promise.resolve();
    backButton = {
      subscribeWithPriority: (priority, fn) => {
        fn();
      }
    };
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'pop'
    ]);
    platformSpy = jasmine.createSpyObj(
      'Platform',
      {
        ready: platformReadySpy,
        backButton: platformReadySpy
      },
      { backButton }
    );
    routerSpy = jasmine.createSpyObj('Router', ['url']);
    TestBed.configureTestingModule({
      providers: [
        BackButtonService,
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: AppFacade, useClass: AppFacadeMock },
        { provide: NavController, useValue: navControlSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BackButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call listenBackButton', () => {
    routerSpy.url = PRODUCT_DETAIL.toString();
    expect(service.listenBackButton()).toBeUndefined();
    routerSpy.url = MOVEMENTS_DETAIL.toString();
    expect(service.listenBackButton()).toBeUndefined();
    routerSpy.url = PRODUCTS.toString();
    expect(service.listenBackButton()).toBeUndefined();
    routerSpy.url = POCKETS_DETAIL.toString();
    expect(service.listenBackButton()).toBeUndefined();
    routerSpy.url = HOME.toString();
    expect(service.listenBackButton()).toBeUndefined();
  });
  it('should return early when platform.backButton is undefined', () => {
    routerSpy.url = HOME.toString();
    Object.defineProperty(platformSpy, 'backButton', { value: undefined });

    expect(() => {
      service.listenBackButton();
    }).not.toThrow();
  });
});
