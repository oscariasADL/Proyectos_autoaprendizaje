import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import {
  Favorite,
  FavoriteDeletePayload,
  FavoritePayload,
  IdentificationFavoriteType,
  ProductByPhoneNumber,
  TypeTarget
} from '@modules/favorites/entities/favorites.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { favoriteEditBackgroundAction } from '@modules/favorites/pages/favorites-edit/store/favorites-edit.actions';

export const fakeFavorite: Favorite = {
  keyFavorite: 'CC1019100208ABCD323',
  nameFavoriteTransaction: 'Mensualidad madre',
  identificationFavoriteType: IdentificationFavoriteType.TRANSFER,
  sourceAccountTransaction: {
    typeAcctTransaction: TypeAccount.SDA,
    idAcctTransaction: '3'
  },
  targetAccountTransaction: {
    typeAcctTransaction: TypeAccount.SDA,
    idAcctTransaction: '323333333'
  },
  additionalDataTransaction: {
    subtypeOperation: 2,
    from: '3',
    target: '323333333',
    descriptionTargetLabel: 'AV Villas',
    typeTarget: TypeTarget.ACCOUNT,
    actionLabel: 'Transferir',
    transactionCostId: 200022,
    note: 'Lo del almuerzo',
    referenceId: 'Pago semanal'
  }
};

@Injectable()
export class FavoritesFacadeMock extends AppFacadeMock {
  public favorites$: Observable<Favorite[]> = new BehaviorSubject([
    fakeFavorite
  ]);

  public working$: Observable<boolean> = of(false);

  public completed$: Observable<boolean> = of(true);

  public hasProducts$: Observable<boolean> = of(true);

  public products$: Observable<Product[]> = new BehaviorSubject([]);

  public fetchFavorites(): void {}

  public getFavorite(keyFavorite: string): Observable<Favorite> {
    return new BehaviorSubject(fakeFavorite as Favorite);
  }

  public createFavorite(payload: FavoritePayload): void {}

  public deleteFavorite(payload: FavoriteDeletePayload): void {}

  public showOptionDelete(properties: AlertSheetProperties): void {}

  public showDeleteConfirm(payload: FavoriteDeletePayload): void {}

  public editFavorite(payload: FavoritePayload): void {}

  public editFavoriteBackground(payload: FavoritePayload): void {}

  public transfersCel2celBankIds$: Observable<any[]> = new BehaviorSubject(
    null
  );

  public cellToCellTransferProducts$: Observable<ProductByPhoneNumber[]> =
    new BehaviorSubject([
      {
        account: {
          accountId: '8946878',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0052'
          }
        },
        personInfo: {
          name: 'AL*******  RI*****',
          documentType: 'CC',
          documentNumber: '1019100111'
        }
      },
      {
        account: {
          accountId: '8946878qq',
          accountType: 'SDA',
          bankInfo: {
            bankId: '0001'
          }
        },
        personInfo: {
          name: 'AL*******  RI*****',
          documentType: 'CC',
          documentNumber: '1019100111'
        }
      }
    ]);

  public fetchTowardProductsByPhoneNumber(phone: string): void {}
}
