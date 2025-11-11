export interface Adviser {
  contactName: string;
  contactPhone: string | boolean;
  contactEmail: string | boolean;
  contactJobTitle: string;
}

export interface CustomerFinancialAdvocateParameters {
  name_1?: string;
  name_2?: string;
  address?: string;
  schedule?: string;
  email?: string;
  phone?: string;
  web?: string;
}
