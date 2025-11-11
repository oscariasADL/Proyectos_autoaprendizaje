import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PaymentServiceCardComponent } from './payment-service-card.component';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TestingModule } from '@testing/testing.module';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';

describe('PaymentServiceCardComponent', () => {
  let component: PaymentServiceCardComponent;
  let fixture: ComponentFixture<PaymentServiceCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentServiceCardComponent,
        CurrencyFormatPipe,
        CapitalizePipe
      ],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentServiceCardComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(true);
    component.bill = new PaymentBillFactory().create();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
