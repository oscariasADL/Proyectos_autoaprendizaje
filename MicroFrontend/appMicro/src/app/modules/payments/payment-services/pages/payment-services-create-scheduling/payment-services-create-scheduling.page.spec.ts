import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentServicesCreateSchedulingPage } from './payment-services-create-scheduling.page';
import { TestingModule } from '@testing/testing.module';

describe('PaymentServicesCreateSchedulingPage', () => {
  let component: PaymentServicesCreateSchedulingPage;
  let fixture: ComponentFixture<PaymentServicesCreateSchedulingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentServicesCreateSchedulingPage],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentServicesCreateSchedulingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
