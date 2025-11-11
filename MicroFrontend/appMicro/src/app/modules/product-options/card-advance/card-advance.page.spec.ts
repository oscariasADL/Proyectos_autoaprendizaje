import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShareFacade } from '@commons/components/share/share.facade';
import { IonicModule } from '@ionic/angular';
import { CardAdvanceFacade } from '@modules/product-options/card-advance/card-advance.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { CardAdvanceFacadeMock } from '@testing/mocks/facade/card-advance.facade.mock';
import { ShareFacadeMock } from '@testing/mocks/facade/share.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { CardAdvancePage } from './card-advance.page';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  CardAdvanceSlide,
  CardAdvanceStep
} from '@modules/product-options/card-advance/constants/card-advance.constants';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';

describe('CardAdvancePage', () => {
  let component: CardAdvancePage;
  let fixture: ComponentFixture<CardAdvancePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardAdvancePage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: CardAdvanceFacade,
          useClass: CardAdvanceFacadeMock
        },
        {
          provide: ShareFacade,
          useClass: ShareFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardAdvancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.feePayload().accountId.toString()).toEqual(
      prod.id.toString()
    );
  });

  it('should call cardAdvance', () => {
    const prod = new ProductFactory().create();
    component.form.get('fromProduct').patchValue(prod);
    expect(component.cardAdvance()).toBeUndefined();
  });

  it('should call super.stepSelected when step.id is not CardAdvanceSlide.from', () => {
    const step: Step = {
      id: CardAdvanceStep[CardAdvanceSlide.toward],
      label: 'Test Step'
    };
    const superStepSelectedSpy = spyOn(
      GenericStepperBase.prototype,
      'stepSelected'
    );

    component.stepSelected(step);

    expect(superStepSelectedSpy).toHaveBeenCalledWith(step);
  });

  it('should not call super.stepSelected when step.id is CardAdvanceSlide.from', () => {
    const step: Step = {
      id: CardAdvanceStep[CardAdvanceSlide.from],
      label: 'From Step'
    };
    const superStepSelectedSpy = spyOn(
      GenericStepperBase.prototype,
      'stepSelected'
    );

    component.stepSelected(step);

    expect(superStepSelectedSpy).not.toHaveBeenCalled();
  });
});
