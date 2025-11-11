export enum VoucherItemType {
  Main = 'main',
  Double = 'double',
  MainWithDescription = 'main-with-description',
  MultipleItems = 'multiple-items',
  Note = 'note',
  List = 'list',
  AdditionalData = 'additional-data',
  None = 'd-none',
  WithAction = 'with-action'
}

export interface VoucherItem {
  id: string;
  label?: string;
  fields: string[];
  type?: VoucherItemType;
  edit?: string;
  actionIcon?: string;
  additionalData?: any;

  utagCategory?: string | null;
  utag?: string | null;
}
