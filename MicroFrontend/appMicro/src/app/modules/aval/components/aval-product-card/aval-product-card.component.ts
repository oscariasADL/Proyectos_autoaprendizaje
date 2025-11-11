import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AvalProduct } from '@modules/aval/entities/aval-product.interface';
import { BANK_GROUP } from '@commons/constants/card.constants';

@Component({
  selector: 'app-aval-product-card',
  templateUrl: './aval-product-card.component.html',
  styleUrls: ['./aval-product-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvalProductCardComponent {
  @Input() product: AvalProduct;

  public isActive: boolean = false;

  public avalBanks = BANK_GROUP;

  public toggle(state: boolean = !this.isActive): void {
    if (this.product?.items?.length > 0) {
      this.isActive = state;
    }
  }
}
