import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { FooterFacade } from '@commons/components/footer/footer.facade';
import { MenuList, SubMenuList } from '@modules/layout/entities/tabs.interface';

import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  @Input() menuListLeft: MenuList[];
  @Input() menuListRight: MenuList[];
  @Input() principalListItem: MenuList;
  @Input() isColorBlack: boolean;
  @Input() mainButtonColor: 'blue' | 'red' = 'blue';

  public readonly CLOSE_ICON = 'icons/close-icon.svg';
  public showOptions: boolean = false;
  public showOptionsDetail: boolean = false;

  constructor(
    private facade: FooterFacade,
    private navController: NavController
  ) {}

  public async handleClickMenu(menuItem: MenuList): Promise<void> {
    const [url] = menuItem.url;
    if (url && !menuItem.subMenuList) {
      await this.navController.navigateForward(url);
      return;
    }
    this.showOptions = !this.showOptions;
    this.showOptionsDetail = false;
  }

  public async handleClickSubMenu(menuItem: SubMenuList): Promise<void> {
    this.showOptions = false;
    await this.navController.navigateForward(menuItem.url);
  }

  public handleClickSideButton(): void {
    this.showOptions &&= false;
    this.showOptionsDetail &&= false;
  }

  get isLogged$(): Observable<boolean> {
    return this.facade.isLogged$;
  }
}
