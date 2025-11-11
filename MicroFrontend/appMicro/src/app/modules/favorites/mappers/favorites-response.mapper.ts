import { HttpErrorResponse } from '@angular/common/http';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';
import { mapError } from '@commons/helpers/http.helpers';

export function mapFavoriteError(error: HttpErrorResponse): ToastProperties {
  return {
    type: ToastType.error,
    title: mapError(error)
  };
}
