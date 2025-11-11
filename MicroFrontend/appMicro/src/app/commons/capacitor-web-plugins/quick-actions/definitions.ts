import { PluginListenerHandle } from '@capacitor/core';

export interface QuickActionsPlugin {
  configureQuickActions(arg: QuickActionOptions): Promise<void>;

  addListener(
    eventName: 'quickActionPressed',
    listenerCallback: (response: QuickActionResponse) => void
  ): Promise<PluginListenerHandle>;
}

export interface QuickAction {
  type: string;
  title: string;
  subtitle?: string;
  iconType: string;
}

export interface QuickActionOptions {
  actions: QuickAction[];
}

export interface QuickActionResponse {
  type: string;
}
