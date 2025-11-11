export const PRODUCTS_FEATURES = [
  {
    id: 'products-feature',
    url: '/products',
    btn: ['btn-see-all-products', 'see-all-products'],
    children: ['product-detail-feature']
  },
  {
    id: 'product-detail-feature',
    url: '/product-detail',
    btn: [],
    children: [
      'product-debit-purchase-feature',
      'product-card-advance-feature',
      'product-directed-payments-feature',
      'product-update-installments-feature',
      'product-use-quota-feature'
    ]
  },
  {
    id: 'product-debit-purchase-feature',
    url: '/debit-purchase',
    btn: ['debt-purchase-action']
  },
  {
    id: 'product-card-advance-feature',
    url: '/card-advance',
    btn: ['realize-advance-action']
  },
  {
    id: 'product-directed-payments-feature',
    url: '/directed-payments',
    btn: ['direct-payments-action']
  },
  {
    id: 'product-update-installments-feature',
    url: '/update-installments',
    btn: ['update-installments-action-modal']
  },
  {
    id: 'product-use-quota-feature',
    url: '/use-quota',
    btn: ['use-quota-action']
  }
];
