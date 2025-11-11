import { Component } from '@angular/core';
import { SIDE_MENU_LIST } from '@commons/components/side-menu/constants/side-menu.constants';
import { SideMenuItem } from '@commons/components/side-menu/entities/side-menu.interface';
import {
  DataBasicClientDto,
  UserData
} from '@commons/entities/auth/auth.entities';
import { DeviceData } from '@commons/entities/device/device.interface';
import { AlertService } from '@commons/services/alert.service';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SideMenuFacade } from './side-menu.facade';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent {
  public sideMenuList: SideMenuItem[] = SIDE_MENU_LIST;

  constructor(
    private facade: SideMenuFacade,
    private menuCtrl: MenuController,
    private alertService: AlertService
  ) {}

  public closeMenu(): void {
    this.menuCtrl.close();
  }

  public logout(): void {
    this.facade.logout();
  }

  get userData$(): Observable<UserData> {
    return this.facade.userData$;
  }

  get basicData$(): Observable<DataBasicClientDto> {
    return this.facade.basicData$;
  }

  get version$(): Observable<string> {
    return this.facade.deviceInfo$.pipe(
      map((data: DeviceData) => data?.appVersion)
    );
  }
}
