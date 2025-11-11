import { SecondsFormatPipe } from './seconds-format.pipe';

const pipe = new SecondsFormatPipe();
const seconds = 180;
const transformedSeconds = '03:00';

describe('SecondsFormatPipe', () => {
  it('create an instance', () => {
    expect(pipe.transform(seconds)).toEqual(transformedSeconds);
  });
});
