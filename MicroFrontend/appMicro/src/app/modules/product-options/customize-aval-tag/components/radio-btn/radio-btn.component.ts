import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioBtnComponent),
      multi: true
    }
  ]
})
export class RadioBtnComponent implements ControlValueAccessor {
  @Input() value: any;
  @Input() name: string = 'radio-group';
  @Input() disabled: boolean = false;

  @Output() selectionChange = new EventEmitter<any>();

  selectedValue: any = null;

  // ControlValueAccessor methods
  private onChange = (value: any) => {
    return;
  };
  private onTouched = () => {
    return;
  };

  public onRadioChange(): void {
    if (this.disabled) return;

    this.selectedValue = this.value;
    this.onChange(this.value);
    this.onTouched();
    this.selectionChange.emit(this.value);
  }

  public isSelected(): boolean {
    return this.selectedValue === this.value;
  }

  // ControlValueAccessor implementation
  public writeValue(value: any): void {
    this.selectedValue = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public select(): void {
    if (!this.disabled) {
      this.onRadioChange();
    }
  }
}
