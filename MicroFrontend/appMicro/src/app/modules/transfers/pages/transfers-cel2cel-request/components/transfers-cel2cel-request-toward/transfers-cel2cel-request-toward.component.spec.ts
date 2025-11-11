import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfersCel2celRequestTowardComponent } from './transfers-cel2cel-request-toward.component';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';

describe('TransfersCel2celRequestTowardComponent', () => {
  let component: TransfersCel2celRequestTowardComponent;
  let fixture: ComponentFixture<TransfersCel2celRequestTowardComponent>;
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
      declarations: [TransfersCel2celRequestTowardComponent],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersCel2celRequestTowardComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      contactData: new UntypedFormControl(),
      phoneNumber: new UntypedFormControl(),
      amount: new UntypedFormControl(),
      addenda: new UntypedFormControl()
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
    expect(component.setPhoneNumberContact()).toBeUndefined();
  });

  /*it('should setCellPhoneContact null', () => {
    modalSpy.onDidDismiss.and.callFake(async () => {});
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(component.setPhoneNumberContact()).toBeUndefined();
  });*/

  it('should removeCellPhoneContact', () => {
    expect(component.removePhoneNumberContact()).toBeUndefined();
  });

  it('should call denyTransfiya', () => {
    expect(component.denyTransfiya).toBeFalse();
  });

  it('should setNoteValue', () => {
    spyOn(component, 'setNoteValue').and.callThrough();
    component.setNoteValue();
    expect(component.setNoteValue).toBeDefined();
  });
});
