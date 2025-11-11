import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { ProductFacade } from '@modules/product/product.facade';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, PopoverController } from '@ionic/angular';
import { ProductDetailCardComponent } from './product-detail-card.component';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';
import { TestingModule } from '@testing/testing.module';
import {
  SpiKeyType,
  StatusDirectory
} from '../../entities/product-spi-user-key';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { provideMockStore } from '@ngrx/store/testing';

describe('ProductDetailCardComponent', () => {
  let component: ProductDetailCardComponent;
  let fixture: ComponentFixture<ProductDetailCardComponent>;
  let productFacadeMock: ProductFacadeMock;
  const popoverCtrlSpy = jasmine.createSpyObj('PopoverController', ['create']);
  const product: ProductDetail = {
    type: 'SDA',
    typeName: 'Cambio el nickname!',
    numberProduct: '008939626',
    accountType: 1,
    balance: 90000000.14,
    availableBalance: 88000000.14,
    inPockets: 126000,
    blockedBalance: 0,
    pendingBalance: 0,
    cashFlowInfo: {
      startDate: '2019-09-01',
      endDate: '2019-09-05',
      incomingMoney: 100000,
      outgoingMoney: 448193.82
    },
    balanceForOrdering: '33290921.14',
    notEmpty: false,
    avalTagKey: [
      {
        numberProduct: '8942786',
        accountId: '008942786',
        accountType: TypeAccount.SDA,
        keyId: '@AVABC123',
        keyType: SpiKeyType.AlphanumericIdentifier,
        preferredIndicator: 'N',
        statusDesc: 'ACTIVA',
        effDt: '2024-11-14T10:45:50.995-05:00',
        statusDirectory: StatusDirectory.DICE
      }
    ],
    id: '3',
    nickname: ' Nickname'
  };

  beforeEach(waitForAsync(() => {
    productFacadeMock = new ProductFacadeMock();
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailCardComponent,
        ImageUrlPipe,
        CurrencyFormatPipe,
        NumberFormatPipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: ProductFacade,
          useValue: productFacadeMock
        },
        {
          provide: PopoverController,
          useValue: popoverCtrlSpy
        },
        provideMockStore({ initialState: {} })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailCardComponent);
    component = fixture.componentInstance;
    component.product = product;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ionViewWillLeave', () => {
    spyOn(productFacadeMock, 'closeToast').and.callThrough();
    component.ionViewWillLeave();
    expect(productFacadeMock.closeToast).toHaveBeenCalled();
  });

  it('should showPopover', async () => {
    popoverCtrlSpy.create.and.returnValue({
      present: () => {
        return Promise.resolve();
      }
    });
    await component.showPopover(new Event('click'), 'Lorem', 'mi-id');
    expect(popoverCtrlSpy.create).toHaveBeenCalled();

    await component.showPopover(
      new Event('click'),
      'Lorem',
      'mi-id',
      'LoremTitle'
    );
    expect(popoverCtrlSpy.create).toHaveBeenCalled();
  });

  it('should return ProductDetailItemType, get productDetailItemType()', () => {
    expect(component.productDetailItemType).toBeDefined();
  });

  it('should getBankLabel', () => {
    spyOn(component, 'getBankLabel').and.callThrough();
    component.getBankLabel('0000');
    expect(component.getBankLabel).toHaveBeenCalled();
    expect(component.getBankLabel).toBeDefined();
  });

  it('should call be copyInfoToCopy', () => {
    const infoToCopyText = 'Villas';
    const writeTextSpy = spyOn(
      navigator.clipboard,
      'writeText'
    ).and.returnValue(Promise.resolve());
    component.copySpiUserKey(infoToCopyText);
    expect(writeTextSpy).toHaveBeenCalledWith(infoToCopyText);
  });

  it('should be call cromalineLoadingError', () => {
    const img = document.createElement('img') as HTMLImageElement;
    img.addEventListener('error', (evt) => {
      expect(component.cromalineLoadingError(evt)).toBe(void 0);
    });
    img.onerror = (evt) => Error('error');
  });

  it('should call be showPopoverHelp', async () => {
    expect(
      await component.showTagAvalPopover(
        new Event('click'),
        'popover-product-detail-1',
        product.avalTagKey[0]
      )
    ).toBe(void 0);
  });

  it('should call cromalineLoadingError and change image source', () => {
    const img = document.createElement('img') as HTMLImageElement;
    const event = new Event('error');
    Object.defineProperty(event, 'target', { writable: false, value: img });
    component.cromalineLoadingError(event);
    expect(img.src).toContain('cromalinesV2/avvillas-td-classic.svg');
  });
});
