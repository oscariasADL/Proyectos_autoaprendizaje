import { Contact } from '@modules/contacts/entities/contact.interface';

export const contactListFeatureName = 'contactListState';

export type ContactListState = Readonly<{
  contacts: Contact[];
  filter: string;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialContactListState: ContactListState = {
  contacts: null,
  filter: '',
  working: false,
  completed: false,
  message: ''
};
