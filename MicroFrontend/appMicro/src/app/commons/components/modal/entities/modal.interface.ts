export interface ModalData {
  id: string;
  image: string;
  title: string;
  description: string;
  btn: string;
}

export enum ModalTypeIcon {
  Success = 'icons/check.svg',
  Error = 'icons/error-x.svg'
}

export enum ModalType {
  Success = 'Success',
  Error = 'Error'
}

export enum ModalItemType {
  Main = 'main',
  Text = 'text',
  Double = 'double',
  MainWithDescription = 'main-with-description'
}

export interface ModalItem {
  title: string;
  description?: string;
  sub_description?: string;
  type?: ModalItemType;
}

export interface ModalState {
  title: string;
  type: ModalType;
  items?: ModalItem[];
  description?: string;
  className?: string;
  alertItems?: string[];
  buttonTxt?: string;
  url?: string;
  force?: boolean;
  voucher?: {
    title: string;
    description: string;
    data: ModalItem[];
    message: string;
  };
}

export interface VoucherState {
  id: string;
  image: string;
  title: string;
  description: string;
  authorization: string;
  data: ModalItem[];
  message: string;
  btnConfirmText: string;
  btnEditText: string;
}

export const initialModalState: ModalState = {
  title: '',
  type: ModalType.Success,
  items: [],
  description: ''
};
