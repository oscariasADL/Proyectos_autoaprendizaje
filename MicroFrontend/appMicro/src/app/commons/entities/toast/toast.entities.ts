import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config';

export enum ToastType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info'
}

export interface ToastProperties {
  type?: ToastType;
  title?: string;
  message?: string;
  override?: Partial<IndividualConfig>;
}
