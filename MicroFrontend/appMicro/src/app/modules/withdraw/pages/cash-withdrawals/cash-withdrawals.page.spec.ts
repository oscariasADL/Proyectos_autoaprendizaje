import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { WithdrawFacadeMock } from '@testing/mocks/facade/withdraw.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { CashWithdrawalsPage } from './cash-withdrawals.page';
import { WITHDRAW } from '@app/commons/constants/navigate.constants';
import { GenericStepperBase } from '@app/modules/templates/generic-stepper/generic-stepper.base';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { SpiConsentServiceMock } from '@testing/mocks/services/spi-consent.service.mock';
import { FeatureFlagsBm } from '@app/store/state/parameter.state';

describe('CashWithdrawalsPage', () => {
  let component: CashWithdrawalsPage;
  let fixture: ComponentFixture<CashWithdrawalsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CashWithdrawalsPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: WithdrawFacade,
          useClass: WithdrawFacadeMock
        },
        { provide: SpiConsentService, useClass: SpiConsentServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CashWithdrawalsPage);
    component = fixture.componentInstance;
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

  it('should call cashWithdrawal', () => {
    expect((component as any).cashWithdrawal()).toBeUndefined();
  });

  it('should call super.setNextStep with provided data', async () => {
    const testData = { foo: 'bar' };
    const baseSpy = spyOn(
      GenericStepperBase.prototype,
      'setNextStep'
    ).and.returnValue(Promise.resolve());
    await component.setNextStep(testData);
    expect(baseSpy).toHaveBeenCalledWith(testData);
  });
});
