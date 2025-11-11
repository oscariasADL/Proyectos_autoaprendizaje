import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';
import {
  EXTRACTS,
  TAX_CERTIFICATES
} from '@commons/constants/navigate.constants';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

export const DOCUMENT_LIST: AvvIconsBtnList[] = [
  {
    label: 'DOCUMENTS.ITEMS.EXTRACTS',
    image: 'illustrationsV2/extracto-dinero-regular.svg',
    url: EXTRACTS,
    id: 'btn-documents-extracts',
    featureFlagKey: FeatureFlagsKey.Extracts
  },
  // {
  //   label: 'DOCUMENTS.ITEMS.PRODUCT_CERTIFICATES',
  //   image: 'icons/certificado-producto.svg',
  //   url: ['/'],
  //   id: 'btn-payments-product-certificates',
  //   className: 'disabled',
  //   disabled: true
  // },
  {
    label: 'DOCUMENTS.ITEMS.TAX_CERTIFICATES',
    image: 'illustrationsV2/certificado-reporte.regular.svg',
    url: TAX_CERTIFICATES,
    id: 'btn-documents-tax-certificate',
    featureFlagKey: FeatureFlagsKey.TaxCertificate
  }
  // {
  //   label: 'DOCUMENTS.ITEMS.ANNUAL_REPORT',
  //   image: 'icons/certificado-reporte-anual-cos.svg',
  //   url: ['/'],
  //   id: 'btn-payments-annual-report',
  //   className: 'disabled',
  //   disabled: true
  // }
];
