import {
  HOME,
  PAYMENTS,
  QR_AUTHORIZATION,
  QR_PAY,
  SPI_MF,
  TRANSFERS,
  WITHDRAW
} from '@commons/constants/navigate.constants';
import { MenuList } from '../entities/tabs.interface';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

export class CreateMenuHelper {
  private static readonly BASE_MENU_ITEMS: MenuList[] = [
    {
      label: 'FOOTER.LINKS.HOME',
      icon: 'icon-casa_apto',
      title: 'icon-home',
      url: HOME,
      id: 'menu-home',
      position: 'left'
    },
    {
      label: 'FOOTER.LINKS.TRANSFERS',
      icon: 'icon-giros_y_transferencias',
      title: 'icon-transfer',
      url: TRANSFERS,
      id: 'menu-transfer',
      position: 'left'
    },
    {
      label: 'FOOTER.LINKS.QR',
      icon: 'icons/qr-blanco.svg',
      title: 'icon-qr',
      url: [],
      id: 'menu-qr-home',
      position: 'center',
      subMenuList: [
        {
          label: 'QR.OPTIONS.AUTHORIZATION.TITLE',
          icon: 'iconsV2/bv-qr.svg',
          title: 'icon-transferencias',
          url: QR_AUTHORIZATION,
          id: 'submenu-qr-authorization',
          featureFlagKey: FeatureFlagsKey.AuthorizationQRAlt,
          titleDetail: 'QR.OPTIONS.AUTHORIZATION.TITLE_DETAIL',
          descriptionDetail: 'QR.OPTIONS.AUTHORIZATION.DESCRIPTION_DETAIL'
        },
        {
          label: 'QR.OPTIONS.PAY.TITLE',
          icon: 'iconsV2/shopping.svg',
          title: 'icon-qr',
          url: QR_PAY,
          id: 'submenu-qr-pay',
          featureFlagKey: FeatureFlagsKey.PayQR,
          titleDetail: 'QR.OPTIONS.PAY.TITLE_DETAIL',
          descriptionDetail: 'QR.OPTIONS.PAY.DESCRIPTION_DETAIL'
        }
      ]
    },
    {
      label: 'FOOTER.LINKS.PAYMENTS',
      icon: 'icon-salario',
      title: 'icon-pagos',
      url: PAYMENTS,
      id: 'menu-payments',
      position: 'right'
    }
  ];

  private static readonly WITHDRAW_MENU: MenuList = {
    label: 'FOOTER.LINKS.WITHDRAW',
    icon: 'icon-credito_rotativo',
    title: 'icon-withdraw',
    url: WITHDRAW,
    id: 'menu-withdraw',
    position: 'right'
  };

  private static readonly SPI_MENU: MenuList = {
    label: '',
    icon: 'icon-Bre-B',
    title: 'icon-key',
    url: SPI_MF,
    id: 'menu-spi',
    position: 'right'
  };

  public static getMenuConfiguration(isSPIEnabled: boolean): {
    menuListLeft: MenuList[];
    menuListRight: MenuList[];
    principalListItem: MenuList;
  } {
    const completeMenuList = [
      ...this.BASE_MENU_ITEMS,
      isSPIEnabled ? this.SPI_MENU : this.WITHDRAW_MENU
    ];

    return {
      menuListLeft: completeMenuList.filter((item) => item.position === 'left'),
      menuListRight: completeMenuList.filter(
        (item) => item.position === 'right'
      ),
      principalListItem: completeMenuList.find(
        (item) => item.position === 'center'
      )
    };
  }
}
