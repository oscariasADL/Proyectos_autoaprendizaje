import { HEXADECIMAL_PATTERN } from '@commons/constants/regex.constants';

export function normalize(value: string): string {
  if (isNullOrUndefined(value)) {
    return value;
  }

  return value
    .normalize('NFD')
    .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, '$1$2')
    .normalize();
}

export function capitalize(value: string): string {
  if (isNullOrUndefined(value)) {
    return value;
  }

  const str: string = value.toLowerCase().trimLeft();

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAll(value: string): string {
  if (isNullOrUndefined(value)) {
    return value;
  }

  const str: string = value.toLowerCase().trimLeft();

  return str.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
}

export function trimLeftZeros(value: string): string {
  if (isNullOrUndefined(value)) {
    return value;
  }

  return value.replace(/^0+/, '');
}

export function sanitizeCardNumber(value: string): string {
  if (isNullOrUndefined(value)) {
    return value;
  }

  return parseInt(value.toString(), 10).toString();
}

export function sanitizeUrl(url: string): string {
  if (isNullOrUndefined(url)) {
    return url;
  }

  return url.split('?')[0].split('#')[0];
}

export function nameFromURL(url: string): string {
  if (isNullOrUndefined(url)) {
    return url;
  }

  if (url === '/') {
    return 'Home';
  }

  const labels = url
    .replace(/-/g, '/')
    .split('/')
    .filter((item) => item.length > 0);

  return `${[
    capitalize(labels[0]),
    ...(labels.length > 1
      ? [capitalize(labels.slice(1, labels.length).join(' '))]
      : [])
  ].join(' - ')}`;
}

export function sanitizeCurrency(value: string): number {
  if (isNullOrUndefinedOrEmpty(value)) {
    return null;
  }

  return typeof value === 'number'
    ? value
    : parseFloat((value + '').replace(/[^0-9,]+/g, '').replace(',', '.'));
}

export function sanitizeDate(date: string): string {
  return !!date ? date.toString().replace(/-/g, '/') : null;
}

export function valueToNumberFormat(value: number): string {
  const numberFormat = new Intl.NumberFormat('de-DE', { currency: 'EUR' });
  return !!value ? numberFormat.format(value) : null;
}

export function sanitizeCreditCardNumber(number: string): string {
  return !!number
    ? number
        .toString()
        .replace(/\*/g, '•')
        .match(/.{1,4}/g)
        .join(' ')
    : null;
}
/**
 * @deprecated Esta función será eliminada en las próximas versiones.
 * Usa operadores de nulidad (??) o (&&) en su lugar.
 */
export function isNullOrUndefined(object: any): boolean {
  return object === null || object === undefined;
}
/**
 * @deprecated Esta función será eliminada en las próximas versiones.
 * Usa operadores de nulidad (??) o (&&) en su lugar.
 */
export function isNullOrUndefinedOrEmpty(value: string): boolean {
  return isNullOrUndefined(value) || value === '';
}

export function isNotNullOrUndefinedGroup(values: any[]): boolean {
  return values.reduce(
    (beforeValue, value) => beforeValue && !isNullOrUndefined(value),
    true
  );
}

export function convertBase64ToBlobData(
  base64Data: string,
  contentType: string = 'application/pdf',
  sliceSize: number = 512
): Blob {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
}

export function sanitizeDocument(value: string): string {
  if (isNullOrUndefined(value)) {
    return value;
  }
  value = value.toString();
  return value.replace(/\./g, '');
}

export function isAscOrder(number: string | number): boolean {
  if (isNullOrUndefined(number)) {
    return !!number;
  }

  const arr = ('' + number.toString())
    .split('')
    .map((item) => parseInt(item, 10));

  return arr
    .map(
      (item, index) =>
        (index === arr.length - 1 ? arr[index] + 1 : arr[index + 1]) -
        arr[index]
    )
    .reduce((beforeValue, value) => beforeValue && value === 1, true);
}

export function hasDifferentNumbers(number: string | number): boolean {
  if (isNullOrUndefined(number)) {
    return !!number;
  }

  const arr = ('' + number.toString())
    .split('')
    .map((item) => parseInt(item, 10));

  return (
    arr.length > 0 &&
    arr
      .map((item) => item !== arr[0])
      .reduce((beforeValue, value) => beforeValue || value, false)
  );
}

export function randomString(length: number): string {
  const randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

export function numberRangeBySteps(
  lower: number,
  upper: number,
  step: number
): number[] {
  const arr = [lower];
  let index = 0;

  while (arr[index] < upper) {
    arr.push(arr[index] + step > upper ? upper : arr[index] + step);
    index++;
  }
  return arr;
}

export function urlWithCorrelation(
  parseUrl: string,
  urls: Array<string>
): boolean {
  return urls.some((url) => parseUrl.includes(url));
}

export function parseArrayToObj(object: any): any {
  return Array.isArray(object)
    ? object.reduce(
        (beforeValue, item) => ({
          ...beforeValue,
          [item.key]: item.value
        }),
        {}
      )
    : object;
}

export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function getDBValue(
  db: { key: string; value: string }[],
  key: string
): string {
  return key in parseArrayToObj(db) ? parseArrayToObj(db)[key] : null;
}

export function replaceAll(str: string, find: string, replace: string): string {
  if (isNullOrUndefined(str)) {
    return str;
  }

  const escapeRegExp = (string) =>
    string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export function getKeyFromEnum(object: any, value: any): string {
  return Object.keys(object)[Object.values(object).indexOf(value)];
}

export function reverseString(str: string): string {
  if (isNullOrUndefined(str)) {
    return str;
  }
  return str.toString().split('').reverse().join('');
}

export function replaceWhiteSpaces(
  text: string,
  substitute: string = '-'
): string {
  return !isNullOrUndefined(text) ? text.replace(/\s/g, substitute) : text;
}

export function stringToBoolean(str: string | boolean): boolean {
  if (typeof str === 'boolean') return str;
  return ['true', 'True', '1'].includes(str.toString());
}

export function isHexadecimal(str: string): boolean {
  const cleanText = str.trim().replace(/^0x/, '');
  return !isNullOrUndefined(str) && HEXADECIMAL_PATTERN.test(cleanText);
}
