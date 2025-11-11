import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductFacade } from '@modules/product/product.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-toggle-balances',
  templateUrl: './product-toggle-balances.component.html',
  styleUrls: ['./product-toggle-balances.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToggleBalancesComponent {
  constructor(private facade: ProductFacade) {}

  public toggleHiddenBalances(): void {
    this.facade.setHiddenBalance(!this.hiddenBalance$.currentValue());
  }

  get hiddenBalance$(): Observable<boolean> {
    return this.facade.hiddenBalance$;
  }
}
