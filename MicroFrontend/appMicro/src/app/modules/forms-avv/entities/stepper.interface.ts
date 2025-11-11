export interface Step {
  id: number;
  label: string;
}

export enum SlideType {
  accounts = 'accounts',
  amount = 'amount',
  outlet = 'outlet',
  field = 'field',
  form = 'form',
  confirmation = 'confirmation',
  withdrawalChannels = 'withdrawalChannels',
  telephoneCompanies = 'telephoneCompanies'
}
