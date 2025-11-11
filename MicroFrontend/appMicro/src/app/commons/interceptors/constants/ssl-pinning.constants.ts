import { InjectionToken } from '@angular/core';
import { CertificateConfig } from '../types/ssl-pinning.types';

export const ALLOWED_CERTIFICATE_CONFIG = new InjectionToken<
  CertificateConfig[]
>('AllowedCertificateConfig');

export const CERTIFICATE_CONFIG: CertificateConfig[] = [
  {
    hostname: 'https://mb-api-avvillas.avaldigitallabs.com',
    fingerprints: [
      '2B:14:9C:AB:D8:51:FF:99:79:9F:14:ED:9D:DE:B8:65:3F:EE:24:0E:EF:8D:FC:F7:B7:8E:45:1A:7E:8A:76:B1'
    ]
  },
  {
    hostname: 'https://mb-cache-avvillas.avaldigitallabs.com',
    fingerprints: [
      'C7:97:77:6F:6B:F1:3E:24:5A:5A:75:68:6D:19:B9:50:3F:82:42:E4:2A:3F:94:10:39:C9:6E:8F:66:6A:DF:70'
    ]
  },
  {
    hostname: 'https://mb-stg-api-avvillas.avaldigitallabs.com',
    fingerprints: [
      'A6:78:4E:37:CC:EE:1C:7F:37:FB:A2:A1:DD:FD:81:CE:CD:11:80:43:27:42:3B:A0:76:06:6F:05:F4:2B:40:51'
    ]
  },
  {
    hostname: 'https://mb-stg-cache-avvillas.avaldigitallabs.com',
    fingerprints: [
      'CD:EE:05:3F:1F:E6:67:18:60:7C:8C:02:B2:88:E4:E4:E3:B4:A3:3B:75:08:FE:41:E4:48:FE:D7:22:54:0B:D4'
    ]
  },
  {
    hostname: 'https://mb-stg-transfers-api-avvillas.avaldigitallabs.com',
    fingerprints: [
      'FC:CE:00:05:D1:1A:02:82:B1:FA:9F:2A:99:03:DF:76:D4:E4:F0:D8:3C:6E:DC:30:71:EB:55:4A:56:A8:B1:73'
    ]
  },
  {
    hostname: 'https://mb-transfers-api-avvillas.avaldigitallabs.com',
    fingerprints: [
      '0A:A0:38:21:44:11:2A:18:12:C8:7B:A7:1A:43:20:34:D8:D1:5E:2C:BE:7C:59:57:3E:AA:DF:E0:34:AB:9F:B3'
    ]
  }
];
