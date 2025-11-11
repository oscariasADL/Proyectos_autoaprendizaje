import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  NewRelicCapacitorPlugin,
  AgentConfiguration
} from '@newrelic/newrelic-capacitor-plugin';
import { environment as ENV } from '@environment';
import { AppFacade } from '@app/app.facade';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { filter, take, tap } from 'rxjs';
import { Util } from '@app/commons/utils/util';
import { LOG_LEVEL_INFO } from './entities/new-relic.interface';

@Injectable({
  providedIn: 'root'
})
export class NewRelicService {
  constructor(private appFacade: AppFacade) {}

  private isNewRelicEnabled(): boolean {
    return !!this.appFacade.featureFlagsByKey(FeatureFlagsKey.NewRelic);
  }

  public initNewRelic(): void {
    try {
      if (!Util.isNative()) return;

      const appToken = this.getAppToken();
      const config = this.getAgentConfig();

      NewRelicCapacitorPlugin.start({
        appKey: appToken,
        agentConfiguration: config
      });

      this.log('[New Relic] Initialized successfully');
    } catch (error) {
      this.logError('[New Relic] Initialization failed:', error);
    }
  }

  public recordEvent(
    eventType: string,
    eventName: string,
    userId: string,
    attributes: Record<string, any> = {}
  ): void {
    if (!Util.isNative() || !this.isNewRelicEnabled()) return;

    try {
      NewRelicCapacitorPlugin.setUserId({ userId });
      NewRelicCapacitorPlugin.recordCustomEvent({
        eventType,
        eventName,
        attributes
      });

      this.log(`[New Relic] Event recorded: ${eventType} - ${eventName}`);
    } catch (error) {
      this.logError('[New Relic] Failed to record event:', error);
    }
  }

  public shutdowntNewRelic(): void {
    try {
      if (!Util.isNative()) return;

      NewRelicCapacitorPlugin.shutdown();
      this.log('[New Relic] Shutdown successfully');
    } catch (error) {
      this.logError('[New Relic] Shutdown failed:', error);
    }
  }

  private getAppToken(): string {
    return Capacitor.getPlatform() === 'ios'
      ? ENV.newRelic.iOSApp
      : ENV.newRelic.androidApp;
  }

  private getAgentConfig(): AgentConfiguration {
    return {
      analyticsEventEnabled: true,
      webViewInstrumentation: true,
      crashReportingEnabled: true,
      interactionTracingEnabled: true,
      networkRequestEnabled: true,
      networkErrorRequestEnabled: true,
      httpResponseBodyCaptureEnabled: true,
      loggingEnabled: true,
      logLevel: LOG_LEVEL_INFO,
      sendConsoleEvents: true
    };
  }

  private log(message: string): void {
    if (!ENV.production) {
      console.log(message);
    }
  }

  private logError(message: string, error: any): void {
    if (!ENV.production) {
      console.error(message, error);
    }
  }
}
