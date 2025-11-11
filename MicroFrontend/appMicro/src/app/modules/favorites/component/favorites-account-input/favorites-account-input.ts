import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { ModalController } from '@commons/controllers/modal.controller';
import { IdentificationFavoriteType } from '../../entities/favorites.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';

@Component({
  selector: 'app-favorites-account-input',
  templateUrl: './favorites-account-input.html',
  styleUrls: ['./favorites-account-input.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesAccountInputComponent {
  @Input() products: Product[];
  @Input() amount: number = 0;
  @Input() favoriteType: IdentificationFavoriteType = null;

  constructor(private modalCtrl: ModalController) {}
  get availableProducts(): Product[] {
    return this.products.filter((product) =>
      this.favoriteType === IdentificationFavoriteType.MONEY_ORDER
        ? product.type !== TypeAccount.DDA
        : true
    );
  }
  public async selectProduct(product: Product): Promise<void> {
    if (this.amount < product.availableBalance)
      await this.modalCtrl.dismiss({ product });
  }

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss();
  }
}
