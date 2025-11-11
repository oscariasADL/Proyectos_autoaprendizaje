/* eslint-disable max-lines */
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
  tealium: true,
  dataDog: {
    enable: false,
    applicationId: '9123d780-231c-4031-b7fe-cb9524f51ef1',
    clientToken: 'pub6bb3e9cfb51308d0b8305deec360856d',
    site: 'datadoghq.com',
    service: 'rum_stg'
  },
  encrypt: true,
  interchange_key: {
    interval_in_minutes: 19
  },
  log_request: false,
  clear_data: false,
  silent_enrollment: true,
  complementary_services: true,
  validate_automatic_otp: true,
  vibot: 'https://pb-stg-avvillas.avaldigitallabs.com/bancadigital/vibot.html',
  benefitsUrl:
    'https://www.avvillas.com.co/productos-en-oficina/cliente-preferente',
  externalOpenAccount: 'https://www.avvillas.com.co/abrir-cuenta-ahorro/',
  remittancesActionsValues:
    'https://ewalletuni.accivalores.com/uni01/landing?t=',
  otp_sender_code: '891084',
  static_vector:
    // eslint-disable-next-line max-len
    '3808018D010346445102100E7B8D632E192272E46718D5AAF695180301000401040501100601010701010801090901010A01000B01010C01010E01010F01011001013801033C0101460106470101112F120100130101140101150C4F545020202020202020202016010117040080D0021801002901062A01002B01002C01021147120100130101140102150C4649524D41534320202020201601011704018314D01801041901101A01101B01101C01102101102201102301102401102901082A01002B01002C0102115F120100130101140103150C4649524D4120202020202020160101170401DDD4D21801081901011A01001B01001C01001D01001E01001F01002001002101082201082301082401082501082601082701082801082901082A01002B01002C0102112F120100130101140104150C4F545032202020202020202016010117040080D0021801002901082A01002B01002C01023D35120100130101140101150C4156414C41505020202020201601011704018314D01801011901102101102901052A01002B01002C0102',
  biometric_secret: 'b2b08d0037e7adcdddd3362a8cf0bb54',
  resources: {
    baseAssetsUrl: 'https://mb-stg-app-avvillas.avaldigitallabs.com',
    base: 'https://pb-stg-avvillas.avaldigitallabs.com',
    base_img: './assets/img/'
  },
  api: {
    server_url: 'https://mb-stg-api-avvillas.avaldigitallabs.com',
    server_parameter: 'https://mb-stg-cache-avvillas.avaldigitallabs.com',
    services: {
      auth: {
        ping: '/auth-service/v1/ping',
        login: '/auth-service/v1/token',
        logout: '/auth-service/v1/token/logout',
        identity: '/auth-service/v1/identity',
        two_factor_auth: '/auth-service/v1/two-factor-auth/transaction',
        change_expired_password: '/auth-service/v1/change-expired-password/',
        rsa_biometrics: '/product-operation-server/v1/rsa-biometrics'
      },
      enrollment: {
        base: '/enrollment-core',
        base_sf: '/bavv-executor-enrollment-core',
        biometrics: '/biometrics',
        biometrics_sf: '/bavv-executor-enrollment-core/biometrics',
        silent: '/silent-migration'
      },
      core: {
        complementary_services: '/core/complementary-services',
        complementary_services_sf: '/bavv-executor-admin-complementary'
      },
      management: {
        config: '/management-api/v1/config',
        ip: '/management-api/v1/basic-data/ip',
        complementary_services: '/management-api/v1/complementary-services',
        change_password: '/management-api/v1/password',
        forgot_password: '/pswd/forgot',
        forgot_password_sf: '/bavv-executor-forgot-password',
        biometrics: '/biometrics',
        biometrics_sf: '/bavv-executor-forgot-password/biometrics',
        preferred_customer: '/management-api/v1/preferred-client',
        cdt_details: '/management-api/v1/renovation-cdt-digital',
        cdt_renewal: '/management-api/v1/renovation-cdt-digital/active',
        cdt_cancel: '/management-api/v1/renovation-cdt-digital/cancel',
        digital_debit_card_create:
          '/management-td-server/v1/digital-debit-card-management',
        digital_debit_card_edit:
          '/management-td-server/v1/digital-debit-card-management/modify',
        digital_debit_card_list:
          '/management-td-server/v1/digital-debit-card/consult-by-document',
        digital_debit_card_detail:
          '/management-td-server/v1/digital-debit-card/consult/detail'
      },
      management_tc_server: {
        agreements_pyc: {
          consult: '/management-tc-server/v1/agreements-pyc/consult'
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
        interchange: '/security/interchange',
        secondFA: '/2fa-server/v1/notification/qr'
      },
      base: {
        nicknames: '/product-information-server/v1/nickname',
        spiUserKeys: '/product-information-server/v1/spi/consult-keys-user',
        spiAuthorization: '/product-information-server/v1/consent/consult',
        acceptSpiConsent: '/product-information-server/v1/consent/accept',
        fees: '/bavv-tx-service/v1/cost/transaction',
        gmf: '/product-operation-server/v1/gmf/validate',
        balance_without_detail:
          '/product-information-server/v1/products/balance-without-detail',
        suggest_keys: '/product-information-server/v1/spi/suggest-keys',
        movements: '/product-detail-server/v1/products/movements',
        activations: '/product-operation-server/v1/products/activation',
        blocking: '/product-operation-server/v1/products/blocking/definitive',
        temporary_block:
          '/product-operation-server/v1/products/blocking/temporary',
        aval_balance: '/product-detail-server/v1/products/balance/aval',
        aval_tuplus: '/tuplus-service/v1/product/balance/tuplus',
        aval_stocks: '/product-information-server/v1/stocks',
        account_detail: '/product-detail-server/v1/product/{id}/detail',
        payroll_advance:
          '/pre-approved-server/v1/payroll-advance/get-Payrolladvance',
        payroll_advance_confirm:
          '/pre-approved-server/v1/payroll-advance/activate-payrolladvance',
        movements_detail: '/product-detail-server/v1/product/{id}/movements',
        download_movements_detail:
          '/product-detail-server/v1/product/{id}/movements/file/{fileType}',
        suspicious_transaction:
          '/bavv-tx-service/v1/products/unblocking/uncommon-transactions?id={id}',
        temporary_unblock: '/product-operation-server/v1/products/unblocking',
        preventive_unblock:
          '/bavv-tx-service/v1/products/unblocking/uncommon-transactions',
        block_account: '/management-api/v1/blocking-product',
        cancel_account: '/product-operation-server/v1/products/cancellation',
        modify_aval_tag: '/product-information-server/v1/spi/modify-tag-aval'
      },
      transactions: {
        withdraw: '/bavv-tx-service/v1/cashout-otp',
        use_quota: '/bavv-tx-service/v1/extra-money',
        card_advance: '/bavv-tx-service/v1/advances',
        transfiya_debit: '/transfiya/v1/debit-transfer',
        transfiya_request: '/transfiya/v1/require-transfer',
        transfers: {
          own: '/bavv-tx-service/v1/transfers/own',
          fast: '/bavv-tx-service/v1/transfers/fast',
          contacts: '/bavv-tx-service/v1/transfers/contacts',
          avvPhone: '/bavv-tx-service/v1/transfers/cel',
          avvCel2cel: '/digital-money-server/v1/cel-to-cel/transfer',
          breB: '/digital-money-server/v1/bre-b/transfer',
          avvPhoneGetProductsByPhoneNumber:
            '/digital-money-server/v1/cel-to-cel',
          accountAvalKey: '/product-information-server/v1/spi/account-key-user',
          spiKeyData: '/product-information-server/v1/spi/consult-key'
        },
        rsa_spi: '/product-operation-server/v1/rsa-spi',
        rsa_spi_block: '/product-operation-server/v1/rsa-spi/block'
      },
      pocketWithReturns: {
        detail: '/bavv-pockets-service/v1/pocket/detail',
        update: '/bavv-pockets-service/v1/pocket/update',
        create: '/bavv-pockets-service/v1/pocket/create'
      },
      pocket: {
        transfer: '/bavv-pockets-service/v1/transfer',
        create: '/bavv-pockets-service/v1/product/pocket',
        all: '/bavv-pockets-service/v1/pocket/list-with-collection',
        detail: '/bavv-pockets-service/v1/pocket/detail',
        delete:
          '/bavv-pockets-service/v1/product/{parent_account_id}/{parent_account_type}/pocket/{pocket_id}/{pocket_type}',
        movements: '/bavv-pockets-service/v1/movement'
      },
      statements: {
        extracts: {
          period: '/bavv-statements-service/v1/statements/{product_id}/periods',
          file: '/bavv-statements-service/v1/statements/file'
        },
        tax: {
          certificate: '/bavv-statements-service/v1/certificate/tax?year={year}'
        }
      },
      contact: {
        all: '/bavv-contacts-service/v1/contacts',
        basic: '/bavv-contacts-service/v1/contacts/basic-contact',
        products: '/bavv-contacts-service/v1/contacts/products/all',
        add_product: '/bavv-contacts-service/v1/contacts/products/item',
        spi: {
          add_contact: '/bavv-contacts-service/v1/contacts/spi/add-contact',
          update_contact:
            '/bavv-contacts-service/v1/contacts/spi/update-contact',
          contact: '/bavv-contacts-service/v1/contacts/spi/get-contact'
        }
      },
      payments: {
        loans: '/bavv-payments-service/v1/loans',
        loans_pay: '/bavv-payments-service/v1/payment',
        mobile_recharge: '/bavv-payments-service/v1/recharge-phone',
        debt_purchase: '/bavv-payments-service/v1/portfolio-purchase',
        directed_payment: '/bavv-payments-service/v1/directed-payment',
        directed_payment_multiple:
          '/bavv-payments-service/v1/directed-payment/multiple',
        update_installments: '/bavv-payments-service/v1/purchase-term',
        installments: '/bavv-payments-service/v1/admin-credit/id/{account_id}',
        payments_list:
          '/bavv-payments-service/v1/purchase-term/id/{product_id}',
        debt_purchase_rate:
          '/bavv-payments-service/v1/portfolio-purchase/rate/id/{relative_id}'
      },
      bills: {
        services: '/bavv-bills-service/v1/bills',
        services_pay: '/bavv-bills-service/v1/bills/payment',
        services_pay_multiple: '/bavv-bills-service/v1/bills/payment/multiple',
        services_pay_unregistered:
          '/bavv-bills-service/v1/bills/payment/unregistered',
        register_services: '/bavv-bills-service/v1/bills',
        search_bill_reference: '/bavv-bills-service/v1/bills/detail',
        barcode: '/bavv-bills-service/v1/bills/detail/barcode',
        social_security: '/bavv-bills-service/v1/pila',
        social_security_pin: '/bavv-bills-service/v1/pila/pin',
        search_services: '/bavv-agreements?search={query}',
        create_scheduling: '/bavv-bills-service/v1/recurring',
        delete_scheduling: '/bavv-bills-service/v1/recurring/delete'
      },
      parameter:
        '/bavv-parameterization/v1/file?domain=bavv-commons&entity={entity}&extension={extension}',
      products: {
        payment_methods: '/products/v1/payment-methods'
      },
      transfiya: {
        consignments_list: '/transfiya/v1/credit-inquire',
        requests_list: '/transfiya/v1/debit-inquire',
        consignments_allow: '/transfiya/v1/credit-transfer',
        authorize_transfer: '/transfiya/v1/authorize-transfer',
        refuse_transfer: '/transfiya/v1/refuse-transfer',
        trust_relationship_list: '/transfiya/v1/trust-relationship/get-all',
        trust_relationship_remove: '/transfiya/v1/trust-relationship/delete',
        default_account: '/transfiya/v1/account-default/query',
        default_account_delete: '/transfiya/v1/account-default/delete'
      },
      notifications: {
        list: '/notifications-api/v1/public/latinia',
        toggle: '/notifications-api/v1/latinia/customer',
        reject: '/2fa-server/v1/push/reject',
        approve: '/2fa-server/v1/push/approve'
      },
      qr: {
        code: '/qr-aval-service/v1/qr-code',
        payment: '/qr-aval-service/v1/qr-payment',
        payment_method:
          '/qr-aval-service/v1/qr-payment-method/{reference_label}',
        search_business: '/digital-money-server/v1/consult-commerce-dale',
        payment_dale: '/digital-money-server/v1/payment-qr'
      },
      taxes: {
        tax_cities: '/bavv-bills-service/v1/tax/city',
        tax_agreements: '/bavv-bills-service/v1/tax/agreement',
        tax_agreementDetail: '/bavv-bills-service/v1/tax/agreement/detail',
        tax_detail: '/bavv-bills-service/v1/tax/detail',
        tax_payment: '/bavv-bills-service/v1/tax/payment'
      },
      favorites: {
        base: '/bavv-contacts-service/v1/favorites-transactions',
        delete: '/bavv-contacts-service/v1/favorites-transactions/delete',
        detail: '/bavv-contacts-service/v1/favorites-transactions/detail'
      },
      pfm: {
        fetch_categories_by_type:
          '/pfm/v1/categories/category-type?type={categoryType}&product_type={productType}',
        balances_summary:
          '/pfm/v1/products/{accountId}/balance-resume?start_date={startDate}&end_date={endDate}',
        credit_card_balances_summary:
          '/pfm/v1/creditcard/{accountId}/balance-resume?start_date={startDate}&end_date={endDate}',
        categories_of_movements: '/pfm/v1/movements/product/category-grouped',
        movements_by_category: '/pfm/v1/movements/product/detail',
        change_category: '/pfm/v1/movements',
        adviser_aval: {
          send_start_conversation:
            '/pfm/v1/virtual-assistant/start-conversation',
          environment: 'STG',
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
        'https://dgkiephx079m7.cloudfront.net/module-federation/remoteEntry.js',
      remoteName: 'tdc_micro_shell',
      exposedModule: './Module',
      elementName: 'tdc-micro-shell'
    },
    digitalHousing: {
      remoteEntryUrl:
        'https://d29u5oetb55chy.cloudfront.net/bavv-vivienda-frontend-micro-shell-short-flows-mf/module-federation/remoteEntry.js',
      exposedModule: './angular-wc',
      remoteName: 'micro_shell',
      elementName: 'micro-shell'
    },
    personalLoan: {
      remoteEntryUrl:
        'https://d26oy94sksknu0.cloudfront.net/bavv-libreinversion-frontend-micro-shell/module-federation/remoteEntry.js',
      exposedModule: './Module',
      remoteName: 'li_micro_shell',
      elementName: 'li-micro-shell'
    },
    pocketsWithReturns: 'http://localhost:4201/remoteEntry.js',
    spiKeys: {
      remoteEntryUrl:
        'https://d8wlfymonoo2b.cloudfront.net/adl-spi-frontend-mfe-shell/remoteEntry.js',
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
    sdkKey: 'configcat-sdk-1/NZHcCKv7KEeD8EHTQ3SzOA/JrrtFbyFx0K2zy7y7ZyhXQ'
  },
  newRelic: {
    iOSApp: 'AAe507c1700f4e42975b32b5208df33597f722321a-NRMA',
    androidApp: 'AAb7c8302a0186c410413456b3e4ad63d8ecbb76ab-NRMA'
  }
};
