import { environment as ENV } from '@environment';

export const FEATURE_THAT_SHOW_RATING = [
  ENV.api.services.transactions.withdraw,
  ENV.api.services.transactions.use_quota,
  ENV.api.services.payments.mobile_recharge,
  ENV.api.services.transactions.transfers.avvPhone,
  ENV.api.services.transactions.transfiya_debit,
  ENV.api.services.transactions.transfers.fast,
  ENV.api.services.payments.loans_pay,
  ENV.api.services.bills.services_pay,
  ENV.api.services.bills.services_pay_unregistered
];

export const FEATURE_THAT_SHOW_SURVEY = {
  CEL2CEL_SEND: ENV.api.services.transactions.transfers.avvCel2cel
};
