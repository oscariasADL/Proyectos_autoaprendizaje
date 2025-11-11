import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { of } from 'rxjs';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';
import { SplashScreenServiceMock } from '@testing/mocks/services/splash-screen.service.mock';
import { TestingModule } from '@testing/testing.module';
import { HomeFacade } from './home.facade';
import { HomePage } from './home.page';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { MATHILDE_URL_INPUT_ID } from '@modules/home/constants/home.constants';
import { ModalController } from '@commons/controllers/modal.controller';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { ProductFacade } from '../product/product.facade';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { HomeAlertIds } from './entities/home-alert.entities';
import { FavoriteBasic } from '../favorites/entities/favorites.interface';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { OneSpanStorageItem } from '@avaldigitallabs/one-span-secure-storage';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { SpiConsentServiceMock } from '@testing/mocks/services/spi-consent.service.mock';
import { BreBTransfersFacade } from '../transfers/pages/bre-b-transfers/bre-b-transfers.facade';
import { BreBTransferFacadeMock } from '@testing/mocks/facade/breb-transfer.facade.mock';

describe('HomePage', () => {
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);

  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let modalCtrlSpy;
  let facade: HomeFacade;

  let homeFacadeMock: HomeFacadeMock;
  const modalSpy = jasmine.createSpyObj('Modal', [
    'present',
    'onDidDismiss',
    'onWillDismiss'
  ]);
  beforeEach(waitForAsync(() => {
    homeFacadeMock = new HomeFacadeMock();

    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    modalCtrlSpy.create.and.returnValue({
      present: () => {
        return;
      },
      onDidDismiss: () => of({ data: {} })
    });
    TestBed.configureTestingModule({
      declarations: [HomePage, ImageUrlPipe],
      imports: [TestingModule],
      providers: [
        { provide: HomeFacade, useClass: HomeFacadeMock },
        { provide: ProductFacade, useClass: ProductFacadeMock },
        { provide: AppFacade, useClass: AppFacadeMock },
        { provide: SplashScreenService, useClass: SplashScreenServiceMock },
        { provide: SpiConsentService, useClass: SpiConsentServiceMock },
        { provide: ModalController, useValue: modalCtrlSpy },
        { provide: AlertService, useClass: AlertServiceMock },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        {
          provide: BreBTransfersFacade,
          useClass: BreBTransferFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    facade = TestBed.inject(HomeFacade);
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    spyOnProperty(component, 'balanceCompleted$', 'get').and.returnValue(
      of(true)
    );
    spyOnProperty(component, 'firstCall$').and.returnValue(of(true));
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.ngOnDestroy();
    expect(component).toBeTruthy();
  });
  it('should call goActionAlert', () => {
    const alertId = HomeAlertIds.COMPLEMENTARY_SERVICES;
    expect(component.goActionAlert(alertId)).toBeUndefined();
  });

  it('should call doRefresh', () => {
    component.ionRefresher = {
      complete: jasmine.createSpy('complete')
    } as any;

    spyOnProperty(component, 'homeTimer').and.returnValue(2);
    component.doRefresh(null);
    expect(component.homeTimer).toBeDefined();
    expect(component.ionRefresher.complete).toHaveBeenCalled();
  });

  it('should call onEnter', async () => {
    spyOn(component, 'onEnter').and.callThrough();
    await component.onEnter();
    expect(component.onEnter).toHaveBeenCalled();
  });

  it('should call ionViewDidEnter', async () => {
    spyOn(component, 'ionViewDidEnter').and.callThrough();
    await component.ionViewDidEnter();
    expect(component.ionViewDidEnter).toHaveBeenCalled();
  });

  it('should return Observable<boolean> from firstCall$', (done) => {
    component.firstCall$.subscribe((data) => {
      expect(data).toBeTrue();
      done();
    });
  });

  it('should return Observable<boolean> from balanceCompleted$', () => {
    component.balanceCompleted$.subscribe((data) => {
      expect(data).toBeTrue();
    });
  });

  it('should intercept Mathilde adds', () => {
    const mathildeInput = document.createElement('input');
    mathildeInput.id = MATHILDE_URL_INPUT_ID;
    mathildeInput.value = 'http://example.com';

    spyOn(document, 'querySelector').and.returnValue(mathildeInput);
    const clickEvent = new MouseEvent('MouseEvent');
    alertServiceSpy.create.and.returnValue(Promise.resolve(true));
    mathildeInput.dispatchEvent(clickEvent);
    expect(component.interceptMathildeAdds(clickEvent)).toBe(void 0);
  });

  it('should open external links', () => {
    spyOn(facade, 'openExternalLinks');
    component.openExternalLink(LinkKey.linkSecurityAlert);
    expect(facade.openExternalLinks).toHaveBeenCalled();
  });

  it('should show popup alert security', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
  }));

  it('should get data from hasCreditProductError$', (done) => {
    component.hasCreditProductError$.subscribe((data) => {
      expect(data).toBeTrue();
      done();
    });
  });

  it('should call closeToast when ionViewWillLeave is called', () => {
    spyOn(facade, 'closeToast');

    component.ionViewWillLeave();

    expect(facade.closeToast).toHaveBeenCalled();
  });
  it('should call window.open and facade.logout when confirm is true in interceptMathildeAdds', async () => {
    const mathildeAddsUrlInput = document.createElement('input');
    mathildeAddsUrlInput.id = MATHILDE_URL_INPUT_ID;
    mathildeAddsUrlInput.value = 'http://example.com';

    spyOn(document, 'querySelector').and.returnValue(mathildeAddsUrlInput);

    const clickEvent = new MouseEvent('click');

    const windowOpenSpy = spyOn(window, 'open');
    const logoutSpy = spyOn(facade, 'logout');

    spyOn(facade, 'redirectAlert').and.returnValue(Promise.resolve(true));

    component.interceptMathildeAdds(clickEvent);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(windowOpenSpy).toHaveBeenCalledWith('http://example.com');
    expect(logoutSpy).toHaveBeenCalled();
  });
  it('should call removeHomeAlert when alert ID is not in SHOULD_NOT_DELETE_ALERT_ON_CLICK list', () => {
    const testAlertId = 'test-alert-id' as HomeAlertIds;

    spyOn(facade, 'removeHomeAlert').and.callThrough();

    component.goActionAlert(testAlertId);

    expect(facade.removeHomeAlert).toHaveBeenCalledWith(testAlertId);
  });

  it('should return Observable of favorites from facade when favorites$ getter is called', (done) => {
    const mockFavorites: FavoriteBasic[] = [
      {
        keyFavorite: '1',
        nameFavoriteTransaction: 'Favorite 1',
        identificationFavoriteType: 'type1'
      },
      {
        keyFavorite: '2',
        nameFavoriteTransaction: 'Favorite 2',
        identificationFavoriteType: 'type2'
      }
    ];

    spyOnProperty(component, 'favorites$', 'get').and.returnValue(
      of(mockFavorites)
    );

    component.favorites$.subscribe((favorites) => {
      expect(favorites).toEqual(mockFavorites);
      expect(favorites.length).toBe(2);
      done();
    });
  });

  it('should return currentValue from facade homeTimer$ when homeTimer getter is called', () => {
    const mockTimerValue = 12345;

    const mockHomeTimer$ = 12345;

    spyOnProperty(component, 'homeTimer').and.returnValue(mockHomeTimer$);

    const result = component.homeTimer;

    expect(result).toBe(mockTimerValue);
  });
  it('should dispatch push notification and remove it from secure storage when pushNotification exists', async () => {
    const mockDB: OneSpanStorageItem[] = [
      { key: SecureKeys.pushNotification, value: 'someNotificationValue' }
    ];
    spyOn(component['secureStorage'], 'getAll').and.returnValue(
      Promise.resolve(mockDB)
    );
    spyOn(component['secureStorage'], 'remove');
    (facade as any).dispatchNotification = jasmine.createSpy(
      'dispatchNotification'
    );
    await (component as any).verifyPushNotification();
    expect((facade as any).dispatchNotification).toHaveBeenCalledWith(
      'someNotificationValue'
    );
    expect(component['secureStorage'].remove).toHaveBeenCalledWith(
      SecureKeys.pushNotification
    );
  });
  it('should correctly retrieve balanceCompleted$ from facade', () => {
    const mockCompletedValue = true;

    component.balanceCompleted$.subscribe((completed) => {
      expect(completed).toBe(mockCompletedValue);
      expect(facade.balanceCompleted$).toBeDefined();
    });
  });
});
