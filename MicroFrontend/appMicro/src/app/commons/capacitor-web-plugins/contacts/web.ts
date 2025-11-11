import { WebPlugin } from '@capacitor/core';
import { Contact, ContactsPlugin, PermissionStatus } from './definitions';

const CONTACTS_MOCK: any[] = [
  {
    displayName: 'Yotas',
    phoneNumbers: [{ number: '(313) 456-7890' }, { number: '(313) 456-7890' }]
  },
  { displayName: 'Casa', phoneNumbers: [{ number: '(031) 431-2501' }] },
  { displayName: 'Sofia', phoneNumbers: [{ number: '+57 300 5271921' }] },
  {
    displayName: 'Maria',
    phoneNumbers: [{ number: '311 4213123' }, { number: '315 4563190' }]
  },
  { displayName: 'Pedro Gomez', phoneNumbers: [{ number: '314 4213123' }] },
  { displayName: 'Seguros Pajarin', phoneNumbers: [{ number: '315 4213123' }] },
  {
    displayName: 'Usuario 1019100204',
    phoneNumbers: [{ number: '3134668501' }]
  }
];

export class ContactsPluginWeb extends WebPlugin implements ContactsPlugin {
  public async getPermissions(): Promise<PermissionStatus> {
    return Promise.resolve({ granted: true });
  }

  public async getContacts(): Promise<{ contacts: Contact[] }> {
    return Promise.resolve({ contacts: CONTACTS_MOCK });
  }
}
