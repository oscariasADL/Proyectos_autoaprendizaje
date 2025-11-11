import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  PayLoanSlide,
  PayLoanStep
} from '@modules/payments/payment-credits/constants/pay-loan.constants';
import { mapPayLoanSlides } from '@modules/payments/payment-credits/mappers/pay-loan-slides.mapper';
import { ProductFactory } from '@testing/factories/product.factory';
import { GenericStepperBodyComponent } from './generic-stepper-body.component';
import { SlideType } from '@app/modules/forms-avv/entities/stepper.interface';

describe('GenericStepperBodyComponent', () => {
  let component: GenericStepperBodyComponent;
  let fixture: ComponentFixture<GenericStepperBodyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GenericStepperBodyComponent],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericStepperBodyComponent);
    component = fixture.componentInstance;

    component.steps = [];
    const form = new UntypedFormBuilder().group({
      fromProduct: new ProductFactory().create(),
      confirmation: null
    });
    component.data = mapPayLoanSlides(form);
    component.swiper = jasmine.createSpyObj('IonSlides', ['slideTo']);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setNextStep', () => {
    spyOn(component.nextStep, 'emit');
    component.setNextStep('', true);
    expect(component.nextStep.emit).toHaveBeenCalled();
  });

  it('should call setSlideSelected', () => {
    spyOn(component.slideSelected, 'emit');
    component.setSlideSelected('');
    expect(component.slideSelected.emit).toHaveBeenCalled();
  });

  it('should set current slide', () => {
    component.currentSlide = PayLoanSlide.from;
    expect(component.currentStep).toEqual(PayLoanStep[PayLoanSlide.from]);
    component.currentSlide = null;
    expect(component.currentStep).toEqual(1);
  });
  it('should return true when the index equals _currentSlide', () => {
    (component as any)._currentSlide = 1;
    (component as any)._nextSlide = 2; // setting _nextSlide to a different value
    expect(component.isVisible(1)).toBeTrue();
  });
  it('should return true when the index equals _nextSlide', () => {
    (component as any)._currentSlide = 1;
    (component as any)._nextSlide = 2;
    expect(component.isVisible(2)).toBeTrue();
  });
  it('should return false when the index does not equal _currentSlide or _nextSlide', () => {
    (component as any)._currentSlide = 1;
    (component as any)._nextSlide = 2;
    expect(component.isVisible(3)).toBeFalse();
  });

  it('should return SlideType from the stepType getter', () => {
    expect(component.stepType).toEqual(SlideType);
  });

  it('should update _currentSlide and _nextSlide with provided parameters', () => {
    (component as any).setCurrentSlide(3, 4);

    expect((component as any)._currentSlide).toEqual(3);
    expect((component as any)._nextSlide).toEqual(4);
  });
  it('should update _currentSlide using default currentSlide value from _nextSlide and set _nextSlide to null when no parameters provided', () => {
    (component as any)._nextSlide = 7;

    (component as any).setCurrentSlide();

    expect((component as any)._currentSlide).toEqual(7);
    expect((component as any)._nextSlide).toBeNull();
  });
});
