import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import { DirectedPaymentResponse } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { capitalize, capitalizeAll } from '@commons/helpers/text.helpers';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

export function mapDirectedPaymentSuccessResponse(
  response: DirectedPaymentResponse[],
  items: VoucherItem[]
): AlertSheetProperties {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  const directedPaymentSuccess = response.filter(
    (directedPayment) => directedPayment.directedPaymentStatus
  );
  const directedPaymentFailed = response.filter(
    (directedPayment) => !directedPayment.directedPaymentStatus
  );
  const allSuccess =
    response.length === directedPaymentSuccess.reduce((acc) => acc + 1, 0);
  const isMultiple = response.length > 1;
  const [firstPayment] = response;

  return {
    type: AlertSheetType.success,
    id: isMultiple
      ? 'directed-payment-success-alert'
      : 'directed-payment-one-success-alert',
    title: allSuccess
      ? isMultiple
        ? 'DIRECTED_PAYMENTS.RESPONSE.SUCCESS.TITLE'
        : 'DIRECTED_PAYMENTS.RESPONSE.SUCCESS.TITLE_ONE'
      : 'DIRECTED_PAYMENTS.RESPONSE.SUCCESS.TITLE_ALT',
    ...(!isMultiple
      ? {
          description: 'DIRECTED_PAYMENTS.RESPONSE.SUCCESS.AUTHORIZATION',
          reference: firstPayment.approvalId
        }
      : !allSuccess
      ? {
          description: 'DIRECTED_PAYMENTS.RESPONSE.SUCCESS.FINISHED',
          reference: `${directedPaymentSuccess.length} ${
            directedPaymentSuccess.length > 1
              ? 'pagos exitosos'
              : 'pago exitoso'
          } / <span style="color: red" class="failed">${
            directedPaymentFailed.length
          } ${
            directedPaymentFailed.length > 1 ? 'pagos fallidos' : 'pago fallido'
          }</span>`
        }
      : {}),
    message: 'DIRECTED_PAYMENTS.RESPONSE.MESSAGE',
    items: [
      {
        id: 'transactions',
        label: mapSuccessTransactionsLabels(directedPaymentSuccess),
        fields: [
          ...directedPaymentSuccess.reduce((accumulator, directedPayment) => {
            accumulator.push(
              '&nbsp;',
              currencyFormatPipe.transform(directedPayment.directedPayment),
              ...(isMultiple ? [directedPayment.approvalId, '&nbsp;'] : [])
            );
            return accumulator;
          }, [])
        ]
      },
      {
        id: 'amount',
        label: 'Valor total',
        fields: [
          currencyFormatPipe.transform(
            directedPaymentSuccess.reduce(
              (acc, curr) => acc + Number(curr.directedPayment),
              0
            )
          )
        ]
      },
      ...items.filter((item) => item.id !== 'amount'),
      ...(isMultiple
        ? [
            {
              id: 'transaction-failed',
              label: mapFailedTransactionsLabels(directedPaymentFailed),
              fields: []
            }
          ]
        : [])
    ]
  };
}

export function mapDirectedPaymentFailedResponse(
  response: DirectedPaymentResponse[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'directed-payment-failed-alert',
    title: 'DIRECTED_PAYMENTS.RESPONSE.ERROR.TITLE_FAILED',
    sublistInfo: '<br/>' + mapFailedTransactionsLabels(response, false),
    cssClass: 'avv-btn-primary',
    buttons: ['DIRECTED_PAYMENTS.RESPONSE.ERROR.BUTTON']
  };
}

export function mapDirectedPaymentError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'directed-payment-error-alert',
    title: 'DIRECTED_PAYMENTS.RESPONSE.ERROR.TITLE',
    description: mapError(error)
  };
}

function mapSuccessTransactionsLabels(
  directedPaymentResponses: DirectedPaymentResponse[]
): string {
  const length = directedPaymentResponses.length;
  return directedPaymentResponses.reduce((accumulator, directedPayment) => {
    const label =
      `${capitalize(
        directedPayment.purchaseDescription
      )}<br/> <small>${capitalizeAll(
        directedPayment.companyDescription
      )}</small><br/>` +
      (length > 1 ? '<small>No. de aprobación</small><br/><br/>' : '');
    return accumulator + label;
  }, '');
}

function mapFailedTransactionsLabels(
  directedPaymentResponses: DirectedPaymentResponse[],
  withInitLabel: boolean = true
): string {
  const length = directedPaymentResponses.length;
  const initLabel = withInitLabel
    ? length > 0
      ? `<i class="icon-cruz failed"></i> Pagos fallidos <br/><br/>`
      : ''
    : '';
  return directedPaymentResponses.reduce((accumulator, directedPayment) => {
    const label =
      `<b>${capitalize(
        directedPayment.purchaseDescription
      )}</b><br/> ${capitalizeAll(directedPayment.companyDescription)}<br/>` +
      `<small>Error: ${directedPayment.messageError}</small>` +
      (length > 1 ? '<br/><br/>' : '');
    return accumulator + label;
  }, initLabel);
}
