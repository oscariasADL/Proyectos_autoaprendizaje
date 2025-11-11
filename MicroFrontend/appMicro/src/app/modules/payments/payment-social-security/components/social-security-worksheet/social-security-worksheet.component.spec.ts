import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { PaymentSocialSecurityFacadeMock } from '@testing/mocks/facade/payment-social-security.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';
import { Observable, of } from 'rxjs';
import { PaymentSocialSecurityWorksheetType } from '../../entities/social-security.interface';
import { PaymentSocialSecurityFacade } from '../../payment-social-security.facade';
import {
  fetchSocialSecurityDataByPinErrorAction,
  fetchSocialSecurityDataByPinSuccessAction,
  fetchSocialSecurityDataByReferenceErrorAction
} from '../../store/payment-social-security.actions';
import { SocialSecurityWorksheetComponent } from './social-security-worksheet.component';

describe('SocialSecurityWorksheetComponent', () => {
  let component: SocialSecurityWorksheetComponent;
  let fixture: ComponentFixture<SocialSecurityWorksheetComponent>;
  let actions$ = new Observable<Action>();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SocialSecurityWorksheetComponent],
      imports: [TestingModule, IonicModule, FormsModule, ReactiveFormsModule],
      providers: [
        provideMockActions(() => actions$),
        { provide: AlertService, useClass: AlertServiceMock },
        {
          provide: PaymentSocialSecurityFacade,
          useClass: PaymentSocialSecurityFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialSecurityWorksheetComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormBuilder().group({
      worksheetActiveType: null,
      worksheetNumber: null,
      worksheetDate: null,
      worksheet: [new UntypedFormControl()],
      contributor: [{ documentType: 'CC', documentId: '123' }],
      value: null
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call checkWorksheet', () => {
    expect(component.checkWorksheet()).toBeUndefined();
  });

  it('should be call setActiveType', () => {
    Object.keys(PaymentSocialSecurityWorksheetType).forEach((key) =>
      expect(
        component.setActiveType(PaymentSocialSecurityWorksheetType[key])
      ).toBeUndefined()
    );
  });

  it('should be call checkWorksheet', () => {
    spyOn(component.continue, 'emit');
    spyOnProperty(component, 'isValidForm').and.returnValue(true);
    spyOnProperty(component, 'isHasWorksheet').and.returnValue(true);
    actions$ = of(
      fetchSocialSecurityDataByPinErrorAction({
        message: ''
      })
    );
    component.checkWorksheet();
    actions$ = of(
      fetchSocialSecurityDataByReferenceErrorAction({
        message: ''
      })
    );
    component.checkWorksheet();
    actions$ = of(
      fetchSocialSecurityDataByPinSuccessAction({
        data: {
          referenceId: '',
          agreementType: 1000,
          invoiceNumber: '',
          maxPaymentDateComplete: '',
          amount: 1000,
          amountType: '',
          biller: true
        }
      })
    );
    component.checkWorksheet();
    expect(component.continue.emit).toHaveBeenCalled();
  });

  it('should openPicker', () => {
    expect(component.openPicker).toBeDefined();
  });
});
