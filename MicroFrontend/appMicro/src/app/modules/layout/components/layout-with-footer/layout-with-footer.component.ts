import { Component, OnInit } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';

import { MenuList } from '@modules/layout/entities/tabs.interface';
import { CreateMenuHelper } from '../../helpers/createMenu.helper';

@Component({
  selector: 'app-layout-with-footer',
  templateUrl: './layout-with-footer.component.html',
  styleUrls: ['./layout-with-footer.component.sass']
})
export class LayoutWithFooterComponent implements OnInit {
  constructor(private facade: AppFacade) {}
  public menuListLeft: MenuList[];
  public menuListRight: MenuList[];
  public principalListItem: MenuList;
  ngOnInit(): void {
    const isSPIEnabled = Boolean(
      this.facade.featureFlagsByKey(FeatureFlagsKey.SPIKeysMFE)
    );

    const { menuListLeft, menuListRight, principalListItem } =
      CreateMenuHelper.getMenuConfiguration(isSPIEnabled);
    this.menuListLeft = menuListLeft;
    this.menuListRight = menuListRight;
    this.principalListItem = principalListItem;
  }
}
