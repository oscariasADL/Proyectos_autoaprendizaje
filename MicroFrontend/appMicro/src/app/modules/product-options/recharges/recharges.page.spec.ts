import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';
import { RechargesFacadeMock } from '@testing/mocks/facade/recharges.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { RechargesFacade } from './recharges.facade';
import { RechargesPage } from './recharges.page';

describe('RechargesPage', () => {
  let component: RechargesPage;
  let fixture: ComponentFixture<RechargesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RechargesPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [{ provide: RechargesFacade, useClass: RechargesFacadeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RechargesPage);
    component = fixture.componentInstance;
    component.form = new UntypedFormBuilder().group({
      productOrigin: [null],
      amount: [null],
      phoneNumber: [null],
      displayName: [null],
      mobileOperator: [null],
      fee: [null],
      confirmation: [null]
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const prod = new ProductFactory().create();
    component.form.get('productOrigin').patchValue(prod);
    expect(component.feePayload().accountId.toString()).toEqual(
      prod.id.toString()
    );
  });
});
