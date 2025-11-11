export const WITHDRAW_FEATURES = [
  {
    id: 'withdraw-feature',
    url: '/withdraw',
    btn: ['menu-withdraw'],
    children: [
      'cash-withdrawals-feature',
      'money-orders-feature',
      'recharges-feature'
    ]
  },
  {
    id: 'cash-withdrawals-feature',
    url: '/cash-withdrawal',
    btn: [
      'btn-cash-withdrawals-service',
      'withdraw-money-without-card-action',
      'withdraw-money-without-card-action-modal'
    ]
  },
  {
    id: 'money-orders-feature',
    url: '/money-order',
    btn: [
      'btn-money-orders-service',
      'order-money-action',
      'order-money-action-modal'
    ]
  },
  {
    id: 'recharges-feature',
    url: '/recharges',
    btn: ['btn-recharges-service', 'mobile-recharge-action-modal']
  },
  {
    id: 'withdraw-feature-hide',
    url: '/withdraw',
    btn: ['menu-withdraw'],
    children: [
      'cash-withdrawals-feature-hide',
      'money-orders-feature-hide',
      'recharges-feature-hide'
    ]
  },
  {
    id: 'cash-withdrawals-feature-hide',
    url: '/cash-withdrawal',
    btn: [
      'btn-cash-withdrawals-service',
      'withdraw-money-without-card-action',
      'withdraw-money-without-card-action-modal'
    ]
  },
  {
    id: 'money-orders-feature-hide',
    url: '/money-order',
    btn: [
      'btn-money-orders-service',
      'order-money-action',
      'order-money-action-modal'
    ]
  },
  {
    id: 'recharges-feature-hide',
    url: '/recharges',
    btn: ['btn-recharges-service', 'mobile-recharge-action-modal']
  }
];
