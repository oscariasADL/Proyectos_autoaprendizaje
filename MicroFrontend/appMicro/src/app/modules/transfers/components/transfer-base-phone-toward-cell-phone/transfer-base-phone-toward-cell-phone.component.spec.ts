import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferBasePhoneTowardCellPhoneComponent } from './transfer-base-phone-toward-cell-phone.component';
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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TransferBasePhoneTowardCellPhoneComponent', () => {
  let component: TransferBasePhoneTowardCellPhoneComponent;
  let fixture: ComponentFixture<TransferBasePhoneTowardCellPhoneComponent>;
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
      declarations: [TransferBasePhoneTowardCellPhoneComponent],
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
      TransferBasePhoneTowardCellPhoneComponent
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

  it('should get amount', () => {
    expect(component.amount).toBeTruthy();
  });
});
