/* eslint-disable max-lines */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutWithFooterComponent } from '@modules/layout/components/layout-with-footer/layout-with-footer.component';
import { LayoutPage } from './layout.page';
import { PocketCreateWithReturnsGuardCanActivate } from '../pockets/guards/pockets.guard';

const routes: Routes = [
  {
    path: 'aval',
    data: {
      preload: true
    },
    loadChildren: () => import('../aval/aval.module').then((m) => m.AvalModule)
  },
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: '',
        component: LayoutWithFooterComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule)
          },
          {
            path: 'product-detail',
            data: {
              preload: true
            },
            loadChildren: () =>
              import('../product-detail/product-detail.module').then(
                (m) => m.ProductDetailPageModule
              )
          },
          {
            data: {
              preload: true
            },
            path: 'products',
            loadChildren: () =>
              import('../products/products.module').then(
                (m) => m.ProductsPageModule
              )
          },
          {
            path: 'payments',
            loadChildren: () =>
              import('../payments/payment-home/payments.module').then(
                (m) => m.PaymentsPageModule
              )
          },
          {
            path: 'transfers',
            loadChildren: () =>
              import(
                '../transfers/pages/transfers-home/transfers-home.module'
              ).then((m) => m.TransfersHomePageModule)
          },
          {
            path: 'withdraw',
            loadChildren: () =>
              import('../withdraw/pages/withdraw-home/withdraw.module').then(
                (m) => m.WithdrawPageModule
              )
          },
          {
            path: 'favorites',
            loadChildren: () =>
              import(
                '../favorites/pages/favorites-home/favorites-home.module'
              ).then((m) => m.FavoritesHomePageModule)
          }
        ]
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('../contacts/pages/contact-list/contact-list.module').then(
            (m) => m.ContactListPageModule
          )
      },
      {
        path: 'contacts/detail',
        loadChildren: () =>
          import('../contacts/pages/contact-detail/contact-detail.module').then(
            (m) => m.ContactDetailPageModule
          )
      },
      {
        path: 'payments',
        children: [
          {
            path: 'credits',
            loadChildren: () =>
              import(
                '../payments/payment-credits/pages/payment-credits-home/payment-credits-page.module'
              ).then((m) => m.PaymentCreditsPageModule)
          },
          {
            path: 'services',
            loadChildren: () =>
              import(
                '../payments/payment-services/pages/payment-services-home/payment-services-page.module'
              ).then((m) => m.PaymentServicesPageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'error-without-products',
    loadChildren: () =>
      import(
        '../product-options/error-without-products/error-without-products.module'
      ).then((m) => m.ErrorWithoutProductsModule)
  },
  {
    path: 'extracts',
    loadChildren: () =>
      import('../documents/pages/extracts/extracts.module').then(
        (m) => m.ExtractsPageModule
      )
  },
  {
    path: 'tax-certificates',
    loadChildren: () =>
      import('../documents/pages/tax/tax.module').then((m) => m.TaxPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('../change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      )
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('../documents/documents.module').then((m) => m.DocumentsPageModule)
  },
  {
    path: 'pockets',
    loadChildren: () =>
      import('../pockets/pages/pockets-home/pockets-home.module').then(
        (m) => m.PocketsHomePageModule
      )
  },
  {
    path: 'pockets/detail',
    loadChildren: () =>
      import('../pockets/pages/pocket-detail/pocket-detail.module').then(
        (m) => m.PocketDetailPageModule
      )
  },
  {
    path: 'pockets-with-returns/detail',
    loadChildren: () =>
      import(
        '../pockets/pages/pocket-detail-with-returns/pocket-detail-with-returns.module'
      ).then((m) => m.PocketDetailWithReturnsPageModule)
  },

  {
    path: 'pockets-with-returns/edit',
    loadChildren: () =>
      import(
        '../pockets/pages/edit-pocket-with-returns/edit-pocket-with-returns.module'
      ).then((m) => m.EditPocketWithReturnsPageModule)
  },
  {
    path: 'pockets/create',
    loadChildren: () =>
      import('../pockets/pages/pocket-create/pocket-create.module').then(
        (m) => m.PocketCreatePageModule
      )
  },
  {
    path: 'pockets/create-with-returns',
    loadChildren: () =>
      import(
        '../pockets/pages/pocket-create-with-returns/pocket-create-with-returns.module'
      ).then((m) => m.PocketCreateWithReturnsPageModule),
    canActivate: [PocketCreateWithReturnsGuardCanActivate]
  },
  {
    path: 'pockets/pocket-has-no-products',
    loadComponent: () =>
      import(
        '../pockets/pages/pockets-has-no-products/pockets-has-no-products.component'
      ).then((c) => c.PocketsHasNoProductsComponent)
  },
  {
    path: 'pockets/create/onboarding',
    loadComponent: () =>
      import(
        '../pockets/pages/pocket-create-onboarding/pocket-create-onboarding.component'
      ).then((c) => c.PocketCreateOnboardingComponent)
  },
  {
    path: 'pockets/edit',
    loadChildren: () =>
      import('../pockets/pages/pocket-edit/pocket-edit.module').then(
        (m) => m.PocketEditPageModule
      )
  },

  {
    path: 'pockets/transfer',
    loadChildren: () =>
      import('../pockets/pages/pocket-transfer/pocket-transfer.module').then(
        (m) => m.PocketTransferPageModule
      )
  },
  {
    path: 'pockets/pay',
    loadChildren: () =>
      import('../pockets/pages/pocket-pay/pocket-pay.module').then(
        (m) => m.PocketPayPageModule
      )
  },
  {
    path: 'recharges',
    loadChildren: () =>
      import('../product-options/recharges/recharges.module').then(
        (m) => m.RechargesPageModule
      )
  },
  {
    path: 'payments',
    children: [
      {
        path: 'credits/pay',
        data: {
          preload: true
        },
        loadChildren: () =>
          import(
            '../payments/payment-credits/pages/payment-credits-pay/payment-credits-pay.module'
          ).then((m) => m.PaymentCreditsPayPageModule)
      },
      {
        path: 'services/pay',
        loadChildren: () =>
          import(
            '../payments/payment-services/pages/payment-services-pay/payment-services-pay.module'
          ).then((m) => m.PaymentServicesPayPageModule)
      },
      {
        path: 'services/pay/multiple',
        loadChildren: () =>
          import(
            '../payments/payment-services/pages/payment-services-pay-multiple/payment-services-pay-multiple.module'
          ).then((m) => m.PaymentServicesPayMultiplePageModule)
      },
      {
        path: 'services/pay/unregistered',
        loadChildren: () =>
          import(
            '../payments/payment-services/pages/payment-unregistered-service/payment-unregistered-service.module'
          ).then((m) => m.PaymentUnregisteredServicePageModule)
      },
      {
        path: 'services/create-scheduling',
        loadChildren: () =>
          import(
            '../payments/payment-services/pages/payment-services-create-scheduling/payment-services-create-scheduling.module'
          ).then((m) => m.PaymentServicesCreateSchedulingPageModule)
      },
      {
        path: 'taxes/pay',
        loadChildren: () =>
          import('../payments/payment-taxes/pages/pay-tax/pay-tax.module').then(
            (m) => m.PayTaxPageModule
          )
      },
      {
        path: 'social-security',
        loadChildren: () =>
          import(
            '../payments/payment-social-security/payment-social-security.module'
          ).then((m) => m.PaymentSocialSecurityPageModule)
      }
    ]
  },
  {
    path: 'card-advance',
    loadChildren: () =>
      import('../product-options/card-advance/card-advance.module').then(
        (m) => m.CardAdvancePageModule
      )
  },
  {
    path: 'use-quota',
    loadChildren: () =>
      import('../product-options/use-quota/use-quota.module').then(
        (m) => m.UseQuotaPageModule
      )
  },
  {
    path: 'cdt-renewal',
    loadChildren: () =>
      import(
        '../product-options/cdt-renewal/pages/cdt-renewal-step/cdt-renewal-step.module'
      ).then((m) => m.CdtRenewalStepPageModule)
  },
  {
    path: 'qr',
    loadChildren: () =>
      import('../qr/pages/qr-home/qr-home.module').then(
        (m) => m.QrHomePageModule
      )
  },
  {
    path: 'qr/pay',
    loadChildren: () =>
      import('../qr/pages/qr-pay/qr-pay.module').then((m) => m.QrPayPageModule)
  },
  {
    path: 'payroll-advance',
    loadChildren: () =>
      import('../payroll-advance/payroll-advance.module').then(
        (m) => m.PayrollAdvancePageModule
      )
  },
  {
    path: 'security',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../security/security-home/security-home.module').then(
            (m) => m.SecurityHomePageModule
          )
      },
      {
        path: 'biometrics',
        loadChildren: () =>
          import(
            '../security/security-biometrics/security-biometrics.module'
          ).then((m) => m.SecurityBiometricsPageModule)
      },
      {
        path: 'complementary-services',
        loadChildren: () =>
          import(
            '../security/security-complementary-services/security-complementary-services.module'
          ).then((m) => m.SecurityComplementaryServicesPageModule)
      },
      {
        path: 'media-activation',
        loadChildren: () =>
          import(
            '../security/security-media-activation/security-media-activation.module'
          ).then((m) => m.SecurityMediaActivationPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import(
            '../security/security-notifications/security-notifications.module'
          ).then((m) => m.SecurityNotificationsPageModule)
      }
    ]
  },
  {
    path: 'contacts/add-product',
    loadChildren: () =>
      import(
        '../contacts/pages/contact-add-product/contact-add-product.module'
      ).then((m) => m.ContactAddProductPageModule)
  },
  {
    path: 'movements-detail',
    loadChildren: () =>
      import(
        '../product-options/movements-detail/movements-detail.module'
      ).then((m) => m.MovementsDetailPageModule)
  },
  {
    path: 'transfer-contacts',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-contacts/transfers-contacts.module'
      ).then((m) => m.TransfersContactsPageModule)
  },
  {
    path: 'transfer-avv-account',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-avv-account/transfers-avv-account.module'
      ).then((m) => m.TransfersAvvAccountModule)
  },
  {
    path: 'transfer-remittances',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-remittances/transfers-remittances.module'
      ).then((m) => m.TransfersRemittancesPageModule)
  },
  {
    path: 'transfer-transfiya',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-transfiya/transfers-transfiya.module'
      ).then((m) => m.TransfersTransfiyaPageModule)
  },
  {
    path: 'transfer-avv-phone',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-avv-phone/transfers-avv-phone.module'
      ).then((m) => m.TransfersAvvPhoneModule)
  },
  {
    path: 'transfer-unregistered-accounts',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-unregistered-accounts/transfers-unregistered-accounts.module'
      ).then((m) => m.TransfersUnregisteredAccountsPageModule)
  },
  {
    path: 'send-transfiya',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-send-money/transfers-send-money.module'
      ).then((m) => m.TransfersSendMoneyModule)
  },
  {
    path: 'request-transfiya',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-request-money/transfers-request-money.module'
      ).then((m) => m.TransfersRequestMoneyPageModule)
  },
  {
    path: 'pending-transfers',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-pending/transfers-pending.module'
      ).then((m) => m.TransfersPendingPageModule)
  },
  {
    path: 'admin-transfiya',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-admin-transfiya/transfers-admin-transfiya.module'
      ).then((m) => m.TransfersAdminTransfiyaPageModule)
  },
  {
    path: 'default-account',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-default-account/transfers-default-account.module'
      ).then((m) => m.TransfersDefaultAccountPageModule)
  },
  {
    path: 'trust-relation',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-trust-relation/transfers-trust-relation.module'
      ).then((m) => m.TransfersTrustRelationPageModule)
  },
  {
    path: 'transfiya-management',
    loadChildren: () =>
      import('../transfiya-management/transfiya-management.module').then(
        (m) => m.TransfiyaManagementPageModule
      )
  },
  {
    path: 'cash-withdrawal',
    loadChildren: () =>
      import('../withdraw/pages/cash-withdrawals/cash-withdrawals.module').then(
        (m) => m.CashWithdrawalsPageModule
      )
  },
  {
    path: 'money-order',
    loadChildren: () =>
      import('../withdraw/pages/money-orders/money-orders.module').then(
        (m) => m.MoneyOrdersPageModule
      )
  },
  {
    path: 'directed-payments',
    loadChildren: () =>
      import(
        '../product-options/credit-movements/pages/directed-payment/directed-payment.module'
      ).then((m) => m.DirectedPaymentPageModule)
  },
  {
    path: 'update-installments',
    loadChildren: () =>
      import(
        '../product-options/credit-movements/pages/update-installments/update-installments.module'
      ).then((m) => m.UpdateInstallmentsPageModule)
  },
  {
    path: 'debit-purchase',
    loadChildren: () =>
      import('../product-options/debit-purchase/debit-purchase.module').then(
        (m) => m.DebitPurchasePageModule
      )
  },
  {
    path: 'digital-debit-card',
    children: [
      {
        path: '',
        redirectTo: 'activate',
        pathMatch: 'full'
      },
      {
        path: 'activate',
        loadChildren: () =>
          import(
            '../digital-debit-card/pages/activate-digital-debit-card/activate-digital-debit-card.module'
          ).then((m) => m.ActivateDigitalDebitCardPageModule)
      }
    ]
  },
  {
    path: 'favorites/transfer',
    loadChildren: () =>
      import(
        '../favorites/pages/favorites-transfer/favorites-transfer.module'
      ).then((m) => m.FavoritesTransferModule)
  },
  {
    path: 'favorites/edit',
    loadChildren: () =>
      import('../favorites/pages/favorites-edit/favorites-edit.module').then(
        (m) => m.FavoritesEditModule
      )
  },
  {
    path: 'favorites/new',
    loadChildren: () =>
      import('../favorites/pages/favorites-add/favorites-add.module').then(
        (m) => m.FavoritesAddModule
      )
  },

  {
    path: 'transfers-cel2cel-home',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-cel2cel-home/transfers-cel2cel-home.module'
      ).then((m) => m.TransfersCel2celHomePageModule)
  },
  {
    path: 'transfers-cel2cel-send',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.module'
      ).then((m) => m.TransfersCel2celSendPageModule)
  },
  {
    path: 'transfers-cel2cel-request',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-cel2cel-request/transfers-cel2cel-request.module'
      ).then((m) => m.TransfersCel2celRequestPageModule)
  },
  {
    path: 'bre-b-transfers',
    loadChildren: () =>
      import('../transfers/pages/bre-b-transfers/bre-b-transfers.module').then(
        (m) => m.BreBTransfersModule
      )
  },
  {
    path: 'block-account',
    loadChildren: () =>
      import('../product-options/block-account/block-account.module').then(
        (m) => m.BlockAccountPageModule
      )
  },
  {
    path: 'block-card-temporarily',
    loadChildren: () =>
      import(
        '../product-options/block-card-temporarily/block-card-temporarily.module'
      ).then((m) => m.BlockCardTemporarilyPageModule)
  },
  {
    path: 'customize-aval-tag',
    loadChildren: () =>
      import(
        '../product-options/customize-aval-tag/customize-aval-tag.module'
      ).then((m) => m.CustomizeAvalTagModule)
  },
  {
    path: 'wallets',
    loadChildren: () =>
      import('../wallets/wallets.module').then((m) => m.WalletsModule)
  },
  {
    path: 'transfer-aval-tag',
    loadChildren: () =>
      import(
        '../transfers/pages/transfers-aval-key/transfers-aval-key.module'
      ).then((m) => m.TransfersAvalKeyPageModule)
  },
  {
    path: 'virtual-credit-card',
    children: [
      {
        path: 'activate',
        loadChildren: () =>
          import(
            '../virtual-credit-card/pages/activate-virtual-credit-card/activate-virtual-credit-card.module'
          ).then((m) => m.ActivateVirtualCreditCardPageModule)
      },
      {
        path: 'activate/onboarding',
        loadChildren: () =>
          import(
            '@modules/virtual-credit-card/pages/onboarding-activate-virtual-credit-card/onboarding-activate-virtual-credit-card.module'
          ).then((m) => m.OnboardingActivateVirtualCreditCardPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutPageRoutingModule {}
