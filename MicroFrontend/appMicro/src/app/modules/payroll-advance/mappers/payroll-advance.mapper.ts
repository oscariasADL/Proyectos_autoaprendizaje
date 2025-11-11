import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { PayrollAdvanceVoucherItem } from '../entities/payroll-advance.entities';
import { ProductNumberMaskPipe } from '@app/commons/pipes/product-number-mask.pipe';

export function mapVoucherItems(values: any): PayrollAdvanceVoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  const currentDate = new Date();
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentYear = currentDate.getFullYear();

  const productNumberMaskPipe = new ProductNumberMaskPipe();

  const currentHour = currentDate
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .toLowerCase();

  const maskedNumberProduct = productNumberMaskPipe.transform(
    values.numberProduct,
    4,
    3
  );

  return [
    {
      id: '1',
      label: 'Valor',
      fields: [
        currencyFormatPipe.transform(String(values.payrollAdvanceAmount))
      ]
    },
    {
      id: '2',
      label: 'Hacia',
      fields: [`Ahorros No. ${maskedNumberProduct}`]
    },
    {
      id: '3',
      label: 'Fecha',
      fields: [
        `${currentDay}/${currentMonth}/${currentYear}`,
        `Hora: ${currentHour}`
      ]
    }
  ];
}
