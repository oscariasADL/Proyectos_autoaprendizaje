import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import { AppFacade } from '@app/app.facade';
import { ToastType } from '../entities/toast/toast.entities';

@Injectable({
  providedIn: 'root'
})
export class CapacitorUtilitiesService {
  constructor(private facade: AppFacade) {}

  public async copyToClipboard(text: string) {
    this.facade.closeToast();
    this.facade.showToast({
      type: ToastType.success,
      title: text
    });
    if (!Capacitor.isNativePlatform()) {
      await navigator.clipboard.writeText(text);
      return;
    }

    await Clipboard.write({
      string: text
    });
  }
}
