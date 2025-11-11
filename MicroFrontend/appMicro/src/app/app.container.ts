import { Component, NgZone, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { AppPlugin } from '@commons/native-plugins/AppPlugin';
import { LifecycleEvents } from '@avaldigitallabs/bavv-mb-lib-lifecycle-events';
import { Device } from '@capacitor/device';
import { App, URLOpenListenerEvent } from '@capacitor/app';

import { TranslateService } from '@ngx-translate/core';
import { differenceInMinutes } from 'date-fns';

import { AnalyticsService } from '@commons/services/analytics.service';
import { BackButtonService } from '@commons/services/back-button.service';
import { FeatureToggleService } from '@commons/services/feature-toggle.service';
import { HeaderService } from '@commons/services/header.service';
import { StatusBarService } from '@commons/services/status-bar.service';
import { environment as ENV } from '@environment';
import { AppFacade } from './app.facade';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { getGeolocationInfo, getScreenSize } from '@commons/utils/util';
import { LoginDeepLinkService } from '@commons/services/login-deep-link.service';
import { ALLOWED_URLS_FOR_DEEPLINK } from '@commons/constants/global.constants';
import { NewRelicService } from './commons/services/new-relic/new-relic.service';

// eslint-disable-next-line no-var
declare var MPFingerprintV2: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.container.html',
  styleUrls: ['app.container.scss']
})
export class AppContainer implements OnInit {
  constructor(
    private zone: NgZone,
    private facade: AppFacade,
    private platform: Platform,
    private translate: TranslateService,
    private headerService: HeaderService,
    private statusBarService: StatusBarService,
    private analyticsService: AnalyticsService,
    private backButtonService: BackButtonService,
    private featureToggleService: FeatureToggleService,
    private loginDeepLinkService: LoginDeepLinkService
  ) {
    void this.initializeApp();
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit(): void {
    if (Capacitor.isNativePlatform()) {
      this.facade.config$.subscribe(({ appLoaded }) => {
        if (appLoaded) {
          this.listenDeepLink();
        }
      });
    }
  }

  private listenDeepLink() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        void this.loginDeepLinkService.validateLoginWithDeepLink(event);
        const url = new URL(event.url);
        const slug = url?.pathname ?? '';
        if (ALLOWED_URLS_FOR_DEEPLINK.includes(slug)) {
          this.facade.openDeepLink(slug + url.search);
        }
      });
    });
  }

  private async initializeApp(): Promise<any> {
    await this.platform.ready();
    const deviceInfo = await Device.getInfo();
    const { identifier: uuid } = await Device.getId();
    const { version, build } = await AppPlugin.getInfo();

    const { value: languageCode } = await Device.getLanguageCode();
    const screenSize = getScreenSize();

    this.facade.setDeviceInfo({
      ...deviceInfo,
      uuid,
      appVersion: version,
      appBuild: build,
      languageCode: languageCode,
      screenSize: screenSize
    });

    await this.analyticsService.initAnalytics(version);
    this.statusBarService.listenRouterEvents();
    this.headerService.listenRouterEvents();
    this.backButtonService.listenBackButton();
    this.featureToggleService.listenFeatureEvents();
    if (ENV.encrypt) {
      this.facade.initInterchangeKey();
    }
    this.facade.initUser();
    this.facade.fetchParameters();
    if (ENV.production && !isNullOrUndefined(MPFingerprintV2)) {
      MPFingerprintV2?.getData('9vyxHBWPNcCvN7I')?.then((data) =>
        this.facade.setTransfiyaFingerprint(data)
      );
    }
    const { latitude = '', longitude = '' } = await getGeolocationInfo();

    this.facade.setGeolocationInfo(latitude, longitude);

    if (Capacitor.isNativePlatform()) {
      LifecycleEvents.addListener('lifeCycleEvent', () => {
        const difference = differenceInMinutes(
          new Date(),
          this.facade.interchangeDate$.currentValue() as Date
        );
        if (difference >= ENV.interchange_key.interval_in_minutes) {
          if (ENV.encrypt) {
            this.facade.initInterchangeKey();
          }
        }
      });
    }
  }
}
