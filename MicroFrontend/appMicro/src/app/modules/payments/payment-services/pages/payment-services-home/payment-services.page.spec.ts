import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { PaymentServicesFacadeMock } from '@testing/mocks/facade/payment-services.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PaymentServicesPage } from './payment-services.page';
import { AlertService } from '@commons/services/alert.service';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';

describe('PaymentServicesPage', () => {
  let component: PaymentServicesPage;
  let fixture: ComponentFixture<PaymentServicesPage>;
  let service: AlertService;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);
    TestBed.configureTestingModule({
      declarations: [PaymentServicesPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: PaymentServicesFacade,
          useClass: PaymentServicesFacadeMock
        },
        { provide: NavController, useValue: navControlSpy },
        { provide: AlertService, useClass: AlertServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentServicesPage);
    component = fixture.componentInstance;
    service = TestBed.inject(AlertService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call payBill', () => {
    expect(
      component.payBill(new PaymentBillFactory().create())
    ).toBeUndefined();
  });

  it('should call goToHome', () => {
    component.services$.subscribe();
    component.hasServices$.subscribe();
    expect(component.goToHome()).toBeUndefined();
  });

  it('should be call scheduleBill', () => {
    expect(component.scheduleBill(new PaymentBillFactory().create())).toBe(
      void 0
    );
  });

  it('should be call editScheduledBill', () => {
    expect(component.editScheduledBill(new PaymentBillFactory().create())).toBe(
      void 0
    );
  });

  it('should be call removeScheduledBill', () => {
    const alertServiceSpy = spyOn(service, 'create');
    alertServiceSpy.and.returnValue(Promise.resolve(true));
    expect(
      component.removeScheduledBill(new PaymentBillFactory().create())
    ).toBe(void 0);
  });

  it('should be call getProduct', () => {
    component.getProduct('32456').subscribe((data) => {
      expect(data).toEqual({});
    });
  });
});
