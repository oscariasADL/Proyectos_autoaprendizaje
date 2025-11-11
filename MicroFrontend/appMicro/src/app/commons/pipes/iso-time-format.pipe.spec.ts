import { IsoTimeFormatPipe } from './iso-time-format.pipe';

describe('IsoTimeFormatPipe', () => {
  let pipe: IsoTimeFormatPipe;

  beforeEach(() => {
    pipe = new IsoTimeFormatPipe();
  });

  it('crea una instancia del pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('convierte un ISOString a formato hh:mm:ss AM/PM correctamente', () => {
    const isoString = '2025-07-28T21:45:30.000Z'; // UTC
    const localDate = new Date(isoString);
    const hours = localDate.getHours() % 12 || 12;
    const minutes = localDate.getMinutes().toString().padStart(2, '0');
    const seconds = localDate.getSeconds().toString().padStart(2, '0');
    const ampm = localDate.getHours() >= 12 ? 'PM' : 'AM';
    const expected = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const result = pipe.transform(isoString);
    expect(result).toBe(expected);
  });

  it('convierte medianoche correctamente', () => {
    const isoString = '2025-07-28T00:00:00.000Z'; // medianoche UTC
    const localDate = new Date(isoString);
    const hours = localDate.getHours() % 12 || 12;
    const minutes = localDate.getMinutes().toString().padStart(2, '0');
    const seconds = localDate.getSeconds().toString().padStart(2, '0');
    const ampm = localDate.getHours() >= 12 ? 'PM' : 'AM';
    const expected = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const result = pipe.transform(isoString);
    expect(result).toBe(expected);
  });

  it('convierte mediodía correctamente', () => {
    const isoString = '2025-07-28T12:00:00.000Z';
    const localDate = new Date(isoString);
    const hours = localDate.getHours() % 12 || 12;
    const minutes = localDate.getMinutes().toString().padStart(2, '0');
    const ampm = localDate.getHours() >= 12 ? 'PM' : 'AM';
    const expected = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const result = pipe.transform(isoString);
    expect(result).toBe(expected);
  });

  it('devuelve cadena vacía si el valor es null', () => {
    const result = pipe.transform(null as any);
    expect(result).toBe('');
  });

  it('devuelve cadena vacía si el valor es undefined', () => {
    const result = pipe.transform(undefined as any);
    expect(result).toBe('');
  });

  it('devuelve cadena vacía si el valor no es una fecha válida', () => {
    const result = pipe.transform('fecha-no-valida');
    expect(result).toBe('');
  });
});
