import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { WithdrawFacadeMock } from '@testing/mocks/facade/withdraw.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { MoneyOrdersPage } from './money-orders.page';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { MoneyOrdersSlide } from './constants/money-orders.constants';
import { TransactionCostIds } from '@app/commons/entities/fee/fee.interface';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { SpiConsentServiceMock } from '@testing/mocks/services/spi-consent.service.mock';

describe('MoneyOrdersPage', () => {
  let component: MoneyOrdersPage;
  let fixture: ComponentFixture<MoneyOrdersPage>;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MoneyOrdersPage, ImageUrlPipe],
      imports: [IonicModule, GenericStepperMockModule, ReactiveFormsModule],
      providers: [
        {
          provide: WithdrawFacade,
          useClass: WithdrawFacadeMock
        },
        { provide: SpiConsentService, useClass: SpiConsentServiceMock },
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyOrdersPage);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.form;
    expect(form).toBeTruthy();
    expect(form.get('productOrigin')).toBeTruthy();
    expect(form.get('who')).toBeTruthy();
    expect(form.get('moneyOrderChannel')).toBeTruthy();
    expect(form.get('amount')).toBeTruthy();
    expect(form.get('fee')).toBeTruthy();
    expect(form.get('confirmation')).toBeTruthy();
  });

  it('should update description when moneyOrderChannel changes to ATM', () => {
    const form = component.form;
    form.get('moneyOrderChannel');

    form.controls.moneyOrderChannel.setValue(ChannelType.CB.toString());
    expect(component.data[MoneyOrdersSlide.amount].data.description).toEqual(
      'WITHDRAW.WITHOUT_CARD.SLIDE.AMOUNT.DESCRIPTION'
    );
  });

  it('should update description when moneyOrderChannel changes to other value', () => {
    const form = component.form;
    form.get('moneyOrderChannel');

    form.controls.moneyOrderChannel.setValue(ChannelType.ATM.toString());
    expect(
      component.data[MoneyOrdersSlide.amount].data.description
    ).toBeDefined();
  });

  it('should call feePayload and return correct data', () => {
    const prod = new ProductFactory().create();
    component.form.get('productOrigin').patchValue(prod);
    const feePayload = component.feePayload();
    expect(feePayload.accountId.toString()).toEqual(prod.id.toString());
    expect(feePayload.transactionId).toEqual(
      TransactionCostIds.WithdrawalMoneyOrder
    );
    expect(feePayload.accountType).toEqual(prod.type);
  });

  it('should call gmfPayload and return correct data', () => {
    const prod = new ProductFactory().create();
    component.form.get('productOrigin').patchValue(prod);
    component.form.get('amount').patchValue(400);

    const gmfPayload = component.gmfPayload();
    expect(gmfPayload.productNumber).toEqual(prod.numberProduct);
    expect(gmfPayload.amountTransaction).toEqual(400);
  });

  it('should call moneyOrder when form is valid', () => {
    const form = component.form;
    const prod = new ProductFactory().create();
    form.get('productOrigin').patchValue(prod);
    form.get('who').setValue('John Doe');
    form.get('amount').setValue(100);

    component.moneyOrder();
    expect(form).toBeTruthy();
  });

  it('should call moneyOrder', () => {
    expect((component as any).moneyOrder()).toBeUndefined();
  });
});
