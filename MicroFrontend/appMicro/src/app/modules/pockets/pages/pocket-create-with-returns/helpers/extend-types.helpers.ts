// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AbstractControl } from '@angular/forms';

declare module '@angular/forms' {
  interface FormControl {
    currencyValue(): number;
    normalize(): string;
  }

  interface AbstractControl {
    currencyValue(): number;
    normalize(): string;
  }

  interface String {
    dashCase(): string;
  }
}

declare global {
  interface FormControl {
    currencyValue(): number;
    normalize(): string;
  }

  interface AbstractControl {
    currencyValue(): number;
    normalize(): string;
  }

  interface String {
    dashCase(): string;
  }
}

String.prototype.dashCase = function (): string {
  return this.valueOf()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};
