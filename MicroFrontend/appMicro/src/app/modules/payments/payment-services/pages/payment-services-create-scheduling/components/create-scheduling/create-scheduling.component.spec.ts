import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { of } from 'rxjs';

import { CreateSchedulingComponent } from './create-scheduling.component';
import { TestingModule } from '@testing/testing.module';

import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { LastWordPipe } from '@commons/pipes/last-word.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { ProductFactory } from '@testing/factories/product.factory';

describe('CreateSchedulingComponent', () => {
  let component: CreateSchedulingComponent;
  let fixture: ComponentFixture<CreateSchedulingComponent>;
  const navCtrl = jasmine.createSpyObj('navCtrl', ['navigateForward']);
  const formBuilder: FormBuilder = new FormBuilder();
  const bill = new PaymentBillFactory().create();
  let facade: PaymentServicesFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateSchedulingComponent,
        LastWordPipe,
        CurrencyFormatPipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: PaymentServicesFacade, useClass: PaymentServicesFacadeMock },
        { provide: NavController, useValue: navCtrl }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSchedulingComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(PaymentServicesFacade);
    spyOn(facade, 'findProductByProductId').and.returnValue(
      of(new ProductFactory().create())
    );
    spyOn(facade.billSelected$, 'currentValue').and.returnValue(bill);
    spyOnProperty(component, 'isEdit').and.returnValue(true);
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should be call continue', async () => {
    component.form.setValue({
      productId: '3333',
      scheduleType: '1',
      maxAmountRecurring: '2222'
    });
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    expect(await component.continue()).toBe(void 0);
  });

  it('should be call selectProduct', async () => {
    const product = new ProductFactory().create();
    component.selectProduct(product);
    expect(component.form.get('productId').value).toEqual(product);
  });

  it('should be call isEdit and return boolean', async () => {
    expect(component.isEdit).toBeTrue();
  });
});
