import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

import {
  QuickActions,
  QuickActionResponse
} from '@commons/capacitor-web-plugins/quick-actions';
import {
  QUICK_ACTIONS,
  QUICK_ACTIONS_URL
} from '@commons/constants/quick-actions.constants';

@Injectable({
  providedIn: 'root'
})
export class QuickActionsService {
  constructor(private navCtrl: NavController) {}

  public async init(): Promise<void> {
    await QuickActions.configureQuickActions({
      actions: QUICK_ACTIONS
    });

    QuickActions.addListener(
      'quickActionPressed',
      (quickAction: QuickActionResponse) =>
        void this.navCtrl.navigateForward(QUICK_ACTIONS_URL[quickAction.type])
    );
  }
}
