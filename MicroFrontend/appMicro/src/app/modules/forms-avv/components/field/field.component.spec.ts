import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvvInputType, InputType } from '../../entities/input.interface';
import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FieldComponent],
      imports: [IonicModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormControl();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngAfterViewInit', () => {
    component.autoFocus = true;
    const input = document.createElement('input');
    input.id = component.id;
    document.body.appendChild(input);
    expect(component.ngAfterViewInit()).toBeUndefined();
  });

  it('should validate initInputType', () => {
    component.type = AvvInputType.email;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.email);
    component.type = AvvInputType.password;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.password);
    component.type = AvvInputType.number;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.number);
    component.type = '';
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.text);
  });
  it('should blur input on Enter key press', () => {
    const mockEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    const mockInput = {
      nativeElement: {
        blur: jasmine.createSpy('blur')
      }
    };
    component.input = mockInput;
    component.keyUp(mockEvent);
    expect(mockInput.nativeElement.blur).toHaveBeenCalled();
  });

  it('should not blur input on non-Enter key press', () => {
    const mockEvent = new KeyboardEvent('keyup', { key: 'A' });
    const mockInput = {
      nativeElement: {
        blur: jasmine.createSpy('blur')
      }
    };
    component.input = mockInput;
    component.keyUp(mockEvent);
    expect(mockInput.nativeElement.blur).not.toHaveBeenCalled();
  });
  describe('isErrorMessage', () => {
    beforeEach(() => {
      component.control = new UntypedFormControl('', [Validators.required]);
    });

    it('should return true when control is invalid, dirty, has errors and not pending', () => {
      component.control.markAsDirty();
      component.control.setErrors({ required: true });
      component.control.markAsTouched();
      expect(component.isErrorMessage).toBeTruthy();
    });

    it('should return false when control is valid', () => {
      component.control.setValue('valid value');
      component.control.markAsDirty();
      component.control.markAsTouched();
      expect(component.isErrorMessage).toBeFalsy();
    });

    it('should return false when control is pristine', () => {
      expect(component.isErrorMessage).toBeFalsy();
    });

    it('should return false when control has no errors', () => {
      component.control.markAsDirty();
      component.control.markAsTouched();
      component.control.setErrors(null);
      expect(component.isErrorMessage).toBeFalsy();
    });

    it('should return false when control is pending', () => {
      component.control.markAsDirty();
      component.control.markAsTouched();
      component.control.setErrors({ required: true });
      spyOnProperty(component.control, 'pending').and.returnValue(true);
      expect(component.isErrorMessage).toBeFalsy();
    });

    it('should return false when control errors object is empty', () => {
      component.control.markAsDirty();
      component.control.markAsTouched();
      component.control.setErrors({});
      expect(component.isErrorMessage).toBeFalsy();
    });
  });
});
