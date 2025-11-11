import { ReverseDashCasePipe } from './reverse-dash-case.pipe';

const text = '---Text-with-dashes---';
const transformedText = 'Text with dashes';

const pipe = new ReverseDashCasePipe();

describe('ReverseDashCasePipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    expect(pipe.transform(text)).toEqual(transformedText);
  });
});
