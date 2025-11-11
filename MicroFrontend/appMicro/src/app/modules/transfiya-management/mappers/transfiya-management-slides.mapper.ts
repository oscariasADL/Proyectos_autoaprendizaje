import { UntypedFormGroup } from '@angular/forms';
import { SlideType } from '@modules/forms-avv/entities/stepper.interface';
import { GenericStepperData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransfiyaManagementSlide } from '@modules/transfiya-management/constants/transfiya-management.constants';

export function mapTransfiyaManagementSlides(
  form: UntypedFormGroup
): GenericStepperData {
  const { isDispatch } = form.value;
  return {
    [TransfiyaManagementSlide.management]: {
      type: SlideType.outlet,
      data: {
        outletName: 'management'
      },
      step: TransfiyaManagementSlide.management
    },
    [TransfiyaManagementSlide.confirmation]: {
      type: SlideType.confirmation,
      data: {
        title: isDispatch
          ? 'Vas a transferir'
          : 'Vas a aceptar una transferencia',
        control: form.get('confirmation'),
        buttonText: isDispatch ? 'Transferir' : 'Aceptar Transferencia'
      },
      step: TransfiyaManagementSlide.confirmation
    }
  };
}
