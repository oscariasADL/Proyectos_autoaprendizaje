export const NewRelicCapacitorPlugin = {
  async setUserId({ userId: string }): Promise<any> {
    return {};
  },
  async recordCustomEvent(options: {
    eventType: string;
    eventName: string;
    attributes: object;
  }): Promise<any> {
    return {};
  },

  async start(options: {
    appKey: string;
    agentConfiguration?: AgentConfiguration;
  }): Promise<any> {
    return {};
  },
  async register(): Promise<void> {},
  async shutdown(): Promise<void> {}
};

export interface AgentConfiguration {
  analyticsEventEnabled?: boolean;
  crashReportingEnabled?: boolean;
  interactionTracingEnabled?: boolean;
  networkRequestEnabled?: boolean;
  networkErrorRequestEnabled?: boolean;
  httpResponseBodyCaptureEnabled?: boolean;
  webViewInstrumentation?: boolean;
  loggingEnabled?: boolean;
  logLevel?: string;
  collectorAddress?: string;
  crashCollectorAddress?: string;
  sendConsoleEvents?: boolean;
  fedRampEnabled?: boolean;
  offlineStorageEnabled?: boolean;
  backgroundReportingEnabled?: boolean;
  newEventSystemEnabled?: boolean;
  logReportingEnabled?: boolean;
  distributedTracingEnabled?: boolean;
}
