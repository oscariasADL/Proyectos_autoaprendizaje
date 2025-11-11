import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransfersAvvAccountTowardAccountComponent } from '@modules/transfers/pages/transfers-avv-account/components/transfers-avv-account-toward-account/transfers-avv-account-toward-account.component';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { TestingModule } from '@testing/testing.module';

describe('TransfersAvvAccountTowardAccountComponent', () => {
  let component: TransfersAvvAccountTowardAccountComponent;
  let fixture: ComponentFixture<TransfersAvvAccountTowardAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersAvvAccountTowardAccountComponent],
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
      TransfersAvvAccountTowardAccountComponent
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
