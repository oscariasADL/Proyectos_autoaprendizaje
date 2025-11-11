import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import {
  UntypedFormControl,
  ReactiveFormsModule,
  UntypedFormBuilder
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PasswordComponent } from '@modules/forms-avv/components/password/password.component';
import { fireEvent } from '@testing-library/dom';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [IonicModule, ReactiveFormsModule],
      providers: [{ provide: UntypedFormBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    component.autoFocus = true;
    component.control = new UntypedFormControl('1234');
    component.numCharacters = 8;
    fixture.detectChanges();
    flush();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle hideCharacters when showPassword is called', async () => {
    const initialHideCharacters = component.hideCharacters;
    component.showPassword();
    await expect(component.hideCharacters).toEqual(!initialHideCharacters);
  });

  it('should call to method goToNextInput', () => {
    const id = component.id + '-char0';
    const control = component.formG.get(id);
    control.setValue(2);
    const keyEvent = new KeyboardEvent('keyup', { key: '1' });
    fireEvent(document.getElementById(id), keyEvent);
    fixture.detectChanges();
    expect(control.value).toEqual(2);
    expect(control.value).toEqual(2);
  });

  it('should call to method goToNextInput with kepress Backspace', () => {
    const id = component.id + '-char0';
    const control = component.formG.get(id);
    control.setValue(2);

    const element = document.getElementById(id);
    expect(element).not.toBeNull();

    const keyEvent = new KeyboardEvent('keyup', { key: 'Backspace' });
    fireEvent(element, keyEvent);
    fixture.detectChanges();
    expect(control.value).toEqual('');
  });

  it('should call to method goToNextInput with keypress Meta', () => {
    const id = component.id + '-char1';
    const target = fixture.nativeElement.querySelector(
      `#${component.id}-char1`
    );
    expect(target).not.toBeNull();
    spyOn(component, 'goToNextInput');
    const keyEvent = new KeyboardEvent('keyup', { key: 'Meta' });
    fireEvent(target, keyEvent);
    fixture.detectChanges();
    expect(component.goToNextInput).toHaveBeenCalled();
    expect(target.value).toEqual('');
  });

  it('should to paste into inputs', () => {
    const id = component.id + '-char0';

    function FakePasteEvent(options: any): void {
      this.clipboardData = {
        dataType: options.dataType,
        data: options.data,
        getData(type: string): void {
          return this.data;
        }
      };
      this.preventDefault = () => void {};
    }

    const ev = new FakePasteEvent({
      dataType: 'text/plain',
      data: '12345678'
    });
    component.onPaste(ev);
    expect(component.formG.get(id).value).toBe('1');
  });

  it('should call to method onInput and goToPrevInput', () => {
    const id = component.id + '-char1';
    const target = document.getElementById(id) as HTMLInputElement;

    expect(target).not.toBeNull();

    spyOn(component, 'goToNextInput');
    const keyEvent = new KeyboardEvent('keyup', { key: 'Meta' });
    fireEvent(target, keyEvent);
    fixture.detectChanges();
    expect(component.goToNextInput).toHaveBeenCalled();
    expect(target.value).toEqual('');
  });

  it('should not emit oneTimeCode when autocomplete is not "one-time-code"', () => {
    component.autocomplete = 'off';
    spyOn(component.oneTimeCode, 'emit');
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: '12345678'
    });
    const target = fixture.nativeElement.querySelector(
      `#${component.id}-char0`
    );
    target.value = '12345678';
    fireEvent.input(target, inputEvent);
    fixture.detectChanges();
    expect(component.oneTimeCode.emit).not.toHaveBeenCalled();
  });

  it('should not emit oneTimeCode when otpValue is empty', () => {
    spyOn(component.oneTimeCode, 'emit');
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: ''
    });
    const target = fixture.nativeElement.querySelector(
      `#${component.id}-char0`
    );
    target.value = '';
    fireEvent.input(target, inputEvent);
    fixture.detectChanges();
    expect(component.oneTimeCode.emit).not.toHaveBeenCalled();
  });

  it('should not emit oneTimeCode when otpValue length is not equal to numCharacters', () => {
    spyOn(component.oneTimeCode, 'emit');
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: '123'
    });
    const target = fixture.nativeElement.querySelector(
      `#${component.id}-char0`
    );
    target.value = '123';
    fireEvent.input(target, inputEvent);
    fixture.detectChanges();
    expect(component.oneTimeCode.emit).not.toHaveBeenCalled();
  });

  it('should not emit oneTimeCode when otpValue is null', () => {
    component.autocomplete = 'one-time-code';
    spyOn(component.oneTimeCode, 'emit');
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: null
    });
    const target = fixture.nativeElement.querySelector(
      `#${component.id}-char0`
    );
    target.value = null;
    fireEvent.input(target, inputEvent);
    fixture.detectChanges();
    expect(component.oneTimeCode.emit).not.toHaveBeenCalled();
  });

  it('should blur when index is 3 and key is Enter', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector(
      `#${component.id}-char3`
    );
    expect(input).toBeTruthy('Input element should exist');

    spyOn(input, 'blur').and.callThrough();

    const keyEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
      bubbles: true
    });

    Object.defineProperty(keyEvent, 'target', {
      value: input,
      writable: true
    });
    component.keyUp(3, keyEvent);
    fixture.detectChanges();
    expect(input.blur).toHaveBeenCalled();
  });
  it('should handle previous input when index > 0', () => {
    fixture.detectChanges();
    const id0 = component.id + '-char0';
    const id1 = component.id + '-char1';
    const input0 = fixture.debugElement.nativeElement.querySelector(`#${id0}`);
    const input1 = fixture.debugElement.nativeElement.querySelector(`#${id1}`);

    expect(input0).toBeTruthy('Previous input should exist');
    expect(input1).toBeTruthy('Current input should exist');

    component.formG.get(id1).setValue('5');
    component.lastValue = '';
    component.isSelected = false;
    const keyEvent = new KeyboardEvent('keyup', {
      key: 'Backspace',
      bubbles: true
    });

    Object.defineProperty(keyEvent, 'target', {
      value: {
        value: '5',
        parentElement: input1.parentElement,
        getAttribute: (attr: string) => id1
      }
    });
    component.goToNextInput(1, keyEvent);

    fixture.detectChanges();

    expect(component.formG.get(id1).value).toBe('');
    expect(component.isSelected).toBe(true);
  });

  it('should handle Backspace with empty lastValue and previous input', () => {
    fixture.detectChanges();

    const id0 = component.id + '-char0';
    const id1 = component.id + '-char1';

    const input0 = fixture.debugElement.nativeElement.querySelector(`#${id0}`);
    const input1 = fixture.debugElement.nativeElement.querySelector(`#${id1}`);

    expect(input0).toBeTruthy('Previous input should exist');
    expect(input1).toBeTruthy('Current input should exist');

    component.formG.get(id1).setValue('');
    component.lastValue = '';
    component.isSelected = true;

    spyOn(input0, 'select').and.callThrough();
    spyOn(input0, 'focus').and.callThrough();

    const keyEvent = new KeyboardEvent('keyup', {
      key: 'Backspace',
      bubbles: true
    });

    Object.defineProperty(keyEvent, 'target', {
      value: {
        value: '',
        parentElement: input1.parentElement,
        getAttribute: (attr: string) => id1
      }
    });

    component.goToNextInput(1, keyEvent);
    fixture.detectChanges();
    expect(component.isSelected).toBe(true);
    expect(input0.select).toHaveBeenCalled();
    expect(input0.focus).toHaveBeenCalled();
    expect(component.formG.get(id1).value).toBe('');
  });

  it('should handle paste event with clipboardData', () => {
    const pasteEvent = {
      clipboardData: {
        getData: (type: string) => '12345678'
      },
      preventDefault: () => {
        return;
      }
    } as ClipboardEvent;

    component.onPaste(pasteEvent);
    fixture.detectChanges();

    expect(component.formG.get(component.id + '-char0').value).toBe('1');
  });

  it('should not update form controls when newValue is null', () => {
    const spy = spyOn(
      component.formG.controls[component.id + '-char0'],
      'setValue'
    );
    component.valueChanges(null);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not update form controls when newValue length is greater than numCharacters', () => {
    component.numCharacters = 4;
    const spy = spyOn(
      component.formG.controls[component.id + '-char0'],
      'setValue'
    );
    component.valueChanges('12345');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update form controls when newValue is valid', () => {
    component.numCharacters = 4;
    component.valueChanges('1234');
    expect(component.formG.get(component.id + '-char0').value).toBe('1');
    expect(component.formG.get(component.id + '-char1').value).toBe('2');
    expect(component.formG.get(component.id + '-char2').value).toBe('3');
    expect(component.formG.get(component.id + '-char3').value).toBe('4');
  });
  it('should emit oneTimeCode when all conditions for OTP are met', () => {
    component.autocomplete = 'one-time-code';
    const otpValue = '12345678';
    component.numCharacters = 8;
    spyOn(component.oneTimeCode, 'emit');

    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: otpValue
    });

    const target = fixture.nativeElement.querySelector(
      `#${component.id}-char0`
    );
    target.value = otpValue;
    fireEvent.input(target, inputEvent);
    fixture.detectChanges();
    expect(component.oneTimeCode.emit).toHaveBeenCalledWith(otpValue);
  });
});
