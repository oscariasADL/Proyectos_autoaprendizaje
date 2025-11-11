import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Product } from '@app/commons/entities/product/product.interface';
import {
  ModalProducts,
  ModalTypeProducts
} from '@app/modules/forms-avv/entities/dropdown-modal-products';
import { ProductCard } from '@app/modules/product/entities/product-card.interface';
import { ProductStyleType } from '@app/modules/product/entities/product.interface';
import { mapProductCardItem } from '@app/modules/product/mappers/product-card-item.mapper';
import { firstValueFrom, Subscription } from 'rxjs';
import {
  FavoritePayload,
  IdentificationFavoriteType,
  ProductByPhoneNumber
} from '../../entities/favorites.interface';
import { FavoritesFacade } from '../../favorites.facade';
import {
  FAVORITES_TRANSFER_LIST,
  FavoritesTransferType,
  UTAG_FOR_ADD_FAVORITE_MOBILE,
  UTAG_FOR_ADD_FAVORITE_TRANSFIYA,
  UTAG_FOR_ADD_FAVORITE_VILLAS
} from '../constants/add-to-favorites.constants';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { accountNumberValidators } from '@app/modules/transfers/helpers/transfer-form.helper';
import { ALPHABETIC_PATTERN } from '@app/commons/constants/regex.constants';
import { ParameterKey } from '@app/commons/entities/parameters/parameter.entities';
import { mapFavoritesData } from '../../mappers/favorites-data.mapper';
import { TransferPayload } from '@app/modules/transfers/entities/transfers.interface';

@Component({
  selector: 'app-favorites-add',
  templateUrl: './favorites-add.page.html',
  styleUrls: ['./favorites-add.page.sass']
})
export class FavoritesAddPage implements OnInit, OnDestroy {
  public readonly utagForMobile: UtagEvent = UTAG_FOR_ADD_FAVORITE_MOBILE;
  public readonly utagForTransfiya: UtagEvent = UTAG_FOR_ADD_FAVORITE_TRANSFIYA;
  public readonly utagForVillas: UtagEvent = UTAG_FOR_ADD_FAVORITE_VILLAS;

  public modalProducts: ModalProducts[] | null = null;
  public singleProduct: ProductCard | null;
  public childPayload: TransferPayload;
  public transferTypes = FAVORITES_TRANSFER_LIST;

  private productsSubscription: Subscription;

  constructor(private facade: FavoritesFacade) {}
  form: FormGroup = new FormGroup({
    product: new FormControl<Product>({}, Validators.required),
    transferType: new FormControl<string>('', Validators.required),
    accountNumber: new FormControl<string>(
      '',
      accountNumberValidators.bind(this)
    ),
    accountType: new FormControl<string>(''),
    favoriteName: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(ALPHABETIC_PATTERN),
      Validators.maxLength(
        this.facade.boundsByKey(ParameterKey.favoritesMaxNicknameLength)
      )
    ]),
    towardAvalKey: new FormControl<string>(''),
    phoneNumber: new FormControl<string>(''),
    towardType: new FormControl<string>(''),
    towardProduct: new FormControl<ProductByPhoneNumber | null>(null)
  });
  ngOnInit() {
    this.productsSubscription = this.facade.products$.subscribe({
      next: (products) => {
        this.setInitialValue(products);
        this.getModalProducts(products);
      }
    });
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
  public selectedProduct(product: Product) {
    this.product?.setValue(product);
  }

  get product(): AbstractControl | null {
    return this.form.get('product');
  }
  get transferType(): AbstractControl | null {
    return this.form.get('transferType');
  }

  private setInitialValue(products: Product[]) {
    this.form.patchValue({
      product: products[0],
      accountNumber: ''
    });
  }
  private getModalProducts(products: Product[]) {
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

  public onPayloadChanged(payload: TransferPayload) {
    this.childPayload = payload;
  }

  public async createFavorite() {
    const { documentNumber, documentType } = await firstValueFrom(
      this.facade.basicData$
    );

    const favoritePayload: FavoritePayload = {
      userData: {
        idUserType: documentType,
        idUser: documentNumber
      },
      favoriteTransaction: mapFavoritesData(
        this.favoriteName.value,
        IdentificationFavoriteType.TRANSFER,
        this.childPayload
      )
    };

    this.facade.createFavorite(favoritePayload);
  }

  get favoritesTransferType(): typeof FavoritesTransferType {
    return FavoritesTransferType;
  }
  get favoriteName() {
    return this.form.get('favoriteName');
  }
}
