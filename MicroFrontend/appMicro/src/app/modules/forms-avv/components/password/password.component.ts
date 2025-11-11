import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { KeyboardKey } from '@commons/constants/keyboard.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { filter, tap } from 'rxjs/operators';

let $id = 0;

@Component({
  selector: 'avv-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordComponent implements OnInit, AfterViewInit {
  @ViewChild('passwordField', { static: true }) passwordField: ElementRef;

  @Input() numCharacters: number = 4;
  @Input() id: string;
  @Input() control: UntypedFormControl;
  @Input() allowCut: boolean = false;
  @Input() allowCopy: boolean = false;
  @Input() allowPaste: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input() hideCharacters: boolean = false;
  @Input() symbol: string = '*';
  @Input() showEye: boolean = true;
  @Input() autocomplete: string = 'off';
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = null;

  @Output()
  oneTimeCode: EventEmitter<string> = new EventEmitter<string>();

  public formG: UntypedFormGroup;
  public lastValue: string;
  public isSelected: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initId();
    this.initForm();
    this.listenReset();
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      setTimeout(
        () => document.getElementById(this.id + '-char0').focus(),
        100
      );
    }
  }

  public onInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    const otpValue = target.value;
    if (
      this.autocomplete === 'one-time-code' &&
      !!otpValue &&
      otpValue.length === this.numCharacters
    ) {
      this.valueChanges(otpValue);
      this.oneTimeCode.emit(otpValue);
    }
  }

  public keyUp(index: number, event: KeyboardEvent): void {
    if (index === 3 && event.key === KeyboardKey.Enter) {
      const target = event.target as HTMLInputElement;
      document.getElementById(target.getAttribute('id')).blur();
    } else {
      this.goToNextInput(index, event);
    }
  }

  public goToPrevInput(index: number, e: KeyboardEvent): void {
    const targ: HTMLInputElement = e.target as HTMLInputElement;
    this.lastValue = targ.value;
  }

  public goToNextInput(index: number, e: KeyboardEvent): boolean {
    const key = e.key;

    const keyIsNaN = isNaN(parseInt(key, 10));
    const targ: any = e.target;
    const val: string = targ.value;
    const control = this.formG.get(targ.getAttribute('id'));
    let goahead = true;

    let sib =
      !isNullOrUndefined(targ.parentElement.nextSibling) &&
      targ.parentElement.nextSibling.nodeName === 'DIV' &&
      targ.parentElement.nextSibling.querySelector('input');

    const previ =
      index > 0 &&
      !isNullOrUndefined(targ.parentElement.previousSibling) &&
      targ.parentElement.previousSibling.querySelector('input');

    if (
      keyIsNaN &&
      key !== 'Unidentified' &&
      key !== 'Tab' &&
      key !== 'Shift' &&
      key !== 'Meta' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight' &&
      key !== 'Enter' &&
      key !== 'v'
    ) {
      control.patchValue('');
      goahead = false;
    }

    if (
      key === 'Meta' || // It"s control + v
      key === 'v' || // It"s control + v
      !!!val || // It's empty the value
      key === 'Tab' ||
      key === 'Backspace' ||
      key === 'ArrowLeft' ||
      key === 'Shift'
    ) {
      goahead = false;
    }

    if (
      key === 'Backspace' &&
      !!previ &&
      (this.lastValue.length === 0 || this.isSelected)
    ) {
      previ.select();
      previ.focus();
      previ.setSelectionRange(0, 1);
      this.isSelected = true;
      goahead = false;
    } else {
      this.isSelected = false;
    }

    if (!goahead) {
      e.preventDefault();
      this.changeValue();
      return false;
    }

    if (index === this.formKeys.length - 1) {
      this.changeValue();
      return true;
    }

    if (!sib) {
      sib = targ.parentElement.querySelector('input');
    }
    sib.select();
    sib.focus();
    this.changeValue();
  }

  public onPaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || window['clipboardData'];
    const pastedText: string = clipboardData.getData('text');
    if (
      !isNaN(parseInt(pastedText, 10)) &&
      parseInt(this.numCharacters.toString(), 10) === pastedText.length
    ) {
      this.formKeys.forEach((key, i) => {
        this.formG.controls[key].setValue(pastedText.charAt(i));
      });
    }
    this.changeValue();
    event.preventDefault();
  }

  public selectInputText(index: number, e: any): void {
    const targ: any = e.target;
    const val: string = targ.value;
    if (val.toString().length > 0) {
      targ.focus();
      targ.setSelectionRange(0, 1);
    }
  }

  public showPassword(): void {
    this.hideCharacters = !this.hideCharacters;
  }

  private changeValue(): void {
    const values = this.formG.value;
    let value = '';

    // eslint-disable-next-line guard-for-in
    for (const key in values) {
      value += values[key];
    }

    this.control.setValue(value, { emitEvent: false });
  }

  private initId(): void {
    if (isNullOrUndefined(this.id)) {
      $id = $id + 1;
      this.id = 'avv-password-' + $id.toString();
    }
  }

  public initForm(): void {
    const controls = {};
    for (let x = 0; x < this.numCharacters; x++) {
      controls[`${this.id}-char${x}`] = [
        null,
        [Validators.required, Validators.max(9), Validators.maxLength(1)]
      ];
    }
    this.formG = this.formBuilder.group(controls);
  }

  private listenReset(): void {
    if (!isNullOrUndefined(this.control)) {
      this.control.valueChanges
        .pipe(
          tap((value) => this.valueChanges(value)),
          filter((value) => isNullOrUndefined(value))
        )
        .subscribe((data) => this.initForm());
    }
  }

  public valueChanges(newValue: string): void {
    if (!!newValue && newValue.length <= this.numCharacters) {
      for (let x = 0; x < this.numCharacters; x++) {
        this.formG.controls[`${this.id}-char${x}`].setValue(newValue.charAt(x));
      }
    }
  }

  get formKeys(): string[] {
    return Object.keys(this.formG.controls);
  }
}
