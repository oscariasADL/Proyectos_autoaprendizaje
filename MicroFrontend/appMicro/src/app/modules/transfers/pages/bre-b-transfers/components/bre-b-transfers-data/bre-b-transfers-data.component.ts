import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  BreBTransfersForm,
  TowardAccount
} from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import { UtagEvent } from '@commons/directives/tealium/constants/utag.entities';
import {
  AMOUT_UTAG_EVENT,
  CONTINUE_BUTTON_UTAG_EVENT,
  MESSAGE_UTAG_EVENT
} from '@modules/transfers/pages/bre-b-transfers/constants/bre-b-transfers.constants';
import {
  ModalProducts,
  ModalTypeProducts
} from '@modules/forms-avv/entities/dropdown-modal-products';
import { removeSubscriptions } from '@commons/utils/util';
import { Product } from '@commons/entities/product/product.interface';
import { mapProductCardItem } from '@modules/product/mappers/product-card-item.mapper';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { ProductCard } from '@modules/product/entities/product-card.interface';
import { BreBTransfersFacade } from '@modules/transfers/pages/bre-b-transfers/bre-b-transfers.facade';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { mapAddSpiContactPayload } from '@modules/transfers/pages/bre-b-transfers/mappers/bre-b-transfer.mapper';
import { PopoverComponent } from '@commons/components/popover/popover.component';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-bre-b-transfers-data',
  templateUrl: './bre-b-transfers-data.component.html',
  styleUrls: ['./bre-b-transfers-data.component.sass']
})
export class BreBTransfersDataComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup<BreBTransfersForm>;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();
  @Output() modifySpiKey: EventEmitter<void> = new EventEmitter<void>();

  public readonly amountUtagEvent: UtagEvent = AMOUT_UTAG_EVENT;
  public readonly messageUtagEvent: UtagEvent = MESSAGE_UTAG_EVENT;
  public readonly continueButtonUtagEvent: UtagEvent =
    CONTINUE_BUTTON_UTAG_EVENT;
  public modalProducts: ModalProducts[] = null;
  public singleProduct: ProductCard | null;
  public readonly featureFlagsKey = FeatureFlagsKey;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    private facade: BreBTransfersFacade
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.facade.products$.subscribe({
        next: (products) => {
          this.setInitialValue(products);
          this.getModalProducts(products);
        }
      })
    );
    this.fetchSpiContact();
  }

  ngOnDestroy() {
    removeSubscriptions(this.subscriptions);
  }

  public continueAction(): void {
    if (this.shouldSaveSpiContactControl.value) {
      this.facade.setAddSpiContactPayload(
        mapAddSpiContactPayload(this.towardProduct.value)
      );
    }
    this.continue.emit();
  }

  public selectedProduct(product: Product): void {
    this.fromProduct.setValue(product);
  }

  public canSaveContact(): boolean {
    return !this.isSavedContactControl.value;
  }

  public async showPopoverSpiContactInfo(ev: Event): Promise<void> {
    const popover = await this.popoverCtrl.create({
      id: 'popover-bre-b-transfers-data-save-contact',
      component: PopoverComponent,
      componentProps: {
        title: this.translate.instant(
          'TRANSFERS.BRE_B.STEPS.DATA.TOOLTIP_INFO.TITLE'
        ),
        text: this.translate.instant(
          'TRANSFERS.BRE_B.STEPS.DATA.TOOLTIP_INFO.TEXT'
        )
      },
      cssClass: 'avv-popover',
      event: ev,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }

  private setInitialValue(products: Product[]): void {
    this.fromProduct.setValue(products[0]);
  }

  private getModalProducts(products: Product[]): void {
    this.modalProducts = [
      {
        type: ModalTypeProducts.ACCOUNTS,
        label: '',
        productsCards: products?.map((product) =>
          mapProductCardItem(product, ProductStyleType.standard, false)
        )
      }
    ];
    if (products.length === 1) {
      this.singleProduct = this.modalProducts[0].productsCards[0];
    }
  }

  private fetchSpiContact(): void {
    if (!this.facade.featureFlagsByKey(this.featureFlagsKey.SPIContactBook))
      return;
    if (
      this.isSavedContactControl.value !== null ||
      this.isFavoriteContactControl.value !== null
    ) {
      return;
    }

    this.isSavedContactControl.setValue(false);
    this.facade.fetchSpiContact(this.towardAvalKeyControl.value);
    this.subscriptions.push(
      this.facade.breBSpiContact$
        .pipe(filter((contact) => !!contact))
        .subscribe({
          next: (contact) => {
            this.isSavedContactControl.setValue(true);
            this.isFavoriteContactControl.setValue(contact.isFav);
          }
        })
    );
  }

  get towardAvalKeyControl(): AbstractControl<string> {
    return this.form.get('towardAvalKey');
  }

  get towardProduct(): AbstractControl<TowardAccount> {
    return this.form.get('towardProduct');
  }

  get isFavoriteContactControl(): AbstractControl<boolean> {
    return this.form.get('isFavoriteContact');
  }

  get isSavedContactControl(): AbstractControl<boolean> {
    return this.form.get('isSavedContact');
  }

  get shouldSaveSpiContactControl(): AbstractControl<boolean> {
    return this.form.get('shouldSaveSpiContact');
  }

  get contactName(): AbstractControl<string> {
    return this.form.get('contactName');
  }

  get amount(): AbstractControl<string> {
    return this.form.get('amount');
  }

  get fromProduct(): AbstractControl<Product> {
    return this.form.get('fromProduct');
  }

  get note(): AbstractControl<string> {
    return this.form.get('addenda.note');
  }

  get amountMax(): number {
    return this.facade.boundsByKey(ParameterKey.brebAmountMax);
  }
}
