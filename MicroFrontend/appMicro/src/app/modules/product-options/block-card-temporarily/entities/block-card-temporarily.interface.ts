import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';
import { FormControl } from '@angular/forms';

export interface ConfirmationModalContent {
  icon: string;
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

export interface BlockCardTemporarilyForm {
  activationProduct: FormControl<ActivationProduct>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  confirmation: FormControl<any>;
}

export interface BlockCardTemporarilyFormValue {
  activationProduct: ActivationProduct;
  startDate: string;
  endDate: string;
  confirmation: any;
}

export enum ActivationStatusLabel {
  'ACTIVA' = 'Activa',
  'BLOQUEO_TEMPORAL' = 'Bloqueada temporalmente'
}
