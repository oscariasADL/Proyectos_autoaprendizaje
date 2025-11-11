import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { BreBTransfersTowardComponent } from './bre-b-transfers-toward.component';
import { TestingModule } from '@testing/testing.module';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BreBTransfersFacade } from '../../bre-b-transfers.facade';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NumberFormatPipe } from '@app/commons/pipes/number-format.pipe';
import { of } from 'rxjs';
import { Product } from '@commons/entities/product/product.interface';
import { BreBTransfersForm } from '../../entities/bre-b-transfers.interface';
import { ProductTypeDetail } from '@app/commons/entities/product/product-type-detail.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { TransferType } from '@app/modules/transfers/entities/transfers.interface';
import { CurrencyFormatPipe } from '@app/commons/pipes/currency-format.pipe';
import {
  CONTINUE_BUTTON_UTAG_EVENT,
  TAG_AVAL_OR_KEY_UTAG_EVENT
} from '../../constants/bre-b-transfers.constants';
import { UtagDirective } from '@app/commons/directives/tealium/utag.directive';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

describe('BreBTransfersTowardComponent', () => {
  let component: BreBTransfersTowardComponent;
  let fixture: ComponentFixture<BreBTransfersTowardComponent>;
  let facadeStub: Partial<BreBTransfersFacade>;

  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);
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
      products$: of([mockProduct]),
      breBSpiKeyData$: of(mockAccountKey),
      brebBAccountKeyCompleted$: of(true),
      boundsByKey(): number {
        return 5000000;
      },
      fetchAccount() {
        void 0;
      },
      clearTowardAvalKey() {
        void 0;
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        BreBTransfersTowardComponent,
        NumberFormatPipe,
        CurrencyFormatPipe,
        UtagDirective
      ],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      providers: [
        { provide: BreBTransfersFacade, useValue: facadeStub },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BreBTransfersTowardComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup<BreBTransfersForm>({
      towardAvalKey: new FormControl('ASDASD'),
      towardProduct: new FormControl(null),
      amount: new FormControl('5.000'),
      fromProduct: new FormControl(null),
      addenda: new FormControl(null),
      fee: new FormControl(''),
      transferType: new FormControl(TransferType.SEND_BRE_B),
      contactName: new FormControl('Joh***'),
      isFavoriteContact: new FormControl(null),
      isSavedContact: new FormControl(null),
      gmfData: new FormControl(null)
    });
    component.tagAvalOtKeyUtagEvent = TAG_AVAL_OR_KEY_UTAG_EVENT;
    component.continueButtonUtagEvent = CONTINUE_BUTTON_UTAG_EVENT;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit continue event when continueAction() is called with valid data', fakeAsync(() => {
    spyOn(component.continue, 'emit');
    spyOn(facadeStub, 'fetchAccount').and.callFake(() => void 0);

    component.towardAvalKey.setValue('MOCKKEY');
    component.continueAction();

    tick();
    expect(facadeStub.fetchAccount).toHaveBeenCalled();
    expect(component.continue.emit).toHaveBeenCalled();
  }));

  it('should transform towardAvalKey to uppercase and trim value', fakeAsync(() => {
    component.towardAvalKey.setValue('  abcd1234  ');
    component.ngAfterViewInit();
    component.towardAvalKey.setValue('  abcd1234  ');
    tick();

    expect(component.towardAvalKey.value).toBe('ABCD1234');
  }));

  it('should call to openKeyDirectory', () => {
    component.openKeyDirectory();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalled();
  });
});
