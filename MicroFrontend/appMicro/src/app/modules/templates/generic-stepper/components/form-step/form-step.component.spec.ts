import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { StepperExceptions } from '../../entities/generic-stepper.entity';
import { FormStepComponent } from './form-step.component';

describe('FormStepComponent', () => {
  let component: FormStepComponent;
  let fixture: ComponentFixture<FormStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormStepComponent],
      imports: [TestingModule, IonicModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FormStepComponent);
    component = fixture.componentInstance;
    component.data = { form: [] };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setNextStep', () => {
    spyOn(component.nextStep, 'emit');
    component.setNextStep();
    expect(component.nextStep.emit).toHaveBeenCalled();
  });

  it('should closeStepper', () => {
    spyOn(component.nextStep, 'emit');
    component.closeStepper();
    expect(component.nextStep.emit).toHaveBeenCalledWith(
      StepperExceptions.closeStepper
    );
  });
});
