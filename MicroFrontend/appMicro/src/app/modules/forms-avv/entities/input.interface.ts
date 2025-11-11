export enum AvvInputType {
  text = 'text',
  email = 'email',
  phone = 'phone',
  number = 'number',
  numeric = 'numeric',
  currency = 'currency',
  document = 'document',
  password = 'password',
  creditCard = 'creditCard',
  creditCardExpiration = 'credit_card_expiration',
  creditCardCvc = 'credit_card_cvc',
  secretNumber = 'secret_number',
  month = 'month'
}

export enum GroupStyle {
  thousand = 'thousand',
  lakh = 'lakh',
  wan = 'wan',
  none = 'none'
}

export enum InputMode {
  text = 'text',
  decimal = 'decimal',
  numeric = 'numeric',
  tel = 'tel',
  search = 'search',
  email = 'email',
  url = 'url',
  none = 'none'
}

export const InputModeByType = {
  text: InputMode.text,
  email: InputMode.email,
  phone: InputMode.tel,
  number: InputMode.tel,
  numeric: InputMode.tel,
  currency: InputMode.tel,
  document: InputMode.tel,
  password: InputMode.text,
  credit_card: InputMode.tel,
  secret_number: InputMode.text
};

export enum InputType {
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetimeLocal = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url'
}
