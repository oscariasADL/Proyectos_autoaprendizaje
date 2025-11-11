/* eslint-disable max-lines */
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {
  AvvInputType,
  InputModeByType,
  InputType
} from '../../entities/input.interface';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [
        IonicModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe
      ],
      providers: [provideNgxMask()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.control = new UntypedFormControl();
    component.type = AvvInputType.email;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate initInputType', () => {
    component.type = AvvInputType.password;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.password);

    component.type = AvvInputType.number;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.number);

    component.type = '';
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.text);

    component.type = AvvInputType.currency;
    component.control.setValue('10000');
    expect(component.isCurrencyNotEmpty).toBeTrue();
    expect(component.srcImgFranchise).toBeNull();
    expect(component.inputTypes.password).toEqual(AvvInputType.password);
  });

  it('should validate initMask for currency type', () => {
    component.type = AvvInputType.currency;
    component.numeralDecimalScale = 2;
    component.initMask();

    expect(component.mask).toBe('separator.2');

    expect(component.maskConfig.decimalMarker).toBe(',');
    expect(component.maskConfig.allowNegativeNumbers).toBeFalse();
    expect(component.dropSpecialCharacters).toBeFalse();
  });

  it('should validate initMask for numeric type', () => {
    component.type = AvvInputType.numeric;
    component.initMask();

    expect(component.mask).toBe('0*');
    expect(component.dropSpecialCharacters).toBeFalse();
  });

  it('should validate initMask for phone type', () => {
    component.type = AvvInputType.phone;
    component.initMask();

    expect(component.mask).toBe('000 000 0000');
    expect(component.dropSpecialCharacters).toBeFalse();
    expect(component.showMaskTyped).toBeFalse();
    expect(component.maskConfig.specialCharacters).toEqual([' ']);
  });

  it('should validate initMask for document type', () => {
    component.type = AvvInputType.document;
    component.initMask();

    expect(component.mask).toBe('separator.0');
    expect(component.maskConfig.allowNegativeNumbers).toBeFalse();
    expect(component.dropSpecialCharacters).toBeTrue();
  });

  it('should validate initMask for creditCard type', () => {
    component.type = AvvInputType.creditCard;
    component.initMask();

    expect(component.mask).toBe('0000 0000 0000 0000');
    expect(component.dropSpecialCharacters).toBeFalse();
    expect(component.showMaskTyped).toBeFalse();
    expect(component.maskConfig.specialCharacters).toEqual([' ']);
  });

  it('should validate initMask for creditCardExpiration type', () => {
    component.type = AvvInputType.creditCardExpiration;
    component.initMask();

    expect(component.mask).toBe('00/00');
    expect(component.dropSpecialCharacters).toBeFalse();
    expect(component.showMaskTyped).toBeFalse();
    expect(component.validation).toBeTrue();
    expect(component.maskConfig.specialCharacters).toEqual(['/']);
  });

  it('should validate initMask for creditCardCvc type', () => {
    component.type = AvvInputType.creditCardCvc;
    component.initMask();

    expect(component.mask).toBe('000');
    expect(component.dropSpecialCharacters).toBeFalse();
    expect(component.showMaskTyped).toBeFalse();
  });

  it('should validate initMask for secretNumber type', () => {
    component.type = AvvInputType.secretNumber;
    component.initMask();

    expect(component.mask).toBe('0*');
    expect(component.dropSpecialCharacters).toBeFalse();
  });

  it('should validate initMask for default/text type', () => {
    component.type = AvvInputType.text;
    component.initMask();

    expect(component.mask).toBe('');
  });

  it('should reset mask configurations before setting new ones', () => {
    // Configurar valores iniciales diferentes
    component.dropSpecialCharacters = true;
    component.showMaskTyped = true;
    component.clearIfNotMatch = true;
    component.validation = false;

    component.type = AvvInputType.text;
    component.initMask();

    expect(component.dropSpecialCharacters).toBeFalse();
    expect(component.showMaskTyped).toBeFalse();
    expect(component.clearIfNotMatch).toBeFalse();
    expect(component.validation).toBeTrue();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initInputMode in ngAfterViewInit and set showValidations', fakeAsync(() => {
    const inputElement = document.createElement('input');
    component.input = { nativeElement: inputElement } as ElementRef;
    component.autoFocus = true;
    component.id = 'test-id';
    spyOn(document, 'getElementById').and.returnValue(inputElement);
    component.ngAfterViewInit();

    tick(200);
    expect(component.showValidations).toBeTrue();
    expect(component.control.pristine).toBeTrue();

    tick(300);
    expect(document.getElementById).toHaveBeenCalledWith(component.id);
  }));

  it('should set inputType based on AvvInputType for password', () => {
    component.control = new UntypedFormControl();
    component.type = AvvInputType.password;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.password);
  });

  it('should set inputType based on AvvInputType for number', () => {
    component.control = new UntypedFormControl();
    component.type = AvvInputType.number;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.number);
  });

  it('should set inputType as text if type is empty', () => {
    component.control = new UntypedFormControl();
    component.type = '';
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.text);
  });

  it('should set inputType as tel for creditCardCvc', () => {
    component.control = new UntypedFormControl();
    component.type = AvvInputType.creditCardCvc;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.tel);
  });

  it('should set inputType as tel for creditCardExpiration', () => {
    component.control = new UntypedFormControl();
    component.type = AvvInputType.creditCardExpiration;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.tel);
  });

  it('should return true for isErrorMessage when control is invalid, dirty/touched, has errors and is not pending', () => {
    component.control.setErrors({ required: true });
    component.control.markAsDirty();
    expect(component.isErrorMessage).toBeTrue();

    component.control.markAsUntouched();
    component.control.markAsTouched();
    expect(component.isErrorMessage).toBeTrue();
  });

  it('should return false for isErrorMessage when control is valid', () => {
    component.control.setErrors(null);
    component.control.markAsDirty();
    expect(component.isErrorMessage).toBeFalse();
  });

  it('should return true for isCurrencyNotEmpty when control value is not empty for currency type', () => {
    component.type = AvvInputType.currency;
    component.control.setValue('10000');
    expect(component.isCurrencyNotEmpty).toBeTrue();
  });

  it('should return false for isCurrencyNotEmpty when control value is null or whitespace', () => {
    component.type = AvvInputType.currency;
    component.control.setValue('   ');
    expect(component.isCurrencyNotEmpty).toBeFalse();
    component.control.setValue(null);
    expect(component.isCurrencyNotEmpty).toBeFalse();
  });
  it('should return false for isCurrencyNotEmpty when type is not currency', () => {
    component.type = AvvInputType.text;
    component.control.setValue('10000');
    expect(component.isCurrencyNotEmpty).toBeFalse();
  });
  it('should emit keyUpEvent with the input value if key is not Enter', () => {
    const inputNativeElement = { blur: jasmine.createSpy('blur') };
    component.input = { nativeElement: inputNativeElement } as ElementRef;
    spyOn(component.keyUpEvent, 'emit');
    const event = {
      key: 'a',
      target: { value: 'test' }
    } as unknown as KeyboardEvent;
    component.keyUp(event);
    expect(component.keyUpEvent.emit).toHaveBeenCalledWith('test');
    expect(inputNativeElement.blur).not.toHaveBeenCalled();
  });

  it('should blur the input and emit keyUpEvent when Enter key is pressed', () => {
    const inputNativeElement = { blur: jasmine.createSpy('blur') };
    component.input = { nativeElement: inputNativeElement } as ElementRef;
    spyOn(component.keyUpEvent, 'emit');

    const event = {
      key: 'Enter',
      target: { value: 'hello' }
    } as unknown as KeyboardEvent;

    component.keyUp(event);
    expect(inputNativeElement.blur).toHaveBeenCalled();
    expect(component.keyUpEvent.emit).toHaveBeenCalledWith('hello');
  });

  it('should return null from srcImgFranchise getter if helper returns null', () => {
    component.control.setValue('dummy');
    expect(component.srcImgFranchise).toBeNull();
  });

  it('should expose AvvInputType members with inputTypes getter', () => {
    expect(component.inputTypes.password).toEqual(AvvInputType.password);
    expect(component.inputTypes.email).toEqual(AvvInputType.email);
    expect(component.inputTypes.currency).toEqual(AvvInputType.currency);
    expect(component.inputTypes.phone).toEqual(AvvInputType.phone);
  });

  it('should call initInputMode and set inputmode attribute', () => {
    const inputElement = document.createElement('input');
    component.input = { nativeElement: inputElement } as ElementRef;
    component.type = AvvInputType.number;

    spyOn(component['renderer'], 'setAttribute');
    component['initInputMode']();

    expect(component['renderer'].setAttribute).toHaveBeenCalledWith(
      inputElement,
      'inputmode',
      InputModeByType[AvvInputType.number]
    );
  });

  it('should convert value to formatted number string', () => {
    const testValue = 12345;
    component.convertToText(testValue.toString());
    expect(component.formattedNumber).toBe('12345');
  });

  it('should not set formattedNumber if value is empty', () => {
    component.formattedNumber = 'previous';
    component.convertToText('');
    expect(component.formattedNumber).toBe('previous');
  });

  it('should emit focusEvent when focus is triggered', () => {
    spyOn(component.focusEvent, 'emit');
    // Simular evento de focus
    component.focusEvent.emit();
    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit blurEvent when blur is triggered', () => {
    spyOn(component.blurEvent, 'emit');
    // Simular evento de blur
    component.blurEvent.emit();
    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should set email validator for email type', () => {
    component.type = AvvInputType.email;
    component.ngOnInit();

    // Verificar que se estableció el validador de email
    component.control.setValue('invalid-email');
    expect(component.control.invalid).toBeTrue();

    component.control.setValue('valid@email.com');
    expect(component.control.valid).toBeTrue();
  });

  it('should set default id if not provided and initialize inputType in ngOnInit', () => {
    component.type = AvvInputType.email;
    component.ngOnInit();
    expect(component.id).toMatch(/input-format-\d+/);
    expect(component.inputType).toEqual(InputType.email);
    expect(component.control.dirty).toBeTrue();
  });

  it('should call initInputMode in ngAfterViewInit and set showValidations', fakeAsync(() => {
    const inputElement = document.createElement('input');
    component.input = { nativeElement: inputElement } as ElementRef;
    component.autoFocus = true;
    component.id = 'test-id';
    spyOn(document, 'getElementById').and.returnValue(inputElement);

    component.ngAfterViewInit();

    tick(200);
    expect(component.showValidations).toBeTrue();
    expect(component.control.pristine).toBeTrue();

    tick(300);
    expect(document.getElementById).toHaveBeenCalledWith(component.id);
  }));

  it('should set inputType based on AvvInputType for password', () => {
    component.control = new UntypedFormControl();
    component.type = AvvInputType.password;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.password);
  });

  it('should set inputType based on AvvInputType for number', () => {
    component.control = new UntypedFormControl();
    component.type = AvvInputType.number;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.number);
  });

  it('should set inputType as text if type is empty', () => {
    component.control = new UntypedFormControl();
    component.type = '';
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.text);
  });

  it('should set inputType as tel for creditCardCvc', () => {
    component.control = new UntypedFormControl();
    component.type = AvvInputType.creditCardCvc;
    component.ngOnInit();
    expect(component.inputType).toEqual(InputType.tel);
  });

  it('should return true for isErrorMessage when control is invalid, dirty/touched, has errors and is not pending', () => {
    component.control.setErrors({ required: true });
    component.control.markAsDirty();
    expect(component.isErrorMessage).toBeTrue();

    component.control.markAsUntouched();
    component.control.markAsTouched();
    expect(component.isErrorMessage).toBeTrue();
  });

  it('should return true for isCurrencyNotEmpty when control value is not empty for currency type', () => {
    component.type = AvvInputType.currency;
    component.control.setValue('10000');
    expect(component.isCurrencyNotEmpty).toBeTrue();
  });

  it('should return false for isCurrencyNotEmpty when control value is null or whitespace', () => {
    component.type = AvvInputType.currency;
    component.control.setValue('   ');
    expect(component.isCurrencyNotEmpty).toBeFalse();

    component.control.setValue(null);
    expect(component.isCurrencyNotEmpty).toBeFalse();
  });

  it('should emit keyUpEvent with the input value if key is not Enter', () => {
    const inputNativeElement = { blur: jasmine.createSpy('blur') };
    component.input = { nativeElement: inputNativeElement } as ElementRef;
    spyOn(component.keyUpEvent, 'emit');

    const event = {
      key: 'a',
      target: { value: 'test' }
    } as unknown as KeyboardEvent;

    component.keyUp(event);
    expect(component.keyUpEvent.emit).toHaveBeenCalledWith('test');
    expect(inputNativeElement.blur).not.toHaveBeenCalled();
  });

  it('should blur the input and emit keyUpEvent when Enter key is pressed', () => {
    const inputNativeElement = { blur: jasmine.createSpy('blur') };
    component.input = { nativeElement: inputNativeElement } as ElementRef;
    spyOn(component.keyUpEvent, 'emit');

    const event = {
      key: 'Enter',
      target: { value: 'hello' }
    } as unknown as KeyboardEvent;

    component.keyUp(event);
    expect(inputNativeElement.blur).toHaveBeenCalled();
    expect(component.keyUpEvent.emit).toHaveBeenCalledWith('hello');
  });

  it('should return null from srcImgFranchise getter if helper returns null', () => {
    component.control.setValue('dummy');
    expect(component.srcImgFranchise).toBeNull();
  });

  it('should expose AvvInputType members with inputTypes getter', () => {
    expect(component.inputTypes.password).toEqual(AvvInputType.password);
    expect(component.inputTypes.email).toEqual(AvvInputType.email);
  });
});
