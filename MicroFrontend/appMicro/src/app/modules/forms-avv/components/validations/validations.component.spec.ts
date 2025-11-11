import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ValidationsComponent } from './validations.component';

describe('ValidationsComponent', () => {
  let component: ValidationsComponent;
  let fixture: ComponentFixture<ValidationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationsComponent],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationsComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormControl(null, [Validators.required]);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty array when no errors', () => {
    component.control = new UntypedFormControl('valid value');
    expect(component.errorMessages).toEqual([]);
  });

  it('should handle object validation errors', () => {
    const minlengthError = {
      minlength: {
        requiredLength: 5,
        actualLength: 3
      }
    };

    component.control = new UntypedFormControl('abc', [
      Validators.minLength(5)
    ]);
    component.control.setErrors(minlengthError);
    const messages = component.errorMessages;
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0]).toContain('5');
  });

  it('should handle multiple validation errors', () => {
    const multipleErrors = {
      required: true,
      minlength: {
        requiredLength: 5,
        actualLength: 3
      }
    };

    component.control = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);
    component.control.setErrors(multipleErrors);

    const messages = component.errorMessages;
    expect(messages.length).toBeGreaterThan(1);
  });

  it('should handle showRequired flag correctly', () => {
    component.showRequired = true;
    component.control = new UntypedFormControl('', [Validators.required]);

    expect(component.showErrors).toBeTruthy();

    component.showRequired = false;
    expect(component.showErrors).toBeFalsy();
  });
});
