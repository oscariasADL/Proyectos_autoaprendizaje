import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TransfiyaManagementFacade } from '@modules/transfiya-management/transfiya-management.facade';
import { TransfiyaManagementFacadeMock } from '@testing/mocks/facade/transfiya-management.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';

import { TransfiyaManagementPage } from './transfiya-management.page';

describe('TransfiyaManagementPage', () => {
  let component: TransfiyaManagementPage;
  let fixture: ComponentFixture<TransfiyaManagementPage>;
  const payload = {
    products: [
      {
        type: 'SDA',
        id: '3',
        numberProduct: '8942786',
        availableBalance: 185481776.4,
        currency: 'COP',
        typeName: 'Cuenta de Ahorros',
        accountType: 1,
        notEmpty: true,
        description: 'Saldo total',
        nickname: 'Nickname'
      }
    ],
    productSelected: {
      type: 'SDA',
      id: '3',
      numberProduct: '8942786',
      availableBalance: 185481776.4,
      currency: 'COP',
      typeName: 'Cuenta de Ahorros',
      accountType: 1,
      notEmpty: true,
      description: 'Saldo total',
      nickname: 'Nickname'
    },
    notification: {
      transactionId: 'Pt5zoCTt8v9uwntAy22',
      amount: 120000,
      targetNumber: '3138633455',
      note: 'Lo del almuerzo',
      isRequest: false
    },
    isDispatch: false,
    nickname: null,
    fee: 2935,
    confirmation: [
      {
        id: 'amount',
        label: 'Valor',
        fields: ['$ 120.000']
      },
      {
        id: 'targetNumber',
        label: 'Desde',
        fields: ['3138633455']
      },
      {
        id: 'management',
        label: 'Hacia',
        fields: [
          'Ahorros  No. 8942786',
          'Disponible $ 185.481.776,<span class="decimal-numbers-format">40</span>'
        ],
        edit: '0'
      },
      {
        id: 'cost',
        label: 'Costo',
        fields: ['$ 2.935']
      }
    ],
    userData: {
      dataBasicClientDto: {
        firstname: 'Severus',
        lastName: 'Snape'
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfiyaManagementPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: TransfiyaManagementFacade,
          useClass: TransfiyaManagementFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { notification_id: '123', notification_type: '123' }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfiyaManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload()', () => {
    spyOn(component, 'feePayload').and.callThrough();
    expect(component.feePayload()).toBeDefined();
    expect(component.feePayload).toHaveBeenCalled();
  });

  it('should call acceptTransfiyaAuthorization()', () => {
    const formValidSpy = spyOnProperty(component.form, 'valid');
    spyOn(component, 'acceptTransfiyaAuthorization').and.callThrough();
    spyOnProperty(component, 'isRequest').and.returnValue(false);
    component.form.patchValue(payload);
    formValidSpy.and.returnValue(true);
    component.acceptTransfiyaAuthorization();
    expect(component.acceptTransfiyaAuthorization).toHaveBeenCalled();

    formValidSpy.and.returnValue(false);
    component.acceptTransfiyaAuthorization();
    expect(component.acceptTransfiyaAuthorization).toHaveBeenCalled();
  });

  it('should call rejectTransfiyaAuthorization()', () => {
    const payloadReject = { ...payload };
    spyOn(component, 'rejectTransfiyaAuthorization').and.callThrough();
    spyOnProperty(component, 'isRequest').and.returnValue(false);
    payloadReject.confirmation = null;
    payloadReject.fee = null;
    payloadReject.productSelected = null;
    component.form.patchValue(payload);
    component.rejectTransfiyaAuthorization();
    expect(component.rejectTransfiyaAuthorization).toHaveBeenCalled();
  });

  it('should return boolean, get isRequest', () => {
    spyOnProperty(component, 'notification').and.returnValue({
      amount: 12000,
      targetNumber: '313892843',
      note: 'Hola',
      transactionId: 'ijsjhjswueke',
      isRequest: false
    });
    expect(component.isRequest).toBeFalse();
  });
});
