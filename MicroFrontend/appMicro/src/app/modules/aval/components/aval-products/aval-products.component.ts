import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BANK_GROUP } from '@commons/constants/card.constants';
import { NavController } from '@ionic/angular';
import { AvalFacade } from '@modules/aval/aval.facade';
import { AvalProductList } from '@modules/aval/entities/aval-product.interface';
import {
  AVAL_PRODUCT_ICON,
  AVAL_PRODUCT_LABEL
} from '@modules/products/components/aval-products-panel/aval-products-panel.constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aval-products',
  templateUrl: './aval-products.component.html',
  styleUrls: ['./aval-products.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvalProductsComponent implements OnInit {
  constructor(
    private facade: AvalFacade,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.facade.fetchAvalProducts(this.bankCode);
  }

  public closeModal(): void {
    this.navCtrl.pop();
  }

  get avalProducts$(): Observable<AvalProductList[]> {
    return this.facade.avalProducts$;
  }

  get working$(): Observable<boolean> {
    return this.facade.avalProductsWorking$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.avalProductsCompleted$;
  }

  get params(): Params {
    return this.route.snapshot.params;
  }

  get bankCode(): string {
    return this.params?.bank_code;
  }

  get bankIcon(): string {
    return AVAL_PRODUCT_ICON[this.bankCode];
  }

  get bankLabel(): string {
    return AVAL_PRODUCT_LABEL[this.bankCode];
  }

  get isSpecialProduct(): boolean {
    return (
      this.bankCode === BANK_GROUP.PORVENIR_CODE ||
      this.bankCode === BANK_GROUP.FACILPASS_CODE
    );
  }
}
