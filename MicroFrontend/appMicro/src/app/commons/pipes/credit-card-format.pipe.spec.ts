import { CreditCardNumberFormatPipe } from '@commons/pipes/credit-card-number-format.pipe';

const pipe = new CreditCardNumberFormatPipe();

const value = '8765423567658752';
const transformedValue = '8765 4235 6765 8752 ';

describe('CreditCardNumberFormatPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a string', () => {
    expect(typeof pipe.transform(value)).toBe('string');
    expect(pipe.transform(value)).toEqual(transformedValue);
  });
});
