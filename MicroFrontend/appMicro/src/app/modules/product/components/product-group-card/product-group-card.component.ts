import { Component, Input } from '@angular/core';
import { TypeAccount } from '@commons/entities/product/type-account';
import { HomeProduct } from '@commons/entities/product/balance.interface';

@Component({
  selector: 'app-product-group-card',
  templateUrl: './product-group-card.component.html',
  styleUrls: ['./product-group-card.component.sass']
})
export class ProductGroupCardComponent {
  @Input() product: HomeProduct;

  public typeAccount: typeof TypeAccount = TypeAccount;
}
