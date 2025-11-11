import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { of } from 'rxjs';

import { TestingModule } from '@testing/testing.module';
import { CreateSchedulingConfirmComponent } from './create-scheduling-confirm.component';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { ProductFactory } from '@testing/factories/product.factory';

describe('CreateSchedulingConfirmComponent', () => {
  let component: CreateSchedulingConfirmComponent;
  let fixture: ComponentFixture<CreateSchedulingConfirmComponent>;
  const navCtrlSpy = jasmine.createSpyObj('NavController', [
    'navigateForward',
    'back'
  ]);
  const bill = new PaymentBillFactory().create();
  const product = new ProductFactory().create();
  let facade: PaymentServicesFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSchedulingConfirmComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        },
        {
          provide: NavController,
          useValue: navCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSchedulingConfirmComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(PaymentServicesFacade);
    spyOn(facade, 'findProductByProductId').and.returnValue(of(product));
    spyOn(facade.billSelected$, 'currentValue').and.returnValue(bill);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call createScheduling', () => {
    const isEditSpy = spyOnProperty(component, 'isEdit');

    isEditSpy.and.returnValue(true);
    expect(component.createScheduling()).toBe(void 0);

    isEditSpy.and.returnValue(false);
    expect(component.createScheduling()).toBe(void 0);
  });

  it('should be call editInfo', () => {
    expect(component.editInfo()).toBe(void 0);
  });

  it('should be call isEdit and return boolean', () => {
    expect(component.isEdit).toBeFalse();
  });
});
