import { VoucherItem } from '@app/commons/components/voucher/entities/voucher.entities';
import { CustomizeAvalTagResponse } from '../../entities/customize-aval-tag.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';

export function customizeResulFailedtMapper(
  error: CustomizeAvalTagResponse,
  ipNumber: string
): VoucherItem[] {
  return [
    {
      id: 'key',
      label: 'Llave',
      fields: [error.newKeyId]
    },
    {
      id: 'type',
      label: 'Tipo:',
      fields: ['Tag Aval o llave alfanumérica']
    },
    {
      id: 'state',
      label: 'Estado',
      fields: ['No se pudo registrar']
    },
    {
      id: 'account',
      label: 'Cuenta asociada',
      fields: [
        `${
          error.accountType === TypeAccount.SDA ? 'Ahorros No' : 'Corriente No'
        } ${error.accountId}`
      ]
    },
    {
      id: 'ip',
      label: 'Direccion IP',
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
