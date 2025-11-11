import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FRANCHISE_IMAGES } from '@commons/constants/card.constants';
import { DIGITAL_DEBIT_CARD_ACTIVATE } from '@commons/constants/navigate.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { NavController } from '@ionic/angular';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';

@Component({
  selector: 'app-digital-debit-card-panel',
  templateUrl: './digital-debit-card-panel.component.html',
  styleUrls: ['./digital-debit-card-panel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GlobalPipesModule],
  providers: [DigitalDebitCardFacade]
})
export class DigitalDebitCardPanelComponent {
  @Input() isHome: boolean = false;
  @Input() product: ProductDetail;
  @Input() currentRoute?: string;

  public franchiseImages: typeof FRANCHISE_IMAGES = FRANCHISE_IMAGES;

  constructor(
    private navCtrl: NavController,
    private facade: DigitalDebitCardFacade
  ) {}

  public activateDigitalDebitCard(): void {
    if (this.currentRoute) this.facade.setActivateUrlBackTo(this.currentRoute);
    if (this.product)
      this.facade.setProductSelected({
        id: this.product.id,
        nickname: this.product.nickname,
        typeName: this.product.typeName,
        availableBalance: this.product.availableBalance,
        numberProduct: this.product.numberProduct
      });
    void this.navCtrl.navigateForward(DIGITAL_DEBIT_CARD_ACTIVATE);
  }

  public digitalDebitCardDetail(product: DigitalDebitCard): void {
    this.facade.fetchDigitalDebitCardDetail(product.relativeParentId);
  }

  get digitalDebitCard$(): Observable<DigitalDebitCard> {
    return this.digitalDebitCards$.pipe(
      map((cards) =>
        cards?.find((card) => card?.relativeParentId === this.product?.id)
      )
    );
  }

  get showDigitalDebitCardPanel$(): Observable<boolean> {
    return this.facade.showDigitalDebitCardPanel$.pipe(
      withLatestFrom(this.digitalDebitCard$),
      map(
        ([show, hasCard]) =>
          (show &&
            (this.isHome ||
              [TypeAccount.SDA, TypeAccount.DDA].includes(
                this.product?.type as TypeAccount
              ))) ||
          !isNullOrUndefined(hasCard)
      )
    );
  }

  get digitalDebitCards$(): Observable<DigitalDebitCard[]> {
    return this.facade.digitalDebitCards$;
  }
}
