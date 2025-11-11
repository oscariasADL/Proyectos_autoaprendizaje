import { StripTagsPipe } from './strip-tags.pipe';

const pipe = new StripTagsPipe();
describe('StripTagsPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly html', () => {
    expect(pipe.transform('<b>Hola mundo!</b>')).toEqual('Hola mundo!');
  });

  it('should transform correctly empty', () => {
    expect(pipe.transform('')).toEqual('');
  });
});
