import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from './validation-messages.component';

describe('ValidationMessagesComponent', () => {
  let component: ValidationMessagesComponent;
  let fixture: ComponentFixture<ValidationMessagesComponent>;

  const control: UntypedFormControl = new UntypedFormControl(null, [
    Validators.required
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationMessagesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    component = fixture.componentInstance;
    component.control = control;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call errorMessages', () => {
    expect(component.errorMessages).toBeTruthy();
  });

  it('should return boolean, get isErrorMessage', () => {
    expect(component.isErrorMessage).toBeDefined();
    expect(component.isErrorMessage).toEqual(jasmine.any(Boolean));
  });

  it('should return string[], errorMessages() ', () => {
    expect(component.errorMessages).toBeDefined();
    component.control.setErrors({ required: 'Este campo es requerido' });
    expect(component.errorMessages).toEqual(['Este campo es requerido']);
  });
});
