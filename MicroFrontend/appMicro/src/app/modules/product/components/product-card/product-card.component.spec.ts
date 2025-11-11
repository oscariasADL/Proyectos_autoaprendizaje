import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';

import { HomeProductType } from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';
import { StripTagsPipe } from '@commons/pipes/strip-tags.pipe';
import { ReverseDashCasePipe } from '@commons/pipes/reverse-dash-case.pipe';

import { HiddenFormatPipe } from '@modules/product/pipes/hidden-format.pipe';
import { ProductCardComponent } from './product-card.component';
import { CardFooterItemComponent } from './card-footer-item/card-footer-item.component';

import { ProductFactory } from '@testing/factories/product.factory';
import { TestingModule } from '@testing/testing.module';

import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { ProductFacade } from '@modules/product/product.facade';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';

import { TypeAccount } from '@app/commons/entities/product/type-account';

import {
  ProductSpiUserKey,
  SpiKeyType,
  StatusDirectory
} from '../../entities/product-spi-user-key';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { spiUserKeysSelector } from '../../store/product.selector';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let store: MockStore;
  let selectorRef: MemoizedSelector<unknown, ProductSpiUserKey[]>;

  const popoverCtrlSpy = jasmine.createSpyObj('PopoverController', ['create']);
  const popoverCtrlCreateMethodSpy = jasmine.createSpyObj('Popover', [
    'present'
  ]);
  popoverCtrlCreateMethodSpy.present.and.callFake(() => Promise.resolve());

  const product: Product = new ProductFactory().create();

  const spiKey1: ProductSpiUserKey = {
    numberProduct: 'NP1',
    accountId: 'ACC1',
    accountType: TypeAccount.SDA,
    preferredIndicator: '',
    statusDesc: '',
    effDt: '',
    keyId: 'AV.1',
    keyType: SpiKeyType.AlphanumericIdentifier,
    statusDirectory: StatusDirectory.DICE
  };

  const spiKey2: ProductSpiUserKey = {
    numberProduct: 'NP2',
    accountId: 'ACC2',
    accountType: TypeAccount.DDA,
    preferredIndicator: '',
    statusDesc: '',
    effDt: '',
    keyId: 'AV.2',
    keyType: SpiKeyType.AlphanumericIdentifier,
    statusDirectory: StatusDirectory.DICE
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCardComponent,
        CardFooterItemComponent,
        HiddenFormatPipe,
        CurrencyFormatPipe,
        CapitalizePipe,
        NumberFormatPipe,
        StripTagsPipe,
        ReverseDashCasePipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: PopoverController, useValue: popoverCtrlSpy },
        { provide: AppFacade, useClass: AppFacadeMock },
        { provide: ProductFacade, useClass: ProductFacadeMock },
        // 👉 Mock NgRx Store
        provideMockStore()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    selectorRef = store.overrideSelector(spiUserKeysSelector, []);

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.productDetail = {
      type: HomeProductType.product,
      url: '',
      product: {
        ...product,
        avalTagKey: [
          {
            numberProduct: '',
            accountId: '',
            accountType: TypeAccount.SDA,
            preferredIndicator: '',
            statusDesc: '',
            effDt: '',
            keyId: 'AV.JCP626',
            keyType: SpiKeyType.AlphanumericIdentifier,
            statusDirectory: StatusDirectory.DICE
          }
        ],
        breBUserKeys: [
          {
            numberProduct: 'BREB-NP1',
            accountId: 'BREB-ACC1',
            accountType: TypeAccount.SDA,
            preferredIndicator: '',
            statusDesc: '',
            effDt: '',
            keyId: 'BREB.1',
            keyType: SpiKeyType.AlphanumericIdentifier,
            statusDirectory: StatusDirectory.DICE
          } as ProductSpiUserKey
        ]
      },
      balance: 0,
      description: '',
      productType: '',
      categoryName: ''
    };

    popoverCtrlSpy.create.and.callFake(() => popoverCtrlCreateMethodSpy);

    fixture.detectChanges(); // dispara ngOnInit
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showTagAvalPopover()', async () => {
    expect(await component.showTagAvalPopover(new Event('click'))).toBe(void 0);
  });

  it('should return ProductStyleType from getter', () => {
    expect(component.productStyleType).toBeDefined();
  });

  it('should return TypeAccount from getter', () => {
    expect(component.typeAccount).toBeDefined();
  });

  it('hasMoreThanOneKey() should be true when there is 1 BreB + 1 AvalTag', () => {
    expect(component.hasMoreThanOneKey()).toBeTrue();
  });
});
