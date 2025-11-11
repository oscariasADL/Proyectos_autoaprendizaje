import { Injectable } from '@angular/core';
import { HomeProduct } from '@commons/entities/product/balance.interface';
import {
  HomeAlertIds,
  HomeAlertProperties
} from '@modules/home/entities/home-alert.entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavoriteBasic } from '@modules/favorites/entities/favorites.interface';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { FeatureFlagsBm } from '@store/state/parameter.state';

@Injectable()
export class HomeFacadeMock extends ProductFacadeMock {
  public homeAlerts$: Observable<HomeAlertProperties[]> = new BehaviorSubject(
    []
  );
  public homeProduct$: Observable<HomeProduct[]> = new BehaviorSubject([]);

  public balanceWorking$: Observable<boolean> = new BehaviorSubject(false);
  public balanceCompleted$: Observable<boolean> = new BehaviorSubject(false);
  public firstCall$: Observable<boolean> = new BehaviorSubject(false);

  public favoritesBasic$: Observable<FavoriteBasic[]> = new BehaviorSubject([]);

  public hasCreditProducts$: Observable<boolean> = new BehaviorSubject(true);
  public creditProductsError$: Observable<boolean> = new BehaviorSubject(true);
  public homeTimer$: Observable<number> = new BehaviorSubject(0);

  public fetchProducts(): void {}

  public fetchHomeProducts(): void {}

  public fetchProductsFirstCallToggleAction(): void {}

  public fetchDigitalDebitCards(): void {}

  public fetchFavorites(): void {}

  public getHiddenBalanceFromSecureStorageAction(): void {}

  public putHomeAlertAction(alert: HomeAlertProperties): void {}

  public removeHomeAlert(id: HomeAlertIds): void {}

  public setHomeTimer(time: number): void {}

  public trackUuid(): void {}

  public parameterByKey(test: string): Observable<any> {
    return new BehaviorSubject({
      campaigns: [
        {
          title: 'Recuerda actualizar tu contraseña',
          paragraphs: [
            'Por seguridad te recomendamos cambiar la contraseña periódicamente para ingresar a los canales de AV Villas App y Banca Virtual.'
          ],
          image:
            'https://pb-stg-avvillas.avaldigitallabs.com/bancadigital/assets/img/bm/popup-security-alert/change-password-banner.svg',
          listTitle: 'Puedes hacerlo de la siguiente forma:',
          itemList: [
            'En la parte superior busca en el <strong>menú</strong>',
            'Selecciona <strong>"Cambio de contraseña"</strong>',
            'Digita la actual e indica una nueva.'
          ],
          redirectUrl: '/change-password',
          okButtonText: 'CAMBIAR CONTRASEÑA',
          isTitleBottom: true,
          enable: true,
          isImgBig: true
        }
      ]
    });
  }

  public featureFlagsByKey(key: string): boolean | FeatureFlagsBm {
    return {
      value: true,
      featureName: 'Lorem Ipsum',
      availabilityDates: '2023-09-28/2099-10-31;2023-03-07/2099-03-15'
    };
  }

  public fetchSPIAuthorization(): void {}

  public acceptSpiConsent(): void {}

  public isSPIAuthorization$: Observable<boolean> = new BehaviorSubject(true);

  public redirectAlert(): Promise<any> {
    return new Promise<any>((resolve) => resolve);
  }
}
