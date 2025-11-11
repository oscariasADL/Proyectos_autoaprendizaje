import { WebPlugin } from '@capacitor/core';
import { StoreRatingPlugin } from './definitions';

export class StoreRatingPluginWeb
  extends WebPlugin
  implements StoreRatingPlugin
{
  public async requestReview(): Promise<void> {
    return Promise.resolve();
  }
}
