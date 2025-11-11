import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { TransfersUnregisteredAccountsToWhoComponent } from './transfers-unregistered-accounts-to-who.component';

describe('TransfersUnregisteredAccountsToWhoComponent', () => {
  let component: TransfersUnregisteredAccountsToWhoComponent;
  let fixture: ComponentFixture<TransfersUnregisteredAccountsToWhoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersUnregisteredAccountsToWhoComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(
      TransfersUnregisteredAccountsToWhoComponent
    );
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      amount: new UntypedFormControl(),
      towardAccountType: new UntypedFormControl(),
      towardAccount: new UntypedFormControl(),
      transferType: new UntypedFormControl(),
      phoneNumber: new UntypedFormControl(),
      contactData: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setTowardAccounts', () => {
    expect(component.setTowardAccounts()).toBeUndefined();
  });

  it('should call setTowardCellPhone', () => {
    expect(component.setTowardCellPhone()).toBeUndefined();
  });
});
