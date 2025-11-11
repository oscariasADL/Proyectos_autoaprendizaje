export const PAYMENTS_FEATURES = [
  {
    id: 'payments-feature',
    url: '/payments',
    btn: ['menu-payments'],
    children: [
      'payments-credits-feature',
      'payments-credits-pay-feature',
      'payments-services-feature',
      'payments-action-modal'
    ]
  },
  {
    id: 'payments-credits-feature',
    url: '/payments/credits',
    btn: ['btn-payments-credits']
  },
  {
    id: 'payments-credits-pay-feature',
    url: '/payments/credits/pay',
    btn: ['pay-credit-btn', 'payment-card-btn']
  },
  {
    id: 'payments-services-feature',
    url: '/payments/services',
    btn: ['btn-payments-services']
  },
  {
    id: 'payments-services-pay-feature',
    url: '/payments/services/pay',
    btn: ['payment-card-btn']
  },
  {
    id: 'payments-services-pay-unregistered-feature',
    url: '/payments/services/pay/unregistered',
    btn: ['pay-unregistered-service-link']
  }
];
