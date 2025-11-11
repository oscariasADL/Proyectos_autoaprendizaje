import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { PaymentServicesResponse } from '@modules/payments/payment-services/entities/payment-services.interface';
import orderBy from 'lodash/orderBy';

export function mapServiceList(
  services: PaymentServicesResponse
): PaymentServicesResponse {
  if (isNullOrUndefined(services)) {
    return services;
  }
  const { biller, noBiller } = services;
  return {
    biller: orderBy(biller, ['enablePaymentButton'], ['desc']),
    noBiller
  };
}
