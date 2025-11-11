import { environment as ENV } from '@environment';
import * as urlTemplate from 'url-template';
import { STORM_EXEMPT_URLS } from '@commons/constants/authorized-urls.constants';

export const urlBuilder: any = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  services(url: string, options: Object = {}): string {
    const serverUrl = getServicesUrl(url);
    return urlTemplate.parse(serverUrl).expand(options);
  },

  // eslint-disable-next-line @typescript-eslint/ban-types
  parameter(url: string, options: Object = {}): string {
    const serverUrl = getServerParameterUrl(url);
    return urlTemplate.parse(serverUrl).expand(options);
  }
};

function getServicesUrl(url: string): string {
  const shouldAddStorm = ENV.encrypt && !STORM_EXEMPT_URLS.includes(url);
  return ENV.api.server_url + (shouldAddStorm ? '/storm' : '') + url;
}

function getServerParameterUrl(url: string): string {
  return ENV.api.server_parameter + url;
}
