import { HttpErrorResponse } from '@angular/common/http';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';

export function mapExtractsDownloadResponse(
  title: string = 'EXTRACTS.SUCCESS_TITLE'
): ToastProperties {
  return {
    type: ToastType.success,
    title
  };
}

export function mapExtractsDownloadError(response: any): ToastProperties {
  let title = 'EXTRACTS.ERROR_TITLE';

  try {
    title =
      response instanceof HttpErrorResponse &&
      JSON.parse(response?.error)?.description
        ? JSON.parse(response.error).description
        : 'EXTRACTS.ERROR_TITLE';
  } catch (e) {}

  return {
    title,
    type: ToastType.error
  };
}
