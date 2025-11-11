import { TypeAccount } from '@app/commons/entities/product/type-account';
import {
  ACTION_LABEL,
  ContactsForm,
  Favorite,
  FavoritesType,
  IdentificationFavoriteType,
  MobileForm,
  SubtypeOperations,
  TagAvalOrKeyForm,
  TypeTarget,
  VillasForm
} from '@app/modules/favorites/entities/favorites.interface';
import { TransferType } from '@app/modules/transfers/entities/transfers.interface';
import {
  DESCRIPTION_TARGET_LABEL,
  FavoritesTransferType
} from '../../constants/add-to-favorites.constants';

export function mapMobileFavorite(childPayload: MobileForm): Favorite {
  const isCel2cel = TransferType.SEND_CEL2CEL === childPayload.towardType;

  const favoriteTransaction: Favorite = {
    nameFavoriteTransaction: childPayload.favoriteName,
    identificationFavoriteType: IdentificationFavoriteType.TRANSFER,
    sourceAccountTransaction: {
      idAcctTransaction: childPayload.sourceAccount.productId,
      typeAcctTransaction: childPayload.sourceAccount.productType
    },
    additionalDataTransaction: {
      subtypeOperation: isCel2cel
        ? SubtypeOperations.CEL2CEL
        : SubtypeOperations.TRANSFIYA,
      from: childPayload.sourceAccount.productId,
      typeTarget: TypeTarget.CELLPHONE,
      actionLabel: ACTION_LABEL[IdentificationFavoriteType.TRANSFER],
      descriptionTargetLabel: isCel2cel
        ? DESCRIPTION_TARGET_LABEL.AVAL
        : DESCRIPTION_TARGET_LABEL.TRANSFIYA,
      target: isCel2cel
        ? childPayload.towardProduct.account.accountId
        : childPayload.phoneNumber.replace(/ /g, ''),
      sourceBank: childPayload.sourceAccount.bank,

      ...(isCel2cel
        ? {
            targetBank: childPayload.towardProduct.account.bankInfo.bankId,
            additionalTargetInfo: `${childPayload.towardProduct.personInfo.name}  `
          }
        : {})
    },
    targetAccountTransaction: {
      typeAcctTransaction: isCel2cel
        ? (childPayload.towardProduct.account.accountType as TypeAccount)
        : TypeAccount.CEL,
      idAcctTransaction: isCel2cel
        ? childPayload.towardProduct.account.accountId
        : childPayload.phoneNumber.replace(/ /g, '')
    }
  };

  return favoriteTransaction;
}

export function mapVillasToVillasFavorite(childPayload: VillasForm): Favorite {
  const favoriteTransaction: Favorite = {
    nameFavoriteTransaction: childPayload.favoriteName,
    identificationFavoriteType: IdentificationFavoriteType.TRANSFER,
    sourceAccountTransaction: {
      idAcctTransaction: childPayload.sourceAccount.productId,
      typeAcctTransaction: childPayload.sourceAccount.productType
    },
    additionalDataTransaction: {
      descriptionTargetLabel: DESCRIPTION_TARGET_LABEL.VILLAS,
      target: childPayload.targetAccount.productId
    },
    targetAccountTransaction: {
      typeAcctTransaction: FavoritesType.VILLAS,
      idAcctTransaction: childPayload.targetAccount.productId
    }
  };

  return favoriteTransaction;
}
export function mapContactsFavorite(childPayload: ContactsForm): Favorite {
  const favoriteTransaction: Favorite = {
    nameFavoriteTransaction: childPayload.favoriteName,
    identificationFavoriteType: IdentificationFavoriteType.TRANSFER,
    sourceAccountTransaction: {
      typeAcctTransaction: childPayload.sourceAccount.productType,
      idAcctTransaction: childPayload.relativeId
    },
    targetAccountTransaction: {
      typeAcctTransaction: FavoritesType.CONTACTS,
      idAcctTransaction: childPayload.number
    },
    additionalDataTransaction: {
      descriptionTargetLabel: DESCRIPTION_TARGET_LABEL.CONTACTS,
      target: childPayload.id
    }
  };

  return favoriteTransaction;
}
