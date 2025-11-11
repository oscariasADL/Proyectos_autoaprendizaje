export interface PaymentCard {
  title: string;
  number: string;
  icon?: string;
  canDelete?: boolean;
  canPay?: boolean;
  items?: PaymentCardItem[];
  texts?: string[];
  label?: string;
}

interface PaymentCardItem {
  label: string;
  value?: number | string;
  text?: string;
  className?: string;
}
