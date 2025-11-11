/* eslint-disable object-shorthand */
import { EDITABLE_FIELDS_TO_EDIT } from '@modules/favorites/pages/favorites-edit/constants/favorites-edit.constants';
import {
  Favorite,
  SubtypeOperations,
  TypeTarget
} from '@modules/favorites/entities/favorites.interface';
import { FavoritesAccountInputComponent } from '@modules/favorites/component/favorites-account-input/favorites-account-input';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { FavoritesNameInputComponent } from '@modules/favorites/component/favorites-name-input/favorites-name-input';
import { FavoritesTargetInputComponent } from '@modules/favorites/component/favorites-target-input/favorites-target-input';
import { FavoritesAddendaInputComponent } from '@modules/favorites/component/favorites-addenda-input/favorites-addenda-input.component';

export const editFieldsFn = {
  [EDITABLE_FIELDS_TO_EDIT.title]: async function (
    favorite: Favorite
  ): Promise<Favorite> {
    const modal = await this.modalCtrl.create({
      component: FavoritesNameInputComponent,
      componentProps: {
        initValue: favorite.nameFavoriteTransaction
      },
      id: 'favorites-name-input-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data) && data.hasOwnProperty('name')) {
      const newFavorite = JSON.parse(JSON.stringify(favorite));
      newFavorite.nameFavoriteTransaction = data.name;
      return newFavorite;
    }
    return favorite;
  },
  [EDITABLE_FIELDS_TO_EDIT.from]: async function (
    favorite: Favorite
  ): Promise<Favorite> {
    const modal = await this.modalCtrl.create({
      component: FavoritesAccountInputComponent,
      componentProps: {
        products: this.facade.products$.currentValue(),
        amount: 1,
        favoriteType: favorite.identificationFavoriteType
      },
      id: 'favorites-account-input-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data) && !isNullOrUndefined(data.product)) {
      const product = data.product as Product;
      const newFavorite = JSON.parse(JSON.stringify(favorite));
      newFavorite.sourceAccountTransaction.typeAcctTransaction =
        product.type as TypeAccount;
      newFavorite.sourceAccountTransaction.idAcctTransaction = product.id;
      newFavorite.additionalDataTransaction.from = product.id;
      if (
        favorite.additionalDataTransaction.subtypeOperation &&
        favorite.additionalDataTransaction.subtypeOperation.toString() ===
          SubtypeOperations.RECHARGES.toString()
      ) {
        newFavorite.additionalDataTransaction.typeName = product.typeName;
        newFavorite.additionalDataTransaction.numberProduct =
          product.numberProduct;
      }
      return newFavorite;
    }
    return favorite;
  },
  [EDITABLE_FIELDS_TO_EDIT.toward]: async function (
    favorite: Favorite
  ): Promise<Favorite> {
    const modal = await this.modalCtrl.create({
      component: FavoritesTargetInputComponent,
      componentProps: {
        initValue: favorite.additionalDataTransaction.target,
        typeTargetVal: favorite.additionalDataTransaction.typeTarget,
        ...(favorite.additionalDataTransaction.typeTarget === TypeTarget.ACCOUNT
          ? {
              accountType: favorite.targetAccountTransaction.typeAcctTransaction
            }
          : {})
      },
      id: 'favorites-target-input-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data) && data.hasOwnProperty('target')) {
      const newFavorite = JSON.parse(JSON.stringify(favorite));
      newFavorite.targetAccountTransaction.idAcctTransaction = data.target;
      if (data.hasOwnProperty('accountType') && data.accountType) {
        newFavorite.targetAccountTransaction.typeAcctTransaction =
          data.accountType;
      }
      newFavorite.additionalDataTransaction.target = data.target;
      return newFavorite;
    }
    return favorite;
  },
  [EDITABLE_FIELDS_TO_EDIT.note]: async function (
    favorite: Favorite
  ): Promise<Favorite> {
    const modal = await this.modalCtrl.create({
      component: FavoritesAddendaInputComponent,
      componentProps: {
        title: 'FAVORITES.EDIT.ADDENDA_MODAL.TITLE_NOTE',
        label: 'FAVORITES.EDIT.ADDENDA_MODAL.LABELS.NOTE',
        helpText: 'FAVORITES.EDIT.ADDENDA_MODAL.HELP_TEXT',
        initValue: favorite.additionalDataTransaction?.note
      },
      id: 'favorites-addenda-input-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data) && data.hasOwnProperty('addenda')) {
      const newFavorite = JSON.parse(JSON.stringify(favorite)) as Favorite;
      newFavorite.additionalDataTransaction.note = data.addenda;
      return newFavorite;
    }
    return favorite;
  },
  [EDITABLE_FIELDS_TO_EDIT.additional_data]: async function (
    favorite: Favorite
  ): Promise<Favorite> {
    const modal = await this.modalCtrl.create({
      component: FavoritesAddendaInputComponent,
      componentProps: {
        title: 'FAVORITES.EDIT.ADDENDA_MODAL.TITLE_REFERENCE',
        label: 'FAVORITES.EDIT.ADDENDA_MODAL.LABELS.REFERENCE',
        helpText: 'FAVORITES.EDIT.ADDENDA_MODAL.HELP_TEXT',
        initValue: favorite.additionalDataTransaction?.referenceId
      },
      id: 'favorites-addenda-input-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data) && data.hasOwnProperty('addenda')) {
      const newFavorite = JSON.parse(JSON.stringify(favorite)) as Favorite;
      newFavorite.additionalDataTransaction.referenceId = data.addenda;
      return newFavorite;
    }
    return favorite;
  }
};
