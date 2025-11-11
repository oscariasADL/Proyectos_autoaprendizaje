import { HttpErrorResponse } from '@angular/common/http';
import {
  mapError,
  mapErrorDescription,
  stringToJSON
} from '@commons/helpers/http.helpers';
import { PaymentServicesError } from '@modules/payments/payment-services/constants/payment-services.constants';
import { SearchBillReferenceResponse } from '@modules/payments/payment-services/entities/register-service.interface';
import { Observable } from 'rxjs';

export function throwErrorBillIfNecessary(
  response: SearchBillReferenceResponse | HttpErrorResponse
): void {
  if (!response.hasOwnProperty('maxPaymentDateComplete')) {
    throw new HttpErrorResponse({
      status: 404,
      error: {
        code: (response as HttpErrorResponse)?.error?.code || 0,
        description: mapErrorDescription(response)
      }
    });
  }
}

export function throwErrorBillReferenceIfNecessary(
  response: HttpErrorResponse
): Observable<any> {
  const OVERPAID_BILL_CODE = 1380;
  const EXPIRED_BILL_CODE = [9999, 1400];
  const error = stringToJSON(response.error);
  if (!!response && !!response.error) {
    const code = +error.code;
    if (code === OVERPAID_BILL_CODE) {
      throw new HttpErrorResponse({
        status: response.status,
        error: {
          code: response?.error?.code || 0,
          description: PaymentServicesError.alreadyPaid
        }
      });
    }
    if (EXPIRED_BILL_CODE.includes(code)) {
      throw new HttpErrorResponse({
        status: response.status,
        error: {
          code: response?.error?.code || 0,
          description: PaymentServicesError.deadlineExpired
        }
      });
    }
  }
  throw new HttpErrorResponse({
    status: response.status,
    error: {
      code: response?.error?.code || 0,
      description: mapError(response)
    }
  });
}
