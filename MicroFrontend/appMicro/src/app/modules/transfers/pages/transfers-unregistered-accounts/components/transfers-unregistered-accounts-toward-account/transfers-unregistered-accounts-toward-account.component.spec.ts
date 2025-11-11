import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransfersUnregisteredAccountsTowardAccountComponent } from '@modules/transfers/pages/transfers-unregistered-accounts/components/transfers-unregistered-accounts-toward-account/transfers-unregistered-accounts-toward-account.component';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TestingModule } from '@testing/testing.module';

describe('TransfersUnregisteredAccountsTowardAccountComponent', () => {
  let component: TransfersUnregisteredAccountsTowardAccountComponent;
  let fixture: ComponentFixture<TransfersUnregisteredAccountsTowardAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersUnregisteredAccountsTowardAccountComponent],
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
      TransfersUnregisteredAccountsTowardAccountComponent
    );
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      towardAccount: new UntypedFormControl(),
      towardAccountType: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
