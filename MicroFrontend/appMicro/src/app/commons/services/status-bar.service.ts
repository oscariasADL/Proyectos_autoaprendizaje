import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { filter, map } from 'rxjs/operators';

import * as routes from '@commons/constants/navigate.constants';
import {
  STATUS_BAR_BLACK,
  STATUS_BAR_RED,
  STATUS_BAR_WHITE,
  StatusBarType
} from '@commons/entities/header/status-bar.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  constructor(private router: Router) {}

  public listenRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.routerState.snapshot),
        map((snapshot) => snapshot.url.split('?')[0])
      )
      .subscribe((url: string) => this.setStatusbar(this.statusBarType(url)));
  }

  public setStatusbar(type: StatusBarType): void {
    if (this.isPluginAvailable) {
      const isIOS = Capacitor.getPlatform() === 'ios';

      switch (type) {
        case StatusBarType.red:
          if (!isIOS) {
            this.statusBar.setOverlaysWebView({ overlay: false }).then();
            this.statusBar.setBackgroundColor({ color: '#E1001D' }).then();
          }
          this.statusBar.setStyle({ style: StatusBarStyle.Dark });
          break;
        case StatusBarType.white:
          if (!isIOS) {
            this.statusBar.setOverlaysWebView({ overlay: false }).then();
            this.statusBar.setBackgroundColor({ color: '#FFFFFF' }).then();
          }
          this.statusBar.setStyle({ style: StatusBarStyle.Light });
          break;
        case StatusBarType.black:
          if (!isIOS) {
            this.statusBar.setOverlaysWebView({ overlay: false }).then();
            this.statusBar.setBackgroundColor({ color: '#000000' }).then();
          }
          this.statusBar.setStyle({ style: StatusBarStyle.Dark }).then();
          break;
      }
    }
  }

  private statusBarType(url: string): StatusBarType {
    if (STATUS_BAR_RED.includes(url)) {
      return StatusBarType.red;
    }

    if (STATUS_BAR_WHITE.includes(url)) {
      return StatusBarType.white;
    }

    if (STATUS_BAR_BLACK.includes(url)) {
      return StatusBarType.black;
    }

    if (STATUS_BAR_WHITE.some((_url) => url.includes(_url))) {
      return StatusBarType.white;
    }

    if (STATUS_BAR_BLACK.some((_url) => url.includes(_url))) {
      return StatusBarType.black;
    }

    if (
      STATUS_BAR_RED.some((_url) => url.includes(_url)) ||
      routes.HOME.toString() === url
    ) {
      return StatusBarType.red;
    }
  }

  get isPluginAvailable(): boolean {
    return Capacitor.isPluginAvailable('StatusBar');
  }

  get statusBar(): typeof StatusBar {
    return StatusBar;
  }
}
