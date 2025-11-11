import { Product } from 'src/app/commons/entities/product/product.interface';

// TODO Remove this global object when supported by most versions of Safari and Opera
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cloneObject(object: any): any {
  return structuredClone(object);
}

export function getAvailableForCurrentAcct(
  checkAvailable: boolean,
  product: Product
): number {
  return checkAvailable && product.availableBalance
    ? product.availableBalance
    : 0;
}
