import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatus } from '@commons/constants/http.constants';
import { ErrorResponse } from '@commons/entities/response/response.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  AlertProperties,
  DEFAULT_ALERT_PROPERTIES
} from '../entities/alert/alert.entities';

export enum HttpStatusCode {
  NonAuthoritativeInformation = 203
}

export function stringToJSON(data: string): any {
  try {
    return typeof data !== 'object' ? JSON.parse(data) : data;
  } catch (e) {
    return data;
  }
}

export function mapErrorDescription(response: any): string {
  const error = response?.data ? response?.data : response;
  return (
    error?.message || error?.description || DEFAULT_ALERT_PROPERTIES.message
  );
}

export function mapError(
  response: HttpErrorResponse,
  msjError: string = DEFAULT_ALERT_PROPERTIES.message
): string {
  if (!!response && !!response?.status) {
    const code = response?.status;
    const error = stringToJSON(response?.error);
    if (code >= 400 && !!error && error.hasOwnProperty('description')) {
      msjError = error?.description;
    }
  }
  return msjError;
}

export function mapErrorAlert(response: HttpErrorResponse): AlertProperties {
  const error = mapError(response);
  return {
    ...DEFAULT_ALERT_PROPERTIES,
    message: error
  };
}

export function throwErrorResponseIfNecessary(data: ErrorResponse | any): void {
  if (isNullOrUndefined(data)) {
    throw new HttpErrorResponse({
      status: HttpStatus.BadRequest,
      error: {
        code: data?.code || 0,
        description: data?.description || 'Error'
      }
    });
  }
}
