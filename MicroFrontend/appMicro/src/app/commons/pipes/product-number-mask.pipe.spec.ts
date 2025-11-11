import { ProductNumberMaskPipe } from './product-number-mask.pipe';

const text = '123456789012';
const transformedText = '**** 9012';

const pipe = new ProductNumberMaskPipe();

describe('ProductNumberMaskPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    expect(pipe.transform(text)).toEqual(transformedText);
  });

  it('should return original value if valueString is empty', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should return original value if valueString length is less than minDigitsToDisplay', () => {
    expect(pipe.transform('123')).toEqual('123');
  });
});
