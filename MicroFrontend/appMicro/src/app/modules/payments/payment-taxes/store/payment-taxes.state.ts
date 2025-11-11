import {
  AgreementDetail,
  AgreementTaxes,
  CityPaymentTaxes
} from '@modules/payments/payment-taxes/entities/payment-taxes.interface';

export const paymentTaxesfeatureName = 'paymentTaxesModule';

export interface PaymentTaxesState {
  cities: {
    list: CityPaymentTaxes[];
    working: boolean;
    completed: boolean;
    message: string;
  };
  agreements: {
    list: AgreementTaxes[];
    working: boolean;
    completed: boolean;
    message: string;
  };
  agreementDetail: {
    data: AgreementDetail;
    working: boolean;
    completed: boolean;
    notFound: boolean;
    message: string;
  };
}

export const initialPaymentTaxesState: PaymentTaxesState = {
  cities: {
    list: [],
    working: false,
    completed: false,
    message: ''
  },
  agreements: {
    list: [],
    working: false,
    completed: false,
    message: ''
  },
  agreementDetail: {
    data: null,
    working: false,
    completed: false,
    notFound: false,
    message: ''
  }
};
