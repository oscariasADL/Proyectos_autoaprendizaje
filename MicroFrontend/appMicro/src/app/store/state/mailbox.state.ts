import { MailboxItem } from '@commons/entities/notifications/mailbox.entities';

export type MailboxState = Readonly<{
  working: boolean;
  completed: boolean;
  mailboxList: MailboxItem[];
}>;

export const initialMailboxState: MailboxState = {
  working: false,
  completed: false,
  mailboxList: []
};
