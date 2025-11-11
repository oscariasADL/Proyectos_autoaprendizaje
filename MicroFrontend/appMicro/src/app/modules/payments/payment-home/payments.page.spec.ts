import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CREDITS } from '@commons/constants/navigate.constants';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { PaymentsFacade } from '@modules/payments/payment-home/payments.facade';
import { PaymentsFacadeMock } from '@testing/mocks/facade/payments.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { PaymentsPage } from './payments.page';

describe('PaymentsPage', () => {
  let component: PaymentsPage;
  let fixture: ComponentFixture<PaymentsPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);
    TestBed.configureTestingModule({
      declarations: [PaymentsPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: PaymentsFacade, useClass: PaymentsFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateTo', () => {
    expect(
      component.navigateTo({
        label: '',
        image: '',
        url: CREDITS
      })
    ).toBeUndefined();
  });
});
