import { FirstLettersWordsPipe } from './first-letters-words.pipe';

const text = 'Estrella próxima Centauri';
const transformedText = 'EP';
const pipe = new FirstLettersWordsPipe();

describe('FirstLettersWordsPipe', () => {
  it('should create an instante', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    expect(pipe.transform(text)).toEqual(transformedText);
  });
});
