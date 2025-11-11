import { WebPlugin } from '@capacitor/core';
import { QuickActionOptions, QuickActionsPlugin } from './definitions';

export class QuickActionsPluginWeb
  extends WebPlugin
  implements QuickActionsPlugin
{
  public async configureQuickActions(arg: QuickActionOptions): Promise<void> {
    return Promise.resolve();
  }
}
