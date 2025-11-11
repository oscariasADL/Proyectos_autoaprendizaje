import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import {
  QR_PAY_SCAN_ID,
  QrPaySlide,
  QrPayStep
} from '@modules/qr/pages/qr-pay/constants/qr-pay.constants';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export function mapQrPaySlides(form: UntypedFormGroup): GenericStepperData {
  return {
    [QrPaySlide.data]: {
      type: SlideType.outlet,
      data: {
        outletName: 'data'
      },
      step: QrPayStep[QrPaySlide.data]
    },
    [QrPaySlide.installments]: {
      type: SlideType.outlet,
      data: {
        outletName: 'installments'
      },
      step: QrPayStep[QrPaySlide.installments]
    },
    [QrPaySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a pagar',
        control: form.get('confirmation'),
        buttonText: 'Pagar',
        buttonOptionText: 'Leer QR de nuevo',
        buttonOptionIcon: 'icon-qr',
        buttonOptionId: QR_PAY_SCAN_ID
      },
      step: QrPayStep[QrPaySlide.confirmation]
    }
  };
}

export function mapQrCancelSlides(form: UntypedFormGroup): GenericStepperData {
  return {
    [QrPaySlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: 'Vas a anular la compra de',
        control: form.get('confirmation'),
        buttonText: 'Anular compra',
        buttonOptionText: 'Leer QR de nuevo',
        buttonOptionIcon: 'icon-qr',
        buttonOptionId: QR_PAY_SCAN_ID
      },
      step: QrPayStep[QrPaySlide.confirmation]
    }
  };
}
