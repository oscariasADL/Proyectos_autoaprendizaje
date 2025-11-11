import { AbstractControl, UntypedFormControl, FormGroup } from '@angular/forms';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ProductFilterSelector } from '@commons/entities/product/product-types.interface';
import { AvvInputType } from '@modules/forms-avv/entities/input.interface';
import { SlideType, Step } from '@modules/forms-avv/entities/stepper.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { GenericStepperBase } from '../generic-stepper.base';

export interface InitSlideI {
  initSlide: string;
  alternativeSlide: string;
  field?: string;
}

export interface SetdataI {
  backUrl: string[] | ((component: GenericStepperBase) => string[]);
  steps: Step[] | ((component: GenericStepperBase) => Step[]);
  exitData: AlertSheetProperties;
  data: (component: GenericStepperBase) => GenericStepperData;
  confirmMapper: any;
  voucherMapper: any;
}

export interface VerifyFieldI {
  step: string;
  field?: string;
  activateField?: boolean;
  title?: string;
  description?: string;
}

export interface GenericStepperData {
  [key: string]: {
    type: SlideType;
    step: number;
    data: GenericStepData;
  };
}

export interface GenericStepData {
  id?: string;
  title?: string;
  label?: string;
  message?: string;
  type?: AvvInputType;
  description?: string;
  outletName?: string;
  form?: any[];
  advertisement?: string;
  notice?: string;
  noticeInfo?: string;
  dropdownLabel?: string;
  noticeError?: string;
  buttonText?: string;
  buttonOptionText?: string;
  buttonOptionIcon?: string;
  buttonOptionId?: string;
  disabledField?: string;
  informationText?: string;
  hasException?: boolean;
  validateAmount?: number;
  allowInputOperations?: boolean;
  nextSteps?: { [key: string]: string };
  accountFilters?: ProductFilterSelector;
  accountType?: ProductStyleType;
  control?: AbstractControl | UntypedFormControl;
  contact?: AbstractControl | UntypedFormControl;
  asyncMessage?: AbstractControl | UntypedFormControl;
  productSelected?: AbstractControl | UntypedFormControl;
  sourceData?: AbstractControl | UntypedFormControl;
  fromProduct?: AbstractControl | UntypedFormControl;
  accountException?: { title: string; description: string };
  transferType?: AbstractControl | UntypedFormControl;
  amount?: AbstractControl | UntypedFormControl;
  showAccordionSourceDataStep?: boolean;
  selectCellPhoneContacts?: boolean;
  phoneNumber?: AbstractControl | UntypedFormControl;
  displayName?: AbstractControl | UntypedFormControl;
  addenda?: AbstractControl | UntypedFormControl;
  messageType?: string;
  messages?: string[];
  utagCategory?: string;
  utag?: string;
  headerMessage?: string;
  noticeWarning?: string;
  formData?: any;
  iconImage?: string;
}

export interface NextStep {
  accounts?: {
    title?: string;
    control?: AbstractControl | UntypedFormControl;
  };
}

export interface AlertStepData {
  voucher: VoucherItem[];
  backUrl: string[];
}

export enum StepperTypes {
  informationPanel = 'informationPanel'
}

export enum StepperExceptions {
  closeStepper = 'closeStepper'
}
