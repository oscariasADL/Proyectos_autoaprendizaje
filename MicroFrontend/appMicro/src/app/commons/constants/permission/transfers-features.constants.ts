export const DOCUMENTS_FEATURES = [
  {
    id: 'transfers-feature',
    url: '/transfers',
    btn: ['menu-transfer', 'transfer-action', 'transfer-action-modal'],
    children: ['quick-transfer-feature', 'request-transfiya-feature']
  },
  {
    id: 'quick-transfer-feature',
    url: '/quick-transfer',
    btn: ['btn-transfers-link']
  },
  {
    id: 'request-transfiya-feature',
    url: '/request-transfiya',
    btn: ['btn-request-money']
  },
  {
    id: 'transfiya-management-dispatch-feature',
    url: '/transfiya-management/dispatch',
    btn: []
  },
  {
    id: 'transfiya-management-consignment-feature',
    url: '/transfiya-management/consignment',
    btn: []
  }
];
