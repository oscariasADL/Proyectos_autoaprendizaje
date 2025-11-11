import { ImageUrlPipe } from './image-url.pipe';

const pipe = new ImageUrlPipe();
const text = '001.jpg';
const transformedText = './assets/img/001.jpg';

describe('NumberFormatPipe', () => {
  it('should create an instante', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly number', () => {
    expect(pipe.transform(text)).toEqual(transformedText);
  });
});
