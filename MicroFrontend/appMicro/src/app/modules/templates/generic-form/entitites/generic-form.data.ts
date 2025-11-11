import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';

export enum TemplateType {
  image = 'image',
  title = 'title',
  description = 'description',
  form = 'form',
  account = 'account'
}

export enum FieldType {
  input = 'input',
  dropdown = 'dropdown',
  dropdownAccount = 'dropdown_account',
  dropdownCompany = 'dropdown_company',
  note = 'note'
}

interface FieldForm {
  fieldType: FieldType;
  type?: string;
  id?: string;
  label: string;
  control?: AbstractControl | UntypedFormControl;
  items?: any[];
  hide?: boolean;
}

export interface GenericInfo {
  backUrl: string;
  mapResponse: any;
  mapError: any;
}

export interface TemplateForm {
  type: TemplateType;
  label?: string;
  form?: UntypedFormGroup;
  action?: any;
  fields?: FieldForm[];
  account?: ProductDetail;
}

export interface GenericFormData {
  id: string;
  backUrl: string;
  pageName: string;
  feePayload: any;
  template: TemplateForm[];
  voucher: any;
}
