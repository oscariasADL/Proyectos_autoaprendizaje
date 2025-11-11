import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfersBaseAccountsTowardComponent } from './transfers-base-accounts-toward.component';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TransfersBaseAccountsTowardComponent', () => {
  let component: TransfersBaseAccountsTowardComponent;
  let fixture: ComponentFixture<TransfersBaseAccountsTowardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersBaseAccountsTowardComponent],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersBaseAccountsTowardComponent);
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
