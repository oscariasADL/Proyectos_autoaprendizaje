import { ContactProduct } from '@modules/contacts/entities/contact.interface';

export const contactDetailFeatureName = 'contactDetailState';

export type ContactDetailState = Readonly<{
  products: ContactProduct[];
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialContactDetailState: ContactDetailState = {
  products: null,
  working: false,
  completed: false,
  message: ''
};
