import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VALIDATOR_MESSAGES } from '../../constants/validator.constants';
import { ValidationsComponent } from '@modules/forms-avv/components/validations/validations.component';

@Component({
  selector: 'avv-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.sass']
})
export class ValidationMessagesComponent extends ValidationsComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  get isErrorMessage(): boolean {
    return (
      this.control.invalid &&
      (this.control.dirty || this.control.touched) &&
      this.control.errors !== null &&
      Object.keys(this.control.errors).length > 0 &&
      !this.control.pending
    );
  }
}
