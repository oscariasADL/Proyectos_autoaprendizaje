import { CreditCardDateFormatPipe } from '@commons/pipes/credit-card-date-format.pipe';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const pipe = new CreditCardDateFormatPipe();

const value = '0628';
const transformedValue = '06/28';

describe('CreditCardDateFormatPipe', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a string', () => {
    expect(typeof pipe.transform(value)).toBe('string');
    expect(pipe.transform(value)).toEqual(transformedValue);
  });
});
