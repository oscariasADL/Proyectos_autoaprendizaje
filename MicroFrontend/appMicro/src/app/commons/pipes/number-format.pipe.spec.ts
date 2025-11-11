import { NumberFormatPipe } from './number-format.pipe';

const number = 100000000.35;
const text = '100000000.35';
const helloWorld = 'hello world';
const transformedText = '100.000.000,35';
const pipe = new NumberFormatPipe();

describe('NumberFormatPipe', () => {
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly number', () => {
    expect(pipe.transform(number)).toEqual(transformedText);
  });

  it('should transform correctly text', () => {
    expect(pipe.transform(text)).toEqual(transformedText);
  });

  it('should transform correctly text 2', () => {
    expect(pipe.transform(helloWorld)).toEqual('hello world');
  });
});
