import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { ModifyInstallmentsComponent } from './modify-installments.component';

describe('ModifyInstallmentsComponent', () => {
  let component: ModifyInstallmentsComponent;
  let fixture: ComponentFixture<ModifyInstallmentsComponent>;
  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModifyInstallmentsComponent,
        CapitalizePipe,
        CurrencyFormatPipe
      ],
      imports: [TestingModule, IonicModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: UntypedFormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyInstallmentsComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      movement: {
        companyDescription: 'Compra cartera',
        purchaseDescription: 'Compra cartera'
      }
    });
    component.control = new UntypedFormControl();
    component.isDebitPurchaseControl = new UntypedFormControl();
    component.validatorInstallment =
      (isDebitPurchase: boolean) => (control: UntypedFormControl) => ({
        foo: true
      });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
