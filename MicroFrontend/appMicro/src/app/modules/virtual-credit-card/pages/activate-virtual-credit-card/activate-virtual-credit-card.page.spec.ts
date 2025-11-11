import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivateVirtualCreditCardPage } from './activate-virtual-credit-card.page';
import { IonicModule } from '@ionic/angular';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { VirtualCreditCardFacadeMock } from '@testing/mocks/facade/virtual-credit-card.facade.mock';
import { of } from 'rxjs';
import {
  ACTIVATE_VIRTUAL_CREDIT_CARD_STEP,
  ActivateVirtualCreditCardSlide
} from '@modules/virtual-credit-card/pages/activate-virtual-credit-card/constants/activate-virtual-credit-card.constants';

describe('ActivateVirtualCreditCardPage', () => {
  let component: ActivateVirtualCreditCardPage;
  let fixture: ComponentFixture<ActivateVirtualCreditCardPage>;
  let facade: VirtualCreditCardFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateVirtualCreditCardPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: VirtualCreditCardFacade,
          useClass: VirtualCreditCardFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateVirtualCreditCardPage);
    component = fixture.componentInstance;
    spyOnProperty(component, 'productSelected$').and.returnValue(
      of({ id: '23232' })
    );
    facade = TestBed.inject(VirtualCreditCardFacade);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be call activateVirtualCreditCard', () => {
    const createVirtualCreditCardSpy = spyOn(facade, 'createVirtualCreditCard');
    component.form.setValue({
      fromProduct: { id: '78348743' },
      amount: '23233',
      confirmation: null
    });
    fixture.detectChanges();
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    component.activateVirtualCreditCard();
    expect(createVirtualCreditCardSpy).toHaveBeenCalled();
  });

  it('should be call stepSelected', () => {
    expect(
      component.stepSelected({
        id: ACTIVATE_VIRTUAL_CREDIT_CARD_STEP[
          ActivateVirtualCreditCardSlide.from
        ],
        label: ''
      })
    ).toBe(void 0);
  });

  it('should be defined activateUrlBackTo$', () => {
    expect(component.activateUrlBackTo$).toBeDefined();
  });

  it('should be defined productSelected$', () => {
    expect(component.productSelected$).toBeDefined();
  });
});
