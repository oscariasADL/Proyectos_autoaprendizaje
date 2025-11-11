import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { TransfersRequestMoneyTowardComponent } from './transfers-request-money-toward.component';

describe('TransfersRequestMoneyTowardComponent', () => {
  let component: TransfersRequestMoneyTowardComponent;
  let fixture: ComponentFixture<TransfersRequestMoneyTowardComponent>;
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
      declarations: [TransfersRequestMoneyTowardComponent],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersRequestMoneyTowardComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      contactData: new UntypedFormControl(),
      phoneNumber: new UntypedFormControl(),
      amount: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setCellPhoneContact', () => {
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: {
        displayName: '',
        phoneNumber: ''
      }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(component.setPhoneContact()).toBeUndefined();
  });

  it('should removeCellPhoneContact', () => {
    expect(component.removePhoneContact()).toBeUndefined();
  });

  it('should call denyTransfiya', () => {
    expect(component.denyTransfiya).toBeFalse();
  });
});
