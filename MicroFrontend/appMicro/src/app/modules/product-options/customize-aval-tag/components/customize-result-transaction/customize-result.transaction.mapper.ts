import { VoucherItem } from '@app/commons/components/voucher/entities/voucher.entities';
import { CustomizeAvalTagResponse } from '../../entities/customize-aval-tag.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';

export function customizeResultMapper(
  response: CustomizeAvalTagResponse,
  ipNumber: string
): VoucherItem[] {
  return [
    {
      id: 'key',
      label: 'Llave',
      fields: [response.newKeyId]
    },
    {
      id: 'type',
      label: 'Tipo:',
      fields: ['Llave alfanumérica']
    },
    {
      id: 'state',
      label: 'Estado',
      fields: [response.status]
    },
    {
      id: 'account',
      label: 'Cuenta asociada',
      fields: [
        `${
          response.accountType === TypeAccount.SDA
            ? 'Ahorros No'
            : 'Corriente No'
        } ${response.accountId}`
      ]
    },
    {
      id: 'ip',
      label: 'Direccion IP:',
      fields: [ipNumber]
    },
    {
      id: 'date',
      label: 'Fecha',
      fields: [`${dateCreator()}`]
    }
  ];
}
function dateCreator(): string {
  const today = new Date();
  const format = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);
  return format;
}
