import { MonthAbbreviationPipe } from './month-abbreviation.pipe';

const date = '2020-01-16 00:00:00';
const transformedText = 'ENE';
const pipe = new MonthAbbreviationPipe();

describe('MonthAbbreviationPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    expect(pipe.transform(date)).toEqual(transformedText);
  });
});
