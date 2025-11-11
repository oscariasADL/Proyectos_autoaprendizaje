import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';

import { TestingModule } from '@testing/testing.module';
import { BreBTransfersDataComponent } from '@modules/transfers/pages/bre-b-transfers/components/bre-b-transfers-data/bre-b-transfers-data.component';
import { BreBTransfersFacade } from '@modules/transfers/pages/bre-b-transfers/bre-b-transfers.facade';
import { BreBTransfersForm } from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { UtagDirective } from '@commons/directives/tealium/utag.directive';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import { of } from 'rxjs';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

describe('BreBTransfersDataComponent', () => {
  let component: BreBTransfersDataComponent;
  let fixture: ComponentFixture<BreBTransfersDataComponent>;
  let facadeStub: Partial<BreBTransfersFacade>;
  const popoverCtrl = jasmine.createSpyObj<PopoverController>([
    'create',
    'dismiss'
  ]);
  const popoverCtrlCreateMethodSpy = jasmine.createSpyObj('Popover', [
    'present'
  ]);
  popoverCtrlCreateMethodSpy.present.and.callFake(() => Promise.resolve());
  const mockProduct: Product = {
    type: TypeAccount.SDA,
    id: '1',
    idUM: '1',
    numberProduct: '8942828',
    availableBalance: 3741620.39,
    currency: 'COP',
    typeName: 'Cuenta de Ahorros',
    accountType: 1,
    productTypeDetailKey: ProductTypeDetail.DGT,
    productTypeDetailValue: 'DIGITAL',
    notEmpty: true,
    description: 'Saldo total',
    nickname: 'Cuenta de Ahorros',
    typeProduct: 1
  };

  const mockAccountKey: TransferSpiUserKey = {
    key: 'mockKey',
    name: 'Juan Perez',
    bankName: 'Banco Test',
    fullName: ''
  };

  beforeEach(waitForAsync(() => {
    facadeStub = {
      setAddSpiContactPayload: () => void 0,
      fetchSpiContact: () => void 0,
      products$: of([mockProduct]),
      breBSpiKeyData$: of(mockAccountKey),
      breBSpiContact$: of({
        isFav: false
      } as any),
      boundsByKey(key: string, parse: boolean = true): number {
        return 5000000;
      },
      featureFlagsByKey(key: string): string | boolean {
        return true;
      }
    };
    TestBed.configureTestingModule({
      declarations: [
        BreBTransfersDataComponent,
        NumberFormatPipe,
        CurrencyFormatPipe,
        UtagDirective
      ],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      providers: [
        { provide: BreBTransfersFacade, useValue: facadeStub },
        { provide: PopoverController, useValue: popoverCtrl }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BreBTransfersDataComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup<BreBTransfersForm>({
      towardAvalKey: new FormControl('ASDASD'),
      towardProduct: new FormControl({
        key: '',
        fullName: '',
        name: '',
        bankName: ''
      }),
      amount: new FormControl('5.000'),
      fromProduct: new FormControl(null),
      addenda: new FormControl(null),
      fee: new FormControl(''),
      transferType: new FormControl(TransferType.SEND_BRE_B),
      contactName: new FormControl('Joh***'),
      isFavoriteContact: new FormControl(null),
      isSavedContact: new FormControl(null),
      shouldSaveSpiContact: new FormControl(false)
    } as any);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit continue event when continueAction() is called with valid data', fakeAsync(() => {
    spyOn(component.continue, 'emit');
    component.shouldSaveSpiContactControl.setValue(true);
    fixture.detectChanges();
    spyOn(facadeStub, 'setAddSpiContactPayload').and.callFake(() => void 0);

    component.continueAction();

    tick();
    expect(facadeStub.setAddSpiContactPayload).toHaveBeenCalled();
    expect(component.continue.emit).toHaveBeenCalled();
  }));

  it('should set initial product on init', () => {
    expect(component.fromProduct.value).toEqual(mockProduct);
    expect(component.modalProducts.length).toBe(1);
    expect(component.modalProducts[0].productsCards.length).toBe(1);
  });

  it('should set selected product via selectProduct()', () => {
    const newProduct = { ...mockProduct, productId: 'new123' };
    component.selectedProduct(newProduct);
    expect(component.fromProduct.value).toEqual(newProduct);
  });

  it('should call to canSaveContact', () => {
    component.isSavedContactControl.setValue(true);
    fixture.detectChanges();
    expect(component.canSaveContact()).toBeFalse();
  });

  it('should call be showPopoverSpiContactInfo', async () => {
    popoverCtrl.create.and.callFake(() => popoverCtrlCreateMethodSpy);
    expect(await component.showPopoverSpiContactInfo(new Event('click'))).toBe(
      void 0
    );
  });
});
