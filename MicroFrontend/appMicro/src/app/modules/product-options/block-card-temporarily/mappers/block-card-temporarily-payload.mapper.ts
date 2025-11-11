import { format } from 'date-fns';
import { TemporaryBlockPayload } from '@modules/security/security-media-activation/entities/security-media.interface';
import { BlockCardTemporarilyFormValue } from '@modules/product-options/block-card-temporarily/entities/block-card-temporarily.interface';
import { DATE_FORMAT_3 } from '@commons/constants/date-format.constants';

export function mapBlockCardTemporarilyPayload(
  values: BlockCardTemporarilyFormValue
): TemporaryBlockPayload {
  const [day, month, year] = values.endDate.split('/').map((n) => parseInt(n));
  return {
    id: values.activationProduct.id,
    endDate: format(new Date(year, month - 1, day), DATE_FORMAT_3)
  };
}
