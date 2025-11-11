import { BlockCardTemporarilyFormValue } from '@modules/product-options/block-card-temporarily/entities/block-card-temporarily.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { srcImgFranchiseV2 } from '@modules/product/helpers/product.helper';
import { BlockCardTemporarilySlide } from '@modules/product-options/block-card-temporarily/constants/block-card-temporarily.constants';

export function mapBlockCardTemporarilyConfirm(
  values: BlockCardTemporarilyFormValue
): VoucherItem[] {
  const activationProduct = values.activationProduct;
  const endDate = values.endDate;
  const startDate = values.startDate;
  return [
    {
      id: 'from',
      label: 'Producto',
      fields: [
        activationProduct.name,
        `<img alt="icon"
          class="franchise-img"
          src="${srcImgFranchiseV2(
            activationProduct.cardFranchise ?? 'MASTERCARD'
          )}">
        No. ${activationProduct.cardId}`
      ]
    },
    {
      id: 'date',
      label: 'Fechas de bloqueo',
      fields: [`Del ${startDate}`, `al ${endDate}`],
      edit: BlockCardTemporarilySlide.date
    }
  ];
}
