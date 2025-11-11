import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfersCel2celSendTowardComponent } from './transfers-cel2cel-send-toward.component';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { InformationService } from '@commons/services/information.service';
import { ModalController } from '@commons/controllers/modal.controller';
import { InformationServiceMock } from '@testing/mocks/services/information.service.mock';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { TransfersCel2celFacadeMock } from '@testing/mocks/facade/transfers-cel2cel.facade.mock';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';

describe('TransfersCel2celSendTowardComponent', () => {
  let component: TransfersCel2celSendTowardComponent;
  let fixture: ComponentFixture<TransfersCel2celSendTowardComponent>;
  let modalSpy;
  let modalCtrlSpy;
  let alertService;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [TransfersCel2celSendTowardComponent, NumberFormatPipe],
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

    fixture = TestBed.createComponent(TransfersCel2celSendTowardComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      transferType: new UntypedFormControl(),
      contactData: new UntypedFormControl(),
      phoneNumber: new UntypedFormControl(),
      amount: new UntypedFormControl(),
      note: new UntypedFormControl(),
      addenda: new UntypedFormControl(),
      useTransfiya: new UntypedFormControl()
    });
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showTransfiyaInformation', () => {
    expect(component.showTransfiyaInformation()).toBeTruthy();
  });

  it('should call setCellPhoneContact', () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: {
        displayName: '',
        phoneNumber: ''
      }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(component.setCellPhoneContact()).toBeUndefined();
  });

  it('should call removeCellPhoneContact', () => {
    component.removeCellNumberContact();
    expect(component.phoneNumber.value).toBeNull();
  });

  it('should call confirmationToward alert', () => {
    expect(component.towardProduct).toBeNull();
  });

  it('should call confirmationToward', () => {
    component.form.controls.contactData.setValue({ displayName: 'Maria' });
    component.form.controls.phoneNumber.setValue('3213333333');
    const spyGetTowardProducts = spyOn(
      component,
      'getTowardProducts'
    ).and.callThrough();
    component.confirmationToward();
    expect(spyGetTowardProducts).toHaveBeenCalled();
  });

  it('should call confirmationToward without name', () => {
    component.form.controls.contactData.setValue({ displayName: null });
    component.form.controls.phoneNumber.setValue('3213333333');
    spyOn(alertService, 'create').and.returnValue(Promise.resolve(true));
    spyOnProperty(alertService, 'alreadyPresent').and.returnValue(false);
    expect(component.confirmationToward()).toBeUndefined();
  });

  it('should call confirmationTowardEmit', () => {
    component.form.controls.note.setValue('TEST');
    const spyContinue = spyOn(component.continue, 'emit').and.callThrough();
    fixture.detectChanges();
    component.confirmationTowardEmit();
    expect(spyContinue).toHaveBeenCalled();
  });
});
