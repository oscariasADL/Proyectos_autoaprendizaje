export const VALIDATOR_MESSAGES = {
  required: 'Este campo es requerido',
  minlength:
    'Este campo debe tener mínimo {{ control.errors.minlength.requiredLength }} caracteres',
  maxlength:
    'Este campo debe tener máximo {{ control.errors.maxlength.requiredLength }} caracteres',
  email: 'Este campo debe ser email',
  pattern: 'El valor de este campo no es válido',
  min: 'El valor de este campo debe ser mínimo {{ control.errors.min.min }}',
  max: 'El valor de este campo debe ser máximo {{ control.errors.max.max }}',
  valueToSendNotValid: 'El valor no puede ser mayor al saldo disponible',

  transferValueToSendMin:
    'El valor mínimo que puedes transferir es de ${{ control.errors.transferValueToSendMin.value }}',
  transferTransfiyaValueToSendMin:
    'El valor mínimo que puedes transferir es de ${{ control.errors.transferTransfiyaValueToSendMin.value }}',
  transferValueToSendMaxTransfiya:
    'El máximo permitido es ${{ control.errors.transferValueToSendMaxTransfiya.value }}',
  transferCel2celValueToSendMax:
    'El valor máximo que puedes transferir es de ${{ control.errors.transferCel2celValueToSendMax.value }}',
  transferCel2celValueToSendMin:
    'El valor mínimo permitido es ${{ control.errors.transferCel2celValueToSendMin.value }}',
  transferAvalKeyValuePattern: 'El formato es incorrecto',

  transferValueToSendMax:
    'La plata que quieres transferir supera el valor máximo permitido',
  transferValueToSendNotFunds:
    'Tu cuenta de origen no tiene fondos suficientes',
  transferNoteMax:
    'La nota debe tener máximo {{ control.errors.transferNoteMax.value }} caracteres',
  transferInvoiceMax:
    'El No. de factura debe tener máximo {{ control.errors.transferInvoiceMax.value }} caracteres',
  transferAccountNumberNotValid: 'El número de cuenta no es valido',
  transferAccountNumberVillasNumberMax:
    'El número de cuenta debe tener {{ control.errors.transferAccountNumberVillasNumberMax.value }} dígitos',
  transferAccountNumberOtherNumberMax:
    'El número de cuenta debe tener máximo {{ control.errors.transferAccountNumberOtherNumberMax.value }} dígitos',
  transferPhoneNumberInvalid: 'El número de celular es inválido',
  transferPhoneNumberFirstInvalid:
    'El número de celular debe iniciar por {{ control.errors.transferPhoneNumberFirstInvalid.value }}',

  pocketsCreateNameMin:
    'Tu bolsillo debe tener mínimo {{ control.errors.pocketsCreateNameMin.value }} caracter',
  pocketsCreateNameMax15:
    'Tu bolsillo debe tener máximo {{ control.errors.pocketsCreateNameMax15.value }} caracteres',
  pocketsCreateNameMax10:
    'Tu bolsillo debe tener máximo {{ control.errors.pocketsCreateNameMax10.value }} caracteres',
  pocketsCreateNameNotValid:
    'Debes ponerle un nombre a tu bolsillo sin tildes o caracteres especiales',
  pocketsCreateNameExists:
    'Ya creaste un bolsillo con este nombre para la cuenta de origen que seleccionaste',
  pocketsCreateNameNotValidChar: 'El nombre no debe incluir ñ',

  pocketsCreateGoalMin:
    'El valor mínimo para tu meta de ahorro es de ${{ control.errors.pocketsCreateGoalMin.value }}',
  pocketsCreateGoalMax: 'Tu meta supera el valor máximo permitido',
  pocketsCreateGoalAmount:
    'Tu meta debe ser mayor a la plata ahorrada que tienes',

  pocketsCreateQuotaMin:
    'El valor mínimo para tus cuotas de ahorro es de ${{ control.errors.pocketsCreateQuotaMin.value }}',
  pocketsCreateQuotaMax: 'Tu cuota de ahorro supera el valor máximo permitido',
  pocketsCreateQuotaVsGoal:
    'El valor de la cuota debe ser menor al valor de la meta de ahorro',

  pocketCreateOpenAmountMin:
    'El valor mínimo para tu aporte inicial es de ${{ control.errors.pocketCreateOpenAmountMin.value }}',
  pocketCreateOpenAmountMax:
    'El aporte inicial de tu bolsillo supera el valor máximo permitido',
  pocketCreateOpenAmountNotValid:
    'El valor del aporte inicial debe ser menor al valor de la meta de ahorro',
  pocketCreateOpenAmountNotAllowed:
    'El valor del aporte inicial es mayor al saldo disponible de tu cuenta',
  pocketWithReturnsCreateOpenAmountMin:
    'El valor mínimo para tu aporte inicial es de $500.000',
  pocketWithReturnMinGoal: 'El valor mínimo para tu meta es de $500.000',
  noSpecialCharsAllowed: 'Tu bolsillote no puede tener caracteres especiales',
  isLessThanCurrencyValue: 'El valor de la cuota debe ser mínimo $5.000',
  invalidCurrencyFormat: 'El valor debe ser un número válido',
  openAmountExceedsGoal:
    'El valor de apertura no puede ser mayor al de tu meta',
  quotaExceedsGoal: 'El valor de la cuota no puede ser mayor al de la meta',
  openAmountExceedsBalance:
    'El aporte inicial no puede ser mayor al de tu cuenta',
  quotaExceedsBalance:
    'El valor de la cuota no puede ser mayor al de tu cuenta',
  pocketNameIsDuplicated: 'Ya tienes un bolsillo con este nombre',
  pocketsTransferValueToTransferMin:
    'El valor mínimo que puedes transferir es de ${{ control.errors.pocketsTransferValueToTransferMin.value }}',
  pocketsTransferValueToTransferMax:
    'El valor máximo que puedes transferir es el total de plata ahorrada',
  pocketsTransferValueToTransferInsufficientFunds:
    'Tu bolsillo no tiene fondos suficientes para transferir',

  pocketsPayValueToPayMin:
    'El valor mínimo que puedes abonar es de ${{ control.errors.pocketsPayValueToPayMin.value }}',
  pocketsPayValueToPayMax:
    'El valor máximo que puedes abonar es la plata pendiente para completar la meta',
  pocketsPayValueToPayInsufficientFunds:
    'Tu cuenta de origen no tiene fondos suficientes para hacer el abono',

  moneyOrderAmountMin:
    'El valor mínimo del giro es ${{ control.errors.moneyOrderAmountMin.value }}',
  moneyOrderAmountMax:
    'El valor máximo del giro es ${{ control.errors.moneyOrderAmountMax.value }}',
  moneyOrderAmountRestricted:
    'Ingresa un nuevo valor, los cajeros solo entregan billetes de ${{ control.errors.moneyOrderAmountRestricted.billTwentyThousand }}, ${{ control.errors.moneyOrderAmountRestricted.billFiftyThousand }} y ${{ control.errors.moneyOrderAmountRestricted.billOneHundredThousand }}',
  moneyOrderAmountMaxAvailable: 'El valor es mayor al disponible en tu cuenta',
  moneyOrderAmountMultiple:
    'El valor debe ser múltiplo de ${{ control.errors.moneyOrderAmountMultiple.value }}',
  moneyOrderDocumentMin:
    'El número debe ser mayor a {{ control.errors.moneyOrderDocumentMin.value }} dígitos',
  moneyOrderDocumentMax:
    'El número debe ser menor a {{ control.errors.moneyOrderDocumentMax.value }} dígitos',
  moneyOrderDocumentNotValid: 'El número no es válido',

  cashWithdrawalAmountMin:
    'El valor mínimo de retiro es ${{ control.errors.cashWithdrawalAmountMin.value }}',
  cashWithdrawalAmountMax:
    'El valor máximo de retiro es ${{ control.errors.cashWithdrawalAmountMax.value }}',
  cashWithdrawalAmountRestricted:
    'Ingresa un nuevo valor, los cajeros solo entregan billetes de ${{ control.errors.cashWithdrawalAmountRestricted.billTwentyThousand }}, ${{ control.errors.cashWithdrawalAmountRestricted.billFiftyThousand }} y ${{ control.errors.cashWithdrawalAmountRestricted.billOneHundredThousand }}',
  cashWithdrawalAmountMaxAvailable:
    'El valor es mayor al disponible en tu cuenta',
  cashWithdrawalAmountMultiple:
    'El valor debe ser múltiplo de ${{ control.errors.cashWithdrawalAmountMultiple.value }}',

  paymentsPayValueToSendMinLength:
    'El valor a pagar debe ser mínimo ${{ control.errors.paymentsPayValueToSendMinLength.value }}',
  paymentsPayValueToSendMaxLength:
    'El valor a pagar supera el máximo permitido',

  debtPurchaseAccountInvalid: 'Solamente Tarjetas Visa y Mastercard',
  debtPurchaseAccountLength:
    'El número de Tarjeta de Crédito debe tener {{ control.errors.debtPurchaseAccountLength.value }} dígitos',
  debtPurchaseAmountMin:
    'El valor mínimo permitido es ${{ control.errors.debtPurchaseAmountMin.value }}',
  debtPurchaseAmountMaxAvailableCreditCard:
    'El valor es mayor al disponible de tu Tarjeta de Crédito',
  debtPurchaseAmountMaxAvailableRotatingCredit:
    'El valor es mayor al disponible de tu Crédito Rotativo',
  debtPurchaseInstallmentsMin: 'El No. de cuotas es menor al permitido',
  debtPurchaseInstallmentsMax: 'El No. de cuotas es mayor al permitido',

  cardAdvanceAmountMin:
    'El valor mínimo permitido es ${{ control.errors.cardAdvanceAmountMin.value }}',
  cardAdvanceAmountMaxAvailableCreditCard:
    'El valor es mayor al disponible de tu Tarjeta de Crédito',

  useQuotaAmountMin:
    'El valor mínimo permitido es ${{ control.errors.useQuotaAmountMin.value }}',
  useQuotaAmountMaxAvailableCreditCard:
    'El valor es mayor al disponible en tu Crédito Rotativo',

  paymentServicesValueToPayMax: 'El valor es mayor al disponible en tu cuenta',
  paymentServicesValueToPayMin:
    'El valor mínimo que puedes pagar es de ${{ control.errors.paymentServicesValueToPayMin.value }}',
  paymentServicesScheduleAmountMin:
    'El valor mínimo permitido es ${{ control.errors.paymentServicesScheduleAmountMin.value }}',
  paymentServicesScheduleAmountMultiple:
    'El valor debe ser múltiplo de ${{ control.errors.paymentServicesScheduleAmountMultiple.value }}',
  paymentRegisteredServiceToPayMax:
    'El valor máximo permitido es {{ control.errors.paymentRegisteredServiceToPayMax.value }}',

  rechargesAmountMin:
    'El valor mínimo de recarga es ${{ control.errors.rechargesAmountMin.value }}',
  rechargesAmountMax:
    'El valor máximo de recarga es ${{ control.errors.rechargesAmountMax.value }}',
  rechargesAmountMaxAvailable: 'El valor es mayor al disponible en tu cuenta',
  rechargesAmountMultiple:
    'El valor debe ser múltiplo de ${{ control.errors.rechargesAmountMultiple.value }}',
  rechargesPhoneInvalid: 'El número de celular es inválido',
  rechargesPhoneNumberValid:
    'El número de celular debe iniciar por {{ control.errors.rechargesPhoneNumberValid.value }}',

  directedPaymentAmountMax: 'El valor es mayor al disponible en tu cuenta',
  directedPaymentAmountMin:
    'El valor a pagar debe ser mayor o igual a ${{ control.errors.directedPaymentAmountMin.value }}',
  directedPaymentAmountInvalid:
    'El valor a pagar debe ser menor al saldo total',

  updateInstallmentsFieldMin: 'El No. de cuotas es menor al permitido',
  updateInstallmentsFieldMax: 'El No. de cuotas es mayor al permitido',

  creditCardExpirationInvalidYear: 'Año inválido',
  creditCardInvalidCvc: 'Min. 3 dígitos',

  digitalDebitCardAmountMin:
    'El valor mínimo permitido es ${{ control.errors.digitalDebitCardAmountMin.value }}',
  digitalDebitCardAmountMax:
    'El valor máximo permitido es ${{ control.errors.digitalDebitCardAmountMax.value }}',

  qrPayDaleAmountMax:
    'El valor máximo permitido es ${{ control.errors.qrPayDaleAmountMax.value }}',
  qrPayDaleAmountMin:
    'El valor mínimo permitido es ${{ control.errors.qrPayDaleAmountMin.value }}',

  virtualCreditCardAmountMin:
    'El valor mínimo que puedes asignar es de ${{ control.errors.virtualCreditCardAmountMin.value }}.',
  virtualCreditCardAmountMax:
    'Supera el monto máximo de cupo ${{ control.errors.virtualCreditCardAmountMax.value }}.',
  customizeAvalTagAccentCharacters: 'No incluir espacios ni tildes.',
  customizeAvalTagSpecialCharacters:
    'No debe incluir puntos ni caracteres especiales.',
  customizeAvalTagLength: 'Entre 5 a 15 caracteres.'
};
