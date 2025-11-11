import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Observable } from 'rxjs';

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

    snakeCase(): string;

    camelCase(): string;

    lastWord(): string;

    append(index: number, str: string): string;

    pad(str: string, length: string): string;
  }
}

declare module 'rxjs' {
  interface Observable<T> {
    filterUndefined: () => Observable<T>;
    currentValue: () => any;
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

    toDashCase(): string;

    snakeCase(): string;

    camelCase(): string;

    lastWord(): string;

    append(index: number, str: string): string;

    pad(str: string, length: number): string;
  }

  interface Observable<T> {
    filterUndefined: () => Observable<T>;
    currentValue: () => any;
  }
}

UntypedFormControl.prototype.currencyValue = function (
  this: UntypedFormControl
): number {
  return !isNullOrUndefined(this.value) &&
    this.value.toString().trim().length > 0
    ? typeof this.value === 'number'
      ? this.value
      : parseFloat((this.value + '').replace(/[^0-9,]+/g, '').replace(',', '.'))
    : null;
};

UntypedFormControl.prototype.normalize = function (
  this: UntypedFormControl
): string {
  return !isNullOrUndefined(this.value) &&
    this.value.toString().trim().length > 0
    ? (this.value + '').replace(/\s/g, '')
    : null;
};

AbstractControl.prototype.currencyValue = function (
  this: AbstractControl
): number {
  return !isNullOrUndefined(this.value) &&
    this.value.toString().trim().length > 0
    ? typeof this.value === 'number'
      ? this.value
      : parseFloat((this.value + '').replace(/[^0-9,]+/g, '').replace(',', '.'))
    : null;
};

String.prototype.dashCase = function (): string {
  return this.valueOf()
    .normalize('NFD')
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

String.prototype.snakeCase = function (): string {
  return this.valueOf()
    .normalize('NFD')
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

String.prototype.camelCase = function (): string {
  return this.valueOf()
    .normalize('NFD')
    .replace(/([-_][a-z])/gi, ($1) =>
      $1.toUpperCase().replace('-', '').replace('_', '')
    );
};

String.prototype.lastWord = function (): string {
  const _values = this.valueOf().split(' ');
  return _values[_values.length - 1];
};

String.prototype.append = function (index: number, str: string): string {
  return this.slice(0, index) + str + this.slice(index);
};

String.prototype.pad = function (str: string, length: number): string {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  let strPadded = this;
  while (strPadded.length < length) {
    strPadded = str + strPadded;
  }
  return strPadded;
};

Observable.prototype.filterUndefined = function (): Observable<any> {
  return this.filter((value: any) => !!value);
};

Observable.prototype.currentValue = function (): any {
  let value;
  this.subscribe((_value) => (value = _value)).unsubscribe();
  return value;
};
