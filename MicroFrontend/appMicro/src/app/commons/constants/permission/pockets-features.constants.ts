export const POCKETS_FEATURES = [
  {
    id: 'pockets-feature',
    url: '/pockets',
    btn: [
      'side-menu-pockets',
      'admin-pockets-action',
      'admin-pockets-action-modal'
    ],
    children: [
      'pockets-create-feature',
      'pockets-detail-feature',
      'pockets-edit-feature',
      'pockets-pay-feature',
      'pockets-transfer-feature'
    ]
  },
  {
    id: 'pockets-create-feature',
    url: '/pockets/create',
    btn: ['btn-pocket-create']
  },
  {
    id: 'pockets-detail-feature',
    url: '/pockets/detail',
    btn: []
  },
  {
    id: 'pockets-edit-feature',
    url: '/pockets/edit',
    btn: ['pocket-detail-modify']
  },
  {
    id: 'pockets-pay-feature',
    url: '/pockets/pay',
    btn: ['pay-action']
  },
  {
    id: 'pockets-transfer-feature',
    url: '/pockets/transfer',
    btn: ['transfer-action']
  }
];
