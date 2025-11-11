export const environment = {
  production: false,
  languages: {
    es: 'es',
    en: 'en'
  },
  ath_auth: {
    user: 'auth-user',
    pass: 'thismustbechanged!'
  },
  tealium: false,
  dataDog: {
    enable: false,
    applicationId: '',
    clientToken: '',
    site: '',
    service: ''
  },
  encrypt: false,
  interchange_key: {
    interval_in_minutes: 19
  },
  log_request: false,
  clear_data: false,
  silent_enrollment: true,
  complementary_services: true,
  validate_automatic_otp: true,
  vibot: 'https://pb-dev-avvillas.avaldigitallabs.com/bancadigital/vibot.html',
  benefitsUrl:
    'https://www.avvillas.com.co/productos-en-oficina/cliente-preferente',
  externalOpenAccount: 'https://www.avvillas.com.co/abrir-cuenta-ahorro/',
  remittancesActionsValues:
    'https://ewalletuni.accivalores.com/uni01/landing?t=',
  otp_sender_code: '858',
  static_vector:
    // eslint-disable-next-line max-len
    '3808018D010346445102100E7B8D632E192272E46718D5AAF695180301000401040501100601010701010801090901010A01000B01010C01010E01010F01011001013801033C0101460106470101112F120100130101140101150C4F545020202020202020202016010117040080D0021801002901062A01002B01002C01021147120100130101140102150C4649524D41534320202020201601011704018314D01801041901101A01101B01101C01102101102201102301102401102901082A01002B01002C0102115F120100130101140103150C4649524D4120202020202020160101170401DDD4D21801081901011A01001B01001C01001D01001E01001F01002001002101082201082301082401082501082601082701082801082901082A01002B01002C0102112F120100130101140104150C4F545032202020202020202016010117040080D0021801002901082A01002B01002C01023D35120100130101140101150C4156414C41505020202020201601011704018314D01801011901102101102901052A01002B01002C0102',
  biometric_secret: 'b2b08d0037e7adcdddd3362a8cf0bb54',
  resources: {
    baseAssetsUrl: 'https://mb-dev-app-avvillas.avaldigitallabs.com',
    base: 'https://pb-stg-avvillas.avaldigitallabs.com',
    base_img: './assets/img/'
  },
  api: {
    server_url: 'http://localhost:3000/bavv/bank',
    server_parameter: 'http://localhost:3000/bavv/bank',
    services: {
      auth: {
        ping: '/auth/v1/ping',
        login: '/auth/v1/login',
        logout: '/auth/v1/logout',
        identity: '/auth/v1/identity',
        two_factor_auth: '/auth/v1/two-factor/',
        change_expired_password: '/auth/v1/change-expired-password',
        rsa_biometrics: '/product-operation-server/v1/rsa-biometrics'
      },
      enrollment: {
        base: '/auth/v1/enrollment',
        base_sf: '/bavv-executor-enrollment-core',
        biometrics: '/auth/v1/enrollment/biometrics',
        biometrics_sf: '/bavv-executor-enrollment-core/biometrics',
        silent: '/auth/v1/enrollment/silent'
      },
      core: {
        complementary_services: '/auth/v1/core/complementary-services',
        complementary_services_sf: '/bavv-executor-admin-complementary'
      },
      management: {
        config: '/auth/v1/config-app',
        ip: '/auth/v1/export/ip',
        complementary_services: '/auth/v1/complementary-services',
        change_password: '/auth/v1/password',
        forgot_password: '/auth/v1/password/forgot',
        forgot_password_sf: '/bavv-executor-forgot-password',
        biometrics: '/auth/v1/password/forgot/biometrics',
        biometrics_sf: '/bavv-executor-forgot-password/biometrics',
        preferred_customer: '/vip-customer/v1/vip-customer',
        cdt_details: '/cdt-renewal/v1/details',
        cdt_renewal: '/cdt-renewal/v1/active',
        cdt_cancel: '/cdt-renewal/v1/cancel',
        digital_debit_card_create: '/digital-debit-card/v1/action',
        digital_debit_card_edit: '/digital-debit-card/v1/edit',
        digital_debit_card_list: '/digital-debit-card/v1/consult-by-document',
        digital_debit_card_detail: '/digital-debit-card/v1/detail'
      },
      management_tc_server: {
        agreements_pyc: {
          consult: '/payments/v1/bills/search'
        }
      },
      management_tcd_server: {
        virtual_credit_card_create:
          '/management-tcd-server/v1/digital-credit-card/create',
        virtual_credit_card_edit: '/digital-credit-card',
        virtual_credit_card_list:
          '/management-tcd-server/v1/digital-credit-card/consult',
        virtual_credit_card_detail:
          '/management-tcd-server/v1/digital-credit-card/retrive',
        virtual_credit_card_cancel:
          '/management-tcd-server/v1/digital-credit-card/operations/cancel',
        virtual_credit_card_forward:
          '/management-tcd-server/v1/digital-credit-card/operations/forward',
        virtual_credit_card_modify:
          '/management-tcd-server/v1/digital-credit-card/operations/modify'
      },
      security: {
        interchange: '/auth/v1/security/interchange',
        secondFA: '/2fa-server/v1/notification/qr'
      },
      base: {
        nicknames: '/product/product-information-server/v1/nickname',
        spiUserKeys:
          '/product/product-information-server/v1/spi/consult-keys-user',
        spiAuthorization: '/product-information-server/v1/consent/consult',
        acceptSpiConsent: '/product-information-server/v1/consent/accept',
        fees: '/fees/cost/transaction',
        gmf: '/product-information-server/v1/gmf/validate',
        balance: '/product/rest/v1/customers/products',
        balance_without_detail:
          '/product/product-information-server/v1/products/balance-without-detail',
        suggest_keys: '/product-information-server/v1/spi/suggest-keys',
        movements: '/product/rest/v1/movements/all',
        activations: '/product/rest/v1/customers/products/activation',
        blocking: '/block-products/v1/block/definitive',
        temporary_block: '/block-products/v1/block/temporary',
        aval_balance: '/product/product-detail-server/v1/products/balance/aval',
        aval_tuplus: '/product/rest/v1/customers/products/tuplus',
        aval_stocks: '/product/product-information-server/v1/stocks',
        account_detail: '/product/{id}/detail',
        payroll_advance:
          '/pre-approved-server/v1/payroll-advance/get-Payrolladvance',
        payroll_advance_confirm:
          '/pre-approved-server/v1/payroll-advance/activate-payrolladvance',
        movements_detail: '/product/{id}/movements',
        download_movements_detail: '/statements/v1/statements/file',
        suspicious_transaction:
          '/block-products/v1/uncommon-transactions?id={id}',
        temporary_unblock: '/block-products/v1/unblock/temporary',
        preventive_unblock: '/block-products/v1/unblock/preventive',
        block_account: '/block-account/v1/blocking-product',
        cancel_account: '/product/cancel-account',
        modify_aval_tag: '/product-information-server/v1/spi/modify-tag-aval'
      },
      transactions: {
        withdraw: '/transfers/v1/withdraw',
        use_quota: '/transfers/v1/use-quota',
        card_advance: '/transfers/v1/advances',
        transfiya_debit: '/transfiya/v1/debit-transfer',
        rsa_spi: '/product-operation-server/v1/rsa-spi',
        rsa_spi_block: '/product-operation-server/v1/rsa-spi/block',
        transfiya_request: '/transfiya/v1/require-transfer',
        transfers: {
          own: '/transfers/v1/transfers/own',
          fast: '/transfers/v1/transfers/fast',
          contacts: '/transfers/v1/transfers/contacts',
          avvPhone: '/transfers/v1/cel',
          avvCel2cel: '/transfers/v1/cel2cel',
          breB: '/digital-money-server/v1/bre-b/transfer',
          avvPhoneGetProductsByPhoneNumber:
            '/transfers/v1/find-products-by-phone-number',
          accountAvalKey: '/transfers/v1/spi/account-key-user',
          spiKeyData: '/product-information-server/v1/spi/consult-key'
        }
      },
      pocketWithReturns: {
        detail: '/bavv-pockets-service/v1/pocket/detail',
        update: '/bavv-pockets-service/v1/pocket/update',
        create: '/bavv-pockets-service/v1/pocket/create'
      },
      pocket: {
        transfer: '/pockets/v1/transfer',
        create: '/pockets/v1/product/pocket',
        all: '/bavv-pockets-service/v1/pocket/list-with-collection',
        detail: '/bavv-pockets-service/v1/pocket/detail',
        delete:
          '/bavv-pockets-service/v1/product/{parent_account_id}/{parent_account_type}/pocket/{pocket_id}/{pocket_type}',
        movements: '/pockets/v1/movements'
      },
      statements: {
        extracts: {
          period: '/statements/v1/{product_id}/periods',
          file: '/statements/v1/statements/file'
        },
        tax: {
          certificate: '/statements/v1/certificate/tax?year={year}'
        }
      },
      contact: {
        all: '/contacts/v1/all',
        basic: '/contacts/v1/basic-contact',
        products: '/contacts/v1/products',
        add_product: '/contacts/v1/products/item',
        spi: {
          add_contact: '/bavv-contacts-service/v1/contacts/spi/add-contact',
          update_contact:
            '/bavv-contacts-service/v1/contacts/spi/update-contact',
          contact: '/bavv-contacts-service/v1/contacts/spi/get-contact'
        }
      },
      payments: {
        loans: '/payments/v2/loans',
        loans_pay: '/payments/v1/loans/pay',
        mobile_recharge: '/payments/v1/recharge-phone',
        debt_purchase: '/payments/v1/portfolio-purchase',
        directed_payment: '/payments/v1/directed-payment',
        directed_payment_multiple: '/payments/v2/directed-payment/multiple',
        update_installments: '/payments/v1/update-installments',
        payments_list: '/payments/v1/purchase-term/id/{product_id}',
        installments: '/payments/v1/admin-credit/id/{account_id}',
        debt_purchase_rate:
          '/payments/v1/portfolio-purchase/rate/id/{relative_id}'
      },
      bills: {
        services: '/payments/v1/bills',
        services_pay: '/payments/v1/bills/payment',
        services_pay_multiple: '/payments/v1/bills/payment/multiple',
        services_pay_unregistered: '/payments/v1/bills/payment',
        register_services: '/payments/v1/bills/register',
        search_bill_reference: '/payments/v1/bills/reference',
        barcode: '/payments/v1/bills/barcode',
        social_security: '/payments/v1/pila',
        social_security_pin: '/payments/v1/pila/pin',
        search_services: '/payments/v1/bills/search?search={query}',
        create_scheduling: '/payments/v1/recurring',
        delete_scheduling: '/payments/v1/recurring/delete'
      },
      parameter:
        '/parameterization?domain=bavv-commons&entity={entity}&extension={extension}',
      products: {
        payment_methods: '/payments/v1/payment-methods'
      },
      transfiya: {
        consignments_list: '/transfiya/v1/authorization/consignments',
        requests_list: '/transfiya/v1/authorization/requests',
        consignments_allow: '/transfiya/v1/authorization/consignments/allow',
        authorize_transfer: '/transfiya/v1/authorization/requests/allow',
        refuse_transfer: '/transfiya/v1/authorization/refuse-transfer',
        trust_relationship_list: '/transfiya/v1/trust-relationship/get-all',
        trust_relationship_remove: '/transfiya/v1/trust-relationship/delete',
        default_account: '/transfiya/v1/account-default/query',
        default_account_delete: '/transfiya/v1/account-default/delete'
      },
      notifications: {
        list: '/notifications/v1/latinia',
        toggle: '/notifications/v1/latinia/customer',
        reject: '/2fa-server/v1/push/reject',
        approve: '/2fa-server/v1/push/approve'
      },
      qr: {
        code: '/qr/v1/qr-code',
        payment: '/qr/v1/qr-payment',
        payment_method: '/qr/v1/qr-payment-method/{reference_label}',
        search_business: '/qr/v1/search_business',
        payment_dale: '/qr/v1/qr-payment-dale'
      },
      taxes: {
        tax_cities: '/payments/v1/city',
        tax_agreements: '/payments/v1/agreement',
        tax_agreementDetail: '/payments/v1/agreement/detail',
        tax_detail: '/payments/v1/tax/detail',
        tax_payment: '/payments/v1/tax/payment'
      },
      favorites: {
        base: '/bavv-contacts-service/v1/favorites-transactions',
        delete: '/bavv-contacts-service/v1/favorites-transactions/delete',
        detail: '/bavv-contacts-service/v1/favorites-transactions/detail'
      },
      pfm: {
        fetch_categories_by_type:
          '/pfm/v1/categories?type={categoryType}&product_type={productType}',
        balances_summary:
          '/pfm/v1/{accountId}/balances-summary?start_date={startDate}&end_date={endDate}',
        credit_card_balances_summary:
          '/pfm/v1/creditcard/{accountId}/balance-resume?start_date={startDate}&end_date={endDate}',
        categories_of_movements: '/pfm/v1/movements/product/category-grouped',
        movements_by_category: '/pfm/v1/movements/product/detail',
        change_category: '/pfm/v1/movements',
        adviser_aval: {
          send_start_conversation:
            '/pfm/v1/virtual-assistant/start-conversation',
          environment: 'DEV',
          consejero_aval_script:
            'https://d22cqcdq17sd38.cloudfront.net/adl-idw-frontend-distribution-idw-agent/loader/index.es2017.js'
        }
      },
      wallets: {
        card_list: '/digital-money-server/v1/list-card-bank',
        createWallet: '/digital-money-server/v1/create-wallet',
        prepare_digitization: '/digital-money-server/v1/prepare-digitization',
        last_token: '/digital-money-server/v1/last-token',
        activate_token: '/digital-money-server/v1/activate'
      },
      remittance: {
        customer_validate:
          '/digital-money-server/v1/remittance/customer-validate',
        register_account: '/digital-money-server/v1/remittance/register-account'
      }
    }
  },
  microfrontends: {
    cdt: 'https://d15xep0a81wc2l.cloudfront.net/bavv-mb-frontend-app-mf/remoteEntry.js',
    creditCard: {
      remoteEntryUrl:
        'https://d1mh0ldj2nqa26.cloudfront.net/module-federation/remoteEntry.js',
      remoteName: 'tdc_micro_shell',
      exposedModule: './Module',
      elementName: 'tdc-micro-shell'
    },
    digitalHousing: {
      remoteEntryUrl:
        'https://d2e56heit2hx9e.cloudfront.net/bavv-vivienda-frontend-micro-shell-short-flows-mf/module-federation/remoteEntry.js',
      exposedModule: './angular-wc',
      remoteName: 'micro_shell',
      elementName: 'micro-shell'
    },
    personalLoan: {
      remoteEntryUrl:
        'https://dms8gjr95jk8h.cloudfront.net/bavv-libreinversion-frontend-micro-shell/module-federation/remoteEntry.js',
      exposedModule: './Module',
      remoteName: 'li_micro_shell',
      elementName: 'li-micro-shell'
    },
    pocketsWithReturns: 'http://localhost:4201/remoteEntry.js',
    spiKeys: {
      remoteEntryUrl:
        'https://dn77sdf8xwy5h.cloudfront.net/adl-spi-frontend-mfe-shell/remoteEntry.js',
      exposedModule: './routes',
      remoteName: 'adl_spi_frontend_mfe_shell',
      elementName: 'adl-spi-frontend-mfe-shell'
    },
    biometrics: {
      remoteEntryUrl:
        'https://dv95xuxylz2sk.cloudfront.net/adl-biometria-frontend-bf-mfe-shell/remoteEntry.js',
      exposedModule: './routes',
      elementName: 'app-biometrics-mfe-shell',
      remoteName: 'biometric_shell_app'
    }
  },
  configCat: {
    sdkKey: 'configcat-sdk-1/NZHcCKv7KEeD8EHTQ3SzOA/HSu5duHE_EqmHzW9S5WjxQ'
  },
  newRelic: {
    iOSApp: '',
    androidApp: ''
  }
};
