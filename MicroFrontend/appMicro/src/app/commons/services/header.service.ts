import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  HEADER_SPECIAL_WITH_MENU,
  HEADER_WITH_MENU
} from '@commons/entities/header/header.interface';
import { MenuController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private router: Router, private menuCtrl: MenuController) {}

  public listenRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.routerState.snapshot),
        map((snapshot) => snapshot.url.split('?')[0])
      )
      .subscribe((url: string) => this.setHeader(url));
  }

  public setHeader(url: string): void {
    if (
      HEADER_WITH_MENU.includes(url) ||
      HEADER_SPECIAL_WITH_MENU.some((_url) => url.includes(_url))
    ) {
      this.menuCtrl.swipeGesture(true, 'side-menu');
    } else {
      setTimeout(
        () => void this.menuCtrl.swipeGesture(false, 'side-menu'),
        1000
      );
    }
  }
}
