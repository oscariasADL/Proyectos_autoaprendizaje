import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  ErrorsForCheckI,
  ERRORS_FOR_CHECK_LIST
} from '../../entities/errors-for-check.interface';

@Component({
  selector: 'app-errors-for-check',
  templateUrl: './errors-for-check.component.html',
  styleUrls: ['./errors-for-check.component.sass']
})
export class ErrorsForCheckComponent {
  @Input() control: UntypedFormControl;
  @Input() errorsForCheck: ErrorsForCheckI = ERRORS_FOR_CHECK_LIST;
  @Input() hasError: false;

  public validateError(key: string): boolean {
    return (
      this.hasError ||
      this.control?.errors?.hasOwnProperty('required') ||
      this.control?.errors?.hasOwnProperty(key)
    );
  }

  get errorsForCheckKeys(): string[] {
    return Object.keys(this.errorsForCheck);
  }
}
