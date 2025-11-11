import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { InformationService } from '@commons/services/information.service';
import { IonicModule } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { InformationServiceMock } from '@testing/mocks/services/information.service.mock';
import { TestingModule } from '@testing/testing.module';
import { TransfersUnregisteredAccountsTowardCellPhoneComponent } from './transfers-unregistered-accounts-toward-cell-phone.component';

describe('TransfersUnregisteredAccountsTowardCellPhoneComponent', () => {
  let component: TransfersUnregisteredAccountsTowardCellPhoneComponent;
  let fixture: ComponentFixture<TransfersUnregisteredAccountsTowardCellPhoneComponent>;
  let modalSpy;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [TransfersUnregisteredAccountsTowardCellPhoneComponent],
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
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(
      TransfersUnregisteredAccountsTowardCellPhoneComponent
    );
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      transferType: new UntypedFormControl(),
      contactData: new UntypedFormControl(),
      phoneNumber: new UntypedFormControl(),
      amount: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showTransfiyaInformation', () => {
    expect(component.showTransfiyaInfo()).toBeTruthy();
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
    expect(component.setCellContact()).toBeUndefined();
  });

  it('should call removeCellPhoneContact', () => {
    component.removeCellContact();
    expect(component.phoneNumber.value).toBeNull();
  });
});
