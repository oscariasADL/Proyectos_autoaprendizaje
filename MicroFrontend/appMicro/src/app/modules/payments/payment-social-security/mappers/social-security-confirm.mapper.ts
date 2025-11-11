import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { capitalizeAll, sanitizeCurrency } from '@commons/helpers/text.helpers';
import { SOCIAL_SECURITY_MONTH_LIST } from '@modules/payments/payment-social-security/constants/social-security-date.constants';
import {
  SOCIAL_SECURITY_AVAILABLE_FIELD,
  SocialSecuritySlide
} from '@modules/payments/payment-social-security/constants/social-security.constants';
import { Contributor } from '@modules/payments/payment-social-security/entities/social-security.interface';
import { getProductType } from '@modules/product/helpers/product.helper';
import { getMonth, getYear, parseISO } from 'date-fns';

export function mapSocialSecurityConfirm(values: any): VoucherItem[] {
  const productOrigin: Product = values.productOrigin;
  const contributor: Contributor = values.contributor;
  const worksheet: string = values.worksheet?.label;
  const worksheetDate: string = values.worksheetDate;
  const worksheetNumber: string = values.worksheetNumber;
  const fee: string = values.fee;
  const { amount } = values.value;

  const { costGmf } = values;
  const gmfMapped = costGmf ? this.currencyFormat.transform(costGmf) : 0;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [
        `${this.currencyFormat.transform(sanitizeCurrency(amount))}`,
        ...(costGmf
          ? [`${this.translate.instant('GMF.VALUE', { value: gmfMapped })} `]
          : [])
      ]
    },
    {
      id: 'contributor',
      label: this.translate.instant('Aportante'),
      fields: [
        capitalizeAll(contributor?.fullName),
        `${contributor?.documentType.toUpperCase()} ${contributor?.documentId}`
      ],
      edit: SocialSecuritySlide.contributor.toString()
    },
    {
      id: 'worksheet',
      label: this.translate.instant('Planilla'),
      fields: [
        worksheet,
        worksheetNumber
          ? `No. ${worksheetNumber}`
          : `${
              SOCIAL_SECURITY_MONTH_LIST[getMonth(parseISO(worksheetDate))]
            } ${getYear(parseISO(worksheetDate))}`
      ],
      edit: SocialSecuritySlide.workSheet.toString()
    },
    {
      id: 'from',
      label: this.translate.instant('Desde'),
      fields: [
        `${getProductType(productOrigin)} No. ${productOrigin.numberProduct}`,
        `Disponible ${this.currencyFormat.transform(
          productOrigin[SOCIAL_SECURITY_AVAILABLE_FIELD]
        )}`
      ],
      edit: SocialSecuritySlide.from.toString()
    },
    {
      id: 'cost',
      label: this.translate.instant('Costo'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(fee))]
    }
  ];
}

export function mapSocialSecurityVoucher(values: any): VoucherItem[] {
  const productOrigin: Product = values.productOrigin;
  const contributor: Contributor = values.contributor;
  const worksheet: string = values.worksheet?.label;
  const worksheetDate: string = values.worksheetDate;
  const worksheetNumber: string = values.worksheetNumber;
  const { amount } = values.value;

  return [
    {
      id: 'amount',
      label: this.translate.instant('Valor'),
      fields: [this.currencyFormat.transform(sanitizeCurrency(amount))]
    },
    {
      id: 'contributor',
      label: this.translate.instant('Aportante'),
      fields: [
        capitalizeAll(contributor?.fullName),
        `${contributor?.documentType.toUpperCase()} ${contributor?.documentId}`
      ]
    },
    {
      id: 'worksheet',
      label: this.translate.instant('Planilla'),
      fields: [
        worksheet,
        worksheetNumber
          ? `No. ${worksheetNumber}`
          : `${
              SOCIAL_SECURITY_MONTH_LIST[getMonth(parseISO(worksheetDate))]
            } ${getYear(parseISO(worksheetDate))}`
      ]
    },
    {
      id: 'from',
      label: this.translate.instant('Desde'),
      fields: [
        `${getProductType(productOrigin)} No. ${productOrigin.numberProduct}`
      ]
    }
  ];
}
