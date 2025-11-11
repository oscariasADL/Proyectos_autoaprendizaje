import { ToastComponent } from '@commons/components/toast/toast.component';

export const TOAST_CONFIGURATION = {
  positionClass: 'toast-top-full-width',
  toastComponent: ToastComponent,
  timeOut: 20000,
  extendedTimeOut: 20000,
  preventDuplicates: true,
  maxOpened: 3,
  autoDismiss: true,
  iconClasses: {
    error: 'avv-toast-error',
    info: 'avv-toast-info',
    success: 'avv-toast-success',
    warning: 'avv-toast-warning'
  }
};
