import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { FavoritesTransferPage } from '@modules/favorites/pages/favorites-transfer/favorites-transfer.page';
import { TestingModule } from '@testing/testing.module';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import {
  fakeFavorite,
  FavoritesFacadeMock
} from '@testing/mocks/facade/favorites.facade.mock';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { RechargesFacade } from '@modules/product-options/recharges/recharges.facade';
import { RechargesFacadeMock } from '@testing/mocks/facade/recharges.facade.mock';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { WithdrawFacadeMock } from '@testing/mocks/facade/withdraw.facade.mock';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { FeeService } from '@commons/services/fee.service';
import { FeeServiceMock } from '@testing/mocks/services/FeeService.mock';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ProductFactory } from '@testing/factories/product.factory';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { of } from 'rxjs';
import { Fee } from '@app/commons/entities/fee/fee.interface';
import { mapToTransferConfirm } from './mappers/favorites-transfer-confirm.mapper';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { Product } from '@app/commons/entities/product/product.interface';

describe('FavoritesTransferPage', () => {
  let component: FavoritesTransferPage;
  let fixture: ComponentFixture<FavoritesTransferPage>;
  const fakeActivatedRoute = {
    snapshot: {
      params: { key_favorite: 'CC123456956875764' }
    }
  };
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', [
    'create',
    'dismiss'
  ]);
  const modalCtrlCreateMethodSpy = jasmine.createSpyObj('Modal', [
    'present',
    'onDidDismiss',
    'onWillDismiss'
  ]);
  let favoritesFacadeMock: FavoritesFacadeMock;
  let feeServiceMock: FeeServiceMock;
  let cdRef: ChangeDetectorRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesTransferPage, CurrencyFormatPipe, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute
        },
        {
          provide: NavController,
          useValue: navCtrlSpy
        },
        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        },
        {
          provide: RechargesFacade,
          useClass: RechargesFacadeMock
        },
        {
          provide: WithdrawFacade,
          useClass: WithdrawFacadeMock
        },
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        {
          provide: AlertService,
          useClass: AlertServiceMock
        },
        {
          provide: FeeService,
          useClass: FeeServiceMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        ChangeDetectorRef
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesTransferPage);
    component = fixture.componentInstance;
    const factoryProduct = new ProductFactory();
    component.sourceAccount = factoryProduct.create();
    favoritesFacadeMock = TestBed.inject(
      FavoritesFacade
    ) as FavoritesFacadeMock;
    feeServiceMock = TestBed.inject(FeeService) as FeeServiceMock;
    cdRef = TestBed.inject(ChangeDetectorRef);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call fetchFavorite', () => {
    expect(component.fetchFavorite()).toBeUndefined();
  });

  it('should be call modifyAmount', async () => {
    modalCtrlSpy.create.and.callFake(() => {
      return modalCtrlCreateMethodSpy;
    });
    modalCtrlCreateMethodSpy.onWillDismiss.and.callFake(() =>
      Promise.resolve({ amount: 45000 })
    );
    expect(await component.modifyAmount()).toBeUndefined();
  });

  it('should be call modifyAccount', async () => {
    modalCtrlCreateMethodSpy.onWillDismiss.and.callFake(() =>
      Promise.resolve({ product: new ProductFactory().create() })
    );
    modalCtrlSpy.create.and.callFake(() => {
      return modalCtrlCreateMethodSpy;
    });
    expect(await component.modifyAccount()).toBeUndefined();
  });

  it('should bel call modifyField(typeField: string)', async () => {
    component.favorite$ = of(fakeFavorite);
    modalCtrlCreateMethodSpy.present.and.callFake(() => Promise.resolve());
    modalCtrlCreateMethodSpy.onWillDismiss.and.callFake(() =>
      Promise.resolve({ addenda: 'Notas' })
    );
    modalCtrlSpy.create.and.callFake(() => modalCtrlCreateMethodSpy);
    expect(await component.modifyField('note')).toBeUndefined();
  });

  it('should be call deleteFavorite', async () => {
    expect(await component.deleteFavorite()).toBeUndefined();
  });

  it('should be call executeAction', () => {
    expect(component.executeAction()).toBeUndefined();
  });

  it('should be defined hasProducts', () => {
    expect(component.hasProducts).toBeDefined();
  });

  it('should be defined products', () => {
    expect(component.products).toBeDefined();
  });

  it('should be defined actionLabel', () => {
    expect(component.actionLabel).toBeDefined();
  });
  it('should set value and cost with insufficient balance', async () => {
    const value = 99500;
    const fee: Fee = {
      id: 1,
      code: '123',
      amount: 10
    };
    spyOn(favoritesFacadeMock, 'enableLoading');
    spyOn(favoritesFacadeMock, 'disableLoading');
    spyOn(feeServiceMock, 'fetchCost').and.returnValue(of(fee));

    component.favorite$ = of(fakeFavorite);

    await (component as any).setValueAndCost(value);

    expect(component.hasInsufficientBalance).toBe(false);
  });
  it('should modify account and update component properties', async () => {
    const newProduct: Product = {
      id: 'new-product-id',
      type: TypeAccount.SDA,
      availableBalance: 50000,
      balance: 50000,
      numberProduct: '1234567890',
      typeName: 'Cuenta de Ahorros',
      notEmpty: true
    };
    const modalResult = { product: newProduct };
    const initialFavorite = { ...fakeFavorite };
    component.favorite$ = of(initialFavorite);
    component.transactionValue = 10000;
    component.operationCost = 500;

    modalCtrlCreateMethodSpy.onWillDismiss.and.returnValue(
      Promise.resolve({ data: modalResult })
    );
    modalCtrlSpy.create.and.returnValue(
      Promise.resolve(modalCtrlCreateMethodSpy)
    );

    await component.modifyAccount();

    expect(component.hasInsufficientBalance).toBe(false);
    expect(component.sourceAccount).toBe(newProduct);

    component.favorite$.subscribe((favorite) => {
      expect(favorite.sourceAccountTransaction.typeAcctTransaction).toBe(
        newProduct.type
      );
      expect(favorite.sourceAccountTransaction.idAcctTransaction).toBe(
        newProduct.id
      );
    });

    component.itemsConfirm$.subscribe((items) => {
      expect(items).toEqual(
        mapToTransferConfirm
          .bind(component)(initialFavorite)
          .filter((voucherItem) => voucherItem.id !== 'amount')
      );
    });
  });
});
