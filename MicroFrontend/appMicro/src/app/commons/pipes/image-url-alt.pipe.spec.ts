import { ImageUrlAltPipe } from './image-url-alt.pipe';

const pipe = new ImageUrlAltPipe();
const text = '/001.jpg';
const transformedText = 'https://pb-stg-avvillas.avaldigitallabs.com/001.jpg';

describe('ImageUrlAltPipe', () => {
  it('should create an instante', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly number', () => {
    expect(pipe.transform(text)).toEqual(transformedText);
  });
});
