import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfigService } from '@commons/services/config.service';
import { DownloadFacade } from '@commons/components/download/download.facade';
import { ShareFacade } from '@commons/components/share/share.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { DownloadFacadeMock } from '@testing/mocks/facade/download.facade.mock';
import { ShareFacadeMock } from '@testing/mocks/facade/share.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { of } from 'rxjs';

import { AlertSheetComponent } from './alert-sheet.component';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { IdentificationFavoriteType } from '@modules/favorites/entities/favorites.interface';
import { StoreModule } from '@ngrx/store';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductFactory } from '@testing/factories/product.factory';

describe('AlertSheetComponent', () => {
  let component: AlertSheetComponent;
  let fixture: ComponentFixture<AlertSheetComponent>;
  let downloadFacade: DownloadFacade;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);
  const modalSpy = jasmine.createSpyObj('Modal', [
    'present',
    'onDidDismiss',
    'onWillDismiss'
  ]);
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', [
    'create',
    'dismiss'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AlertSheetComponent, ImageUrlPipe],
      imports: [
        IonicModule,
        HttpClientTestingModule,
        TestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        {
          provide: ShareFacade,
          useClass: ShareFacadeMock
        },
        {
          provide: DownloadFacade,
          useClass: DownloadFacadeMock
        },
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        },
        {
          provide: ConfigService,
          useValue: {
            fetchIP: () => of('123.45.45.3')
          }
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertSheetComponent);
    component = fixture.componentInstance;
    component.props = {
      type: AlertSheetType.error,
      id: '',
      icon: '',
      title: '',
      description: '',
      reference: '',
      items: [
        {
          id: 'from',
          label: '',
          fields: ['']
        }
      ],
      message: '',
      buttons: [],
      buttonsAction: [],
      buttonIconLink: '',
      allowShare: false,
      denyDownload: false,
      itemList: [],
      checkText: '',
      panelKey: '',
      componentType: AlertComponentType.alertCenter,
      cssClass: '',
      favoritesData: {
        type: IdentificationFavoriteType.RECHARGE,
        data: {
          productOrigin: {
            accountType: TypeAccount.SDA,
            accountId: '7465383637',
            availableBalance: 7000000,
            typeName: 'Cuenta ahorr',
            numberProduct: '7456345353'
          },
          mobileOperator: 'CLARO',
          amount: 10000,
          phoneNumber: '3145679834'
        }
      },
      isFavoriteSpiContact: false
    };
    component.showFavoriteNameField = false;
    const div = document.createElement('DIV');
    div.id = 'voucher-download';
    document.body.appendChild(div);

    const canvas = document.createElement('canvas');
    spyOn<any>(component, 'getImageFile').and.returnValue(
      Promise.resolve(canvas)
    );

    spyOn(component, 'getDoc').and.returnValue({
      internal: {
        pageSize: {
          getWidth: () => void 0,
          getHeight: () => void 0
        }
      },
      addImage: (a, b, c, d, e, f) => void 0,
      save: () => void 0,
      output: () => ''
    });

    downloadFacade = TestBed.inject(DownloadFacade);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be close the modal', async () => {
    expect(component.closeModal()).toBeUndefined();
  });

  it('should canBeFavorite()', () => {
    expect(component.canBeFavorite).toBeTruthy();
  });

  it('should isFavorite()', () => {
    expect(component.isFavorite).toBeFalsy();
  });

  it('should be call downloadTicket', (done) => {
    expect(component.downloadTicket()).toBeUndefined();
    done();
  });

  it('should be call shareTicket', (done) => {
    expect(component.shareTicket()).toBeUndefined();
    done();
  });

  it('should be call saveOrDeleteFavorite', async () => {
    const isFavoriteSpy = spyOnProperty(component, 'isFavorite');
    isFavoriteSpy.and.returnValue(false);
    expect(await component.saveOrDeleteFavorite()).toBeUndefined();

    isFavoriteSpy.and.returnValue(true);
    component.favorite = { keyFavorite: '6578908765' } as any;
    expect(await component.saveOrDeleteFavorite()).toBeUndefined();
  });

  it('should be call saveFavorite', async () => {
    expect(await component.saveFavorite()).toBeUndefined();

    component.favoriteFormControl.setValue('Mi favorito');
    fixture.detectChanges();
    expect(await component.saveFavorite()).toBeUndefined();
  });

  it('should be call actionVoucher', async () => {
    const payBill = new ProductFactory().create();
    const data = { additionalData: payBill };
    expect(component.actionVoucher(data)).toBe(void 0);
  });

  it('should downloadCompleted$', () => {
    component.downloadCompleted$.subscribe();
    expect(component).toBeTruthy();
  });

  it('should shareCompleted$', () => {
    component.shareCompleted$.subscribe();
    expect(component).toBeTruthy();
  });

  it('should be call redirectToAddSpiContact', () => {
    const closeToastSpy = spyOn(downloadFacade, 'closeToast').and.callFake(
      () => void 0
    );
    component.redirectToAddSpiContact();
    expect(closeToastSpy).toHaveBeenCalled();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalled();
  });

  it('should be call saveOrDeleteSpiFavorite', () => {
    component.props.isFavoriteSpiContact = false;
    fixture.detectChanges();
    component.saveOrDeleteSpiFavorite();
    expect(component.showSpiFavoriteNameField).toBeTrue();

    component.props.isFavoriteSpiContact = true;
    fixture.detectChanges();
    component.saveOrDeleteSpiFavorite();
  });

  it('should be call saveSpiFavorite', async () => {
    expect(await component.saveSpiFavorite()).toBeUndefined();

    component.favoriteFormControl.setValue('Mi fav spi');
    fixture.detectChanges();
    expect(await component.saveSpiFavorite()).toBeUndefined();
  });
});
