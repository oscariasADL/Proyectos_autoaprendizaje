import {
  enabledDatadog,
  enabledTealium
} from '@commons/constants/events.constants';
import {
  EventType,
  TagEventType
} from '@commons/entities/analytics/events.entities';
import { nameFromURL } from '@commons/helpers/text.helpers';
import { datadogRum } from '@datadog/browser-rum';
import { environment as ENV } from '@environment';

declare const utag;

export const trackEvents = (
  pagePath: string,
  pageName: string = nameFromURL(pagePath),
  eventType: EventType = EventType.PageView
): void => {
  if (enabledTealium) {
    const payload = {
      eventType,
      pagePath,
      pageName
    };

    try {
      (window as any).utag_cfg_ovrd = { noview: true };
      (window as any).utag_data = {};

      utag.track(TagEventType.View, payload);
    } catch (err) {
      console.error(err);
    }
  }
};

export const initAnalytics = async (version: string): Promise<void> => {
  if (enabledDatadog) {
    datadogRum.init({
      applicationId: ENV.dataDog.applicationId,
      clientToken: ENV.dataDog.clientToken,
      site: ENV.dataDog.site,
      service: ENV.dataDog.service,
      sampleRate: 100,
      trackInteractions: true,
      version
    });
  }
};

export const trackModalEvent = (id: string): void => {
  trackEvents(
    `${location.pathname}/${id}`,
    nameFromURL(id),
    EventType.ModalView
  );
};

export const trackViewEvent = (url: string): void => {
  trackEvents(url, nameFromURL(url), EventType.PageView);
};

export const trackErrorEvent = (error: string): void => {
  trackEvents(`${location.pathname}`, error, EventType.Error);
};

export const logError = (type: string, error: any, document: string): void => {
  if (enabledDatadog) {
    datadogRum.addError(
      { type, error, document },
      { url: window?.location?.href },
      'custom'
    );
  }
  trackErrorEvent(type);
};
