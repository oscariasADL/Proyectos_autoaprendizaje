import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AVAL_PRODUCTS } from '@commons/constants/navigate.constants';
import {
  getDBValue,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { NavController } from '@ionic/angular';
import {
  AVAL_PRODUCT_ICON_CAROUSEL,
  AVAL_PRODUCT_LABEL,
  AvalItem
} from '@modules/products/components/aval-products-panel/aval-products-panel.constants';

@Component({
  selector: 'app-aval-products-panel',
  templateUrl: './aval-products-panel.component.html',
  styleUrls: ['./aval-products-panel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvalProductsPanelComponent implements OnInit {
  @Input() forceView: boolean = false;

  public isActive: boolean = true;

  constructor(
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit(): void {
    this.checkIsActive();
  }

  public navigateTo(item: AvalItem): void {
    this.navCtrl.navigateForward(item.url);
  }

  public async toggleActive(state: boolean = !this.isActive): Promise<void> {
    this.isActive = state;

    await this.secureStorage.put(
      SecureKeys.statusAvalProducts,
      this.isActive.toString(),
      true
    );
  }

  private async checkIsActive(): Promise<void> {
    const db = await this.secureStorage.getAll();
    const status = getDBValue(db, SecureKeys.statusAvalProducts);

    this.isActive =
      isNullOrUndefinedOrEmpty(status) ||
      (!isNullOrUndefinedOrEmpty(status) && status === 'true');
    this.cdRef.detectChanges();
  }

  get avalProductList(): AvalItem[] {
    return Object.keys(AVAL_PRODUCT_LABEL).map((key) => ({
      icon: AVAL_PRODUCT_ICON_CAROUSEL[key],
      label: AVAL_PRODUCT_LABEL[key],
      url: `${AVAL_PRODUCTS.toString()}/${key}`
    }));
  }
}
