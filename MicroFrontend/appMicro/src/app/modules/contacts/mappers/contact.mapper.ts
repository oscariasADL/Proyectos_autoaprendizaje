import { CONTACTS } from '@commons/constants/navigate.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  ContactProductActionType,
  TYPE_ACCOUNT_PAYMENT_CREDITS,
  TYPE_ACCOUNT_TRANSFER_ACCOUNTS
} from '@modules/contacts/entities/contact-product.interface';
import {
  Contact,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';

export function mapContactsFiltered(
  contacts: Contact[],
  filter: string
): Contact[] {
  return contacts && filter
    ? contacts.filter(
        (contact: Contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.nickname.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;
}

export function mapContacts(contacts: Contact[]): Contact[] {
  return !isNullOrUndefined(contacts)
    ? contacts.map((contact: Contact) => ({
        ...contact,
        urlDetail: `${CONTACTS.toString()}/detail/${
          contact.identificationData.id
        }/${contact.identificationData.idType}`,
        urlEdit: `${CONTACTS.toString()}/edit/${
          contact.identificationData.id
        }/${contact.identificationData.idType}`
      }))
    : contacts;
}

function mapContactProductAction(product: ContactProduct): {
  action: ContactProductActionType;
  actionLabel: string;
  id: string;
} {
  const productTypeId: TypeAccount = product.type.id as TypeAccount;
  const actionType = {
    action: ContactProductActionType.none,
    actionLabel: '',
    id: ''
  };

  if (TYPE_ACCOUNT_TRANSFER_ACCOUNTS.includes(productTypeId)) {
    actionType.action = ContactProductActionType.transfer;
    actionType.actionLabel = 'CONTACTS.DETAIL.ACTIONS.TRANSFER';
    actionType.id = `contact-${product.number}-btn-transfer`;
  } else if (TYPE_ACCOUNT_PAYMENT_CREDITS.includes(productTypeId)) {
    actionType.action = ContactProductActionType.payment;
    actionType.actionLabel = 'CONTACTS.DETAIL.ACTIONS.PAY';
    actionType.id = `contact-${product.number}-btn-pay`;
  }
  return actionType;
}

export function mapContactProducts(
  products: ContactProduct[]
): ContactProduct[] {
  return !isNullOrUndefined(products)
    ? products.map((product: ContactProduct) => {
        const data = mapContactProductAction(product);
        return {
          ...product,
          ...(data.action !== ContactProductActionType.none ? { ...data } : {})
        };
      })
    : products;
}
