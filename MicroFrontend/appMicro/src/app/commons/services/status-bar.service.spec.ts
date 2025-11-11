import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { StatusBarType } from '@commons/entities/header/status-bar.interface';
import { TestingModule } from '@testing/testing.module';
import { ReplaySubject } from 'rxjs';
import {
  HOME,
  LOGIN,
  PRODUCT_DETAIL,
  PRODUCTS,
  REGISTER
} from '../constants/navigate.constants';
import { StatusBarService } from './status-bar.service';
import { PluginListenerHandle } from '@capacitor/core';
import {
  StyleOptions,
  StatusBarInfo,
  BackgroundColorOptions,
  AnimationOptions,
  SetOverlaysWebViewOptions
} from '@capacitor/status-bar';

describe('StatusBarService', () => {
  let service: StatusBarService;
  const eventSubject = new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable(),
    url: 'container',
    routerState: { snapshot: { url: PRODUCTS.toString() } }
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [StatusBarService, { provide: Router, useValue: routerMock }]
    })
  );

  beforeEach(() => {
    service = TestBed.inject(StatusBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be setStatusbar', () => {
    spyOnProperty(service, 'isPluginAvailable').and.returnValue(true);

    spyOnProperty(service, 'statusBar').and.returnValue({
      getInfo(): Promise<StatusBarInfo> {
        return Promise.resolve(undefined);
      },
      hide(options?: AnimationOptions): Promise<void> {
        return Promise.resolve(undefined);
      },
      setBackgroundColor(options: BackgroundColorOptions): Promise<void> {
        return Promise.resolve(undefined);
      },
      setOverlaysWebView(options: SetOverlaysWebViewOptions): Promise<void> {
        return Promise.resolve(undefined);
      },
      setStyle(options: StyleOptions): Promise<void> {
        return Promise.resolve(undefined);
      },
      show(options?: AnimationOptions): Promise<void> {
        return Promise.resolve(undefined);
      }
    });

    for (const key of Object.keys(StatusBarType)) {
      expect(service.setStatusbar(StatusBarType[key])).toBeUndefined();
    }
  });

  it('should be call listenRouterEvents', async () => {
    spyOn(service, 'setStatusbar').and.returnValue();
    eventSubject.next(new NavigationEnd(1, 'container', 'container'));
    service.listenRouterEvents();
    expect(service.listenRouterEvents()).toBeUndefined();
  });

  it('should be call statusBarType', async () => {
    expect((service as any).statusBarType(REGISTER)).toEqual(
      StatusBarType.white
    );
    expect((service as any).statusBarType(REGISTER.toString())).toEqual(
      StatusBarType.white
    );
    expect((service as any).statusBarType(LOGIN)).toEqual(StatusBarType.black);
    expect((service as any).statusBarType(LOGIN.toString())).toEqual(
      StatusBarType.black
    );
    expect((service as any).statusBarType(PRODUCT_DETAIL)).toEqual(
      StatusBarType.red
    );
    expect((service as any).statusBarType(HOME.toString())).toEqual(
      StatusBarType.red
    );
  });

  it('should to get isPluginAvailable', () => {
    expect(service.isPluginAvailable).toBeFalse();
  });
});
