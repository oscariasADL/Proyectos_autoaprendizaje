import { HttpStatusCode } from '@angular/common/http';
import { HttpStatus } from '@commons/constants/http.constants';

export enum LoginType {
  Document = 'document',
  Password = 'password'
}

export const LOGIN_ERROR_CODES_FOR_UPDATE_PASSWORD = ['103', '104'];
export const LOGIN_ERROR_PASSWORD_HAS_CHANGE = '1611';
export const INACTIVE_CHANNEL_HTTP_CODE = HttpStatus.BadGateway;
export const INACTIVE_CHANNEL_BASIC_DATA_CODE = '1602';
export const INACTIVE_CHANNEL_BALANCE_CODE = '100';
export const NO_PRODUCTS_CODE = '404';
export const NO_PRODUCTS_HTTP_CODE = HttpStatusCode.NotFound;
export const SEED_NOT_AVAILABLE = 6;
