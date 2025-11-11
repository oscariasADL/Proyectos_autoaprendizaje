import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ITEMS_DESCRIPTION,
  QR_HOME_BUTTONS
} from './constants/qr-home.constants';

@Component({
  selector: 'app-qr-home',
  templateUrl: './qr-home.page.html',
  styleUrls: ['./qr-home.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrHomePage {
  public get itemsDescription(): typeof ITEMS_DESCRIPTION {
    return ITEMS_DESCRIPTION;
  }

  public get qrHomeButtons(): typeof QR_HOME_BUTTONS {
    return QR_HOME_BUTTONS;
  }
}
