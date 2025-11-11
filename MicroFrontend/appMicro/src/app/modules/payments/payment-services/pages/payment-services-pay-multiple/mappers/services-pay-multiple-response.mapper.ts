import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import {
  PayBillResponse,
  PayBillsMultiplePayload,
  PayBillsMultipleResponse
} from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';
import {
  VoucherItem,
  VoucherItemType
} from '@commons/components/voucher/entities/voucher.entities';
import { capitalize, capitalizeAll } from '@commons/helpers/text.helpers';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

export function mapServicesPayMultipleSuccessResponse(
  response: PayBillsMultipleResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  const paymentBillList = response?.paymentBillList || [];
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  const paymentBillsMultipleSuccess = response?.paymentBillList?.filter(
    (paymentBill) => paymentBill.statusPayment
  );
  const paymentBillsMultipleFailed = response?.paymentBillList?.filter(
    (paymentBill) => !paymentBill.statusPayment
  );
  const allSuccess =
    paymentBillList.length ===
    paymentBillsMultipleSuccess.reduce((acc) => acc + 1, 0);
  const isMultiple = paymentBillList.length > 1;
  const [firstPaymentBill] = paymentBillList;

  return {
    type: AlertSheetType.success,
    id: 'payment-service-pay-multiple-success-alert',
    title: allSuccess
      ? !isMultiple
        ? 'PAYMENTS.SERVICES.RESPONSE.SUCCESS.TITLE'
        : 'PAYMENTS.SERVICES.RESPONSE.SUCCESS.TITLE_MULTIPLE'
      : 'PAYMENTS.SERVICES.RESPONSE.SUCCESS.TITLE_MULTIPLE_ALT',
    ...(!isMultiple
      ? {
          description: 'PAYMENTS.SERVICES.RESPONSE.SUCCESS.AUTHORIZATION',
          reference: firstPaymentBill.approvalId
        }
      : !allSuccess
      ? {
          description: 'PAYMENTS.SERVICES.RESPONSE.SUCCESS.FINISHED',
          reference: `${paymentBillsMultipleSuccess.length} ${
            paymentBillsMultipleSuccess.length > 1
              ? 'pagos exitosos'
              : 'pago exitoso'
          } / <span style="color: red" class="failed">${
            paymentBillsMultipleFailed.length
          } ${
            paymentBillsMultipleFailed.length > 1
              ? 'pagos fallidos'
              : 'pago fallido'
          }</span>`
        }
      : {}),
    message: 'PAYMENTS.SERVICES.RESPONSE.MESSAGE',
    items: [
      ...mapSuccessServicesPayMultipleTransactions(
        paymentBillsMultipleSuccess,
        isMultiple
      ),
      /*{
        id: 'transactions',
        label: mapSuccessServicesPayMultipleLabels(paymentBillsMultipleSuccess),
        fields: [
          ...paymentBillsMultipleSuccess.reduce((accumulator, paymentBill) => {
            accumulator.push(
              '&nbsp;',
              `<small>${currencyFormatPipe.transform(
                paymentBill.amount
              )}</small>`,
              ...(paymentBillsMultipleSuccess.length > 1
                ? [`<small>${paymentBill.approvalId}</small>`, '&nbsp;']
                : [])
            );
            return accumulator;
          }, [])
        ]
      },*/
      {
        id: 'amount',
        label: 'Valor total',
        fields: [
          currencyFormatPipe.transform(
            paymentBillsMultipleSuccess.reduce(
              (acc, curr) => acc + Number(curr.amount),
              0
            )
          )
        ]
      },
      ...items.filter((item) => item.id !== 'amount'),
      ...(isMultiple && paymentBillsMultipleFailed?.length > 0
        ? [
            {
              id: 'transaction-failed',
              label: mapFailedServicesPayMultipleLabels(
                paymentBillsMultipleFailed
              ),
              fields: [],
              type: VoucherItemType.Note
            }
          ]
        : [])
    ]
  };
}

function mapSuccessServicesPayMultipleTransactions(
  payBillsResponse: PayBillResponse[],
  isMultiple: boolean
): VoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  return payBillsResponse.map((paymentBill, index) => ({
    id: 'transaction-' + index,
    label: mapSuccessServicesPayMultipleLabels(paymentBill, isMultiple),
    fields: [
      '&nbsp;',
      `<small>${currencyFormatPipe.transform(paymentBill.amount)}</small>`,
      ...(isMultiple ? [`<small>${paymentBill.approvalId}</small>`] : [])
    ],
    type: VoucherItemType.WithAction,
    actionIcon: 'icon-descarga',
    additionalData: paymentBill
  }));
}

function mapSuccessServicesPayMultipleLabels(
  payBillsResponse: PayBillResponse,
  isMultiple: boolean
): string {
  return `${capitalize(
    payBillsResponse.organizationName
  )}<br/> <small>Ref. de pago ${capitalizeAll(
    payBillsResponse.referenceId
  )}</small><br/> ${isMultiple ? '<small>No. de aprobación</small>' : ''}`;
}

export function mapServicesPayMultipleFailedResponse(
  response: PayBillsMultipleResponse
): AlertSheetProperties {
  const { paymentBillList } = response;
  return {
    type: AlertSheetType.error,
    id: 'payment-service-pay-multiple-failed-alert',
    title:
      paymentBillList?.length > 1
        ? 'PAYMENTS.SERVICES.RESPONSE.ERROR.TITLE_MULTIPLE'
        : 'PAYMENTS.SERVICES.RESPONSE.ERROR.TITLE',
    sublistInfo:
      '<br/>' + mapFailedServicesPayMultipleLabels(paymentBillList, false),
    cssClass: 'avv-btn-primary',
    buttons: ['PAYMENTS.SERVICES.RESPONSE.ERROR.BUTTON']
  };
}

function mapFailedServicesPayMultipleLabels(
  payBillsResponse: PayBillResponse[],
  withInitLabel: boolean = true
): string {
  const length = payBillsResponse.length;
  const initLabel = withInitLabel
    ? length > 0
      ? `<i class="icon-cruz failed"></i> Pagos fallidos <br/><br/>`
      : ''
    : '';
  return payBillsResponse.reduce((accumulator, paymentBill) => {
    const label =
      `<b>${capitalize(
        paymentBill.organizationName
      )}</b><br/> Ref. de pago ${capitalizeAll(paymentBill.referenceId)}<br/>` +
      `<small>Error: ${paymentBill.messageError}</small>` +
      (length > 1 ? '<br/><br/>' : '');
    return accumulator + label;
  }, initLabel);
}
