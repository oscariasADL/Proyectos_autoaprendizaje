import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { VALIDATOR_MESSAGES } from '@modules/forms-avv/constants/validator.constants';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.sass']
})
export class ValidationsComponent {
  @Input() control: UntypedFormControl;
  @Input() showRequired: boolean = false;

  public msgs: any = VALIDATOR_MESSAGES;

  constructor() {
    this.msgs = VALIDATOR_MESSAGES;
  }

  public getMessages(type: string): string[] {
    const messages: string[] = [];

    Object.keys(this.control[type]).forEach((key) => {
      if (this.msgs[key]) {
        let msg = this.msgs[key];
        if (typeof this.control[type][key] === 'object') {
          Object.keys(this.control[type][key]).forEach((errorKey) => {
            const regex = new RegExp(
              `{{ control.${type}.${key}.${errorKey} }}`
            );
            msg = msg.replace(regex, this.control[type][key][errorKey]);
          });
        }

        messages.push(msg);
      }
    });
    return messages;
  }

  get showErrors(): boolean {
    return (
      this.showRequired ||
      (!this.showRequired && !this.control?.errors?.hasOwnProperty('required'))
    );
  }

  get errorMessages(): string[] {
    return this.control.errors !== null ? this.getMessages('errors') : [];
  }
}
