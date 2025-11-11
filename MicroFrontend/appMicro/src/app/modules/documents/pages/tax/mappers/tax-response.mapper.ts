import { HttpErrorResponse } from '@angular/common/http';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';

export function mapTaxCertificateDownloadResponse(
  title: string = 'TAX.SUCCESS_TITLE'
): ToastProperties {
  return {
    type: ToastType.success,
    title
  };
}

export function mapTaxCertificateDownloadError(response: any): ToastProperties {
  let title = 'TAX.ERROR_TITLE';

  try {
    title =
      response instanceof HttpErrorResponse &&
      JSON.parse(response?.error)?.description
        ? JSON.parse(response.error).description
        : 'TAX.ERROR_TITLE';
  } catch (e) {}

  return {
    title,
    type: ToastType.error
  };
}
