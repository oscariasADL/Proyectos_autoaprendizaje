import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfersCel2celSendBankComponent } from './transfers-cel2cel-send-bank.component';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { InformationService } from '@commons/services/information.service';
import { InformationServiceMock } from '@testing/mocks/services/information.service.mock';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { TransfersCel2celFacadeMock } from '@testing/mocks/facade/transfers-cel2cel.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';

describe('TransfersCel2celSendBankComponent', () => {
  let component: TransfersCel2celSendBankComponent;
  let fixture: ComponentFixture<TransfersCel2celSendBankComponent>;
  let modalSpy;
  let modalCtrlSpy;
  let alertService;
  let informationService;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'getTop',
      'dismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [TransfersCel2celSendBankComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: InformationService,
          useClass: InformationServiceMock
        },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        },
        {
          provide: TransfersCel2celFacade,
          useClass: TransfersCel2celFacadeMock
        },
        { provide: AlertService, useClass: AlertServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersCel2celSendBankComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      transferType: new UntypedFormControl(),
      contactData: new UntypedFormControl(),
      phoneNumber: new UntypedFormControl(),
      amount: new UntypedFormControl(),
      note: new UntypedFormControl(),
      addenda: new UntypedFormControl(),
      towardProduct: new UntypedFormControl(),
      confirmationMessage: new UntypedFormControl(),
      useTransfiya: new UntypedFormControl()
    });
    alertService = TestBed.inject(AlertService);
    informationService = TestBed.inject(InformationService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    spyOn(alertService, 'create').and.returnValue(Promise.resolve(true));
    spyOnProperty(alertService, 'alreadyPresent').and.returnValue(false);
    expect(component).toBeTruthy();
  });

  it('should create option', () => {
    spyOn(alertService, 'create').and.returnValue(Promise.resolve(true));
    spyOnProperty(alertService, 'alreadyPresent').and.returnValue(true);
    expect(component).toBeTruthy();
  });

  it('should call alertService', () => {
    spyOn(alertService, 'create').and.returnValue(Promise.resolve(null));
    component.showTransfiyaAlertInfo(true);
    expect(alertService.create).toHaveBeenCalled();
  });

  it('should call informationService', () => {
    spyOn(informationService, 'showPanelIfNecessary').and.returnValue(
      Promise.resolve(null)
    );
    component.showTransfiyaAlertInfo();
    expect(informationService.showPanelIfNecessary).toHaveBeenCalled();
  });

  it('should call alertSetTransferType method', fakeAsync(() => {
    spyOn(alertService, 'create').and.returnValue(Promise.resolve(true));
    spyOn(component, 'alertSetTransferType');
    component.showTransfiyaAlertInfo(true);
    tick(200);
    expect(component.alertSetTransferType).toHaveBeenCalled();
  }));

  it('should be false bankInList', () => {
    expect(component.bankInList('0052')).toBeFalse();
    spyOnProperty(component, 'transfersCel2celBankIds').and.returnValue([
      '0001',
      '0019',
      '0052',
      '0023',
      '0002',
      '0097'
    ]);
    spyOn(component, 'bankInList').and.callThrough();
    component.bankInList('0052');
    expect(component.bankInList).toHaveBeenCalled();
  });

  it('should be defined setTowardBankInfo', () => {
    component.setTowardBankInfo('0052', 'Banco AVVillas');
    expect(component.setTowardBankInfo).toBeDefined();
    spyOnProperty(component, 'transfersCel2celBankIds').and.returnValue([
      '0001',
      '0019',
      '0052',
      '0023',
      '0002',
      '0097'
    ]);
    spyOnProperty(component, 'transfersCel2celTowardProducts').and.returnValue([
      {
        account: {
          accountId: '1000001',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0001'
          }
        },
        personInfo: {
          name: 'Mar***** Ang**** Alv****',
          documentNumber: '10910000001'
        }
      },
      {
        account: {
          accountId: '1000011',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0019'
          }
        },
        personInfo: {
          name: 'Mar***** Ang**** Alv****',
          documentNumber: '10910000001'
        }
      },
      {
        account: {
          accountId: '1000052',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0052'
          }
        },
        personInfo: {
          name: 'Mar***** Ang**** Alv****',
          documentNumber: '10910000001'
        }
      },
      {
        account: {
          accountId: '1000023',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0023'
          }
        },
        personInfo: {
          name: 'Mar***** Ang**** Alv****',
          documentNumber: '10910000001'
        }
      },
      {
        account: {
          accountId: '1000002',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0002'
          }
        },
        personInfo: {
          name: 'Mar***** Ang**** Alv****',
          documentNumber: '10910000001'
        }
      },
      {
        account: {
          accountId: '1000097',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0097'
          }
        },
        personInfo: {
          name: 'Mar***** Ang**** Alv****',
          documentNumber: '10910000097'
        }
      }
    ]);
    spyOn(component, 'setTowardBankInfo').and.callThrough();
    component.setTowardBankInfo('0001', 'TEST');
    expect(component.setTowardBankInfo).toHaveBeenCalled();
  });

  it('should be defined setTowardBankInfo true', () => {
    component.setTowardBankInfo('0052', 'Banco AVVillas');
    expect(component.setTowardBankInfo).toBeDefined();
  });

  it('should be emit by true alertSetTransferType', () => {
    const spyContinue = spyOn(component.continue, 'emit').and.callThrough();
    fixture.detectChanges();
    component.alertSetTransferType(true);
    expect(spyContinue).toHaveBeenCalled();
  });

  it('should be emit by false alertSetTransferType', () => {
    const spyContinue = spyOn(
      component.continueSlide,
      'emit'
    ).and.callThrough();
    fixture.detectChanges();
    component.alertSetTransferType(false);
    expect(spyContinue).toHaveBeenCalled();
  });

  it("should does'nt emit by true alertSetTransferType", () => {
    const spyContinue = spyOn(
      component.continueSlide,
      'emit'
    ).and.callThrough();
    fixture.detectChanges();
    component.alertSetTransferType(undefined);
    expect(spyContinue).toBeDefined();
  });

  it('should hasProductAval return true', () => {
    Object.defineProperty(component, 'transfersCel2celTowardProducts', {
      value: [{}]
    });
    expect(component.hasProductAval).toBeTruthy();
  });

  it('should hasProductAval return false', () => {
    Object.defineProperty(component, 'transfersCel2celTowardProducts', {
      value: []
    });
    expect(component.hasProductAval).toBeFalsy();
  });
});
