import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { FavoritesService } from './favorites.service';
import {
  FavoriteDeletePayload,
  FavoritePayload,
  IdentificationFavoriteType
} from '@modules/favorites/entities/favorites.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

describe('FavoritesService', () => {
  const setup = (): {
    service: FavoritesService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(FavoritesService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoritesService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: FavoritesService = TestBed.inject(FavoritesService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchFavorites', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.favorites.base);
    const mockData = {};
    service.fetchFavorites().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call createFavorite', () => {
    const { service, httpTestingController } = setup();
    const mockData = {};
    const payload: FavoritePayload = {
      userData: {
        idUserType: 'CC',
        idUser: '11018373'
      },
      favoriteTransaction: {
        nameFavoriteTransaction: 'Pago mensual',
        identificationFavoriteType: IdentificationFavoriteType.TRANSFER,
        sourceAccountTransaction: {
          idAcctTransaction: '73467464',
          typeAcctTransaction: TypeAccount.SDA
        },
        additionalDataTransaction: null
      }
    };
    const url = urlBuilder.services(ENV.api.services.favorites.base);
    service.createFavorite(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call deleteFavorite', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.favorites.delete);
    const mockData = {};
    const payload: FavoriteDeletePayload = {
      userData: {
        idUserType: 'CC',
        idUser: '11018373'
      },
      idFavoriteTransaction: '8745745745'
    };
    service.deleteFavorite(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('PUT');
  });

  it('should to call updateFavorite', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.favorites.base);
    const mockData = {};
    const payload: FavoritePayload = {
      userData: {
        idUserType: 'CC',
        idUser: '11018373'
      },
      favoriteTransaction: {
        nameFavoriteTransaction: 'Pago mensual',
        identificationFavoriteType: IdentificationFavoriteType.TRANSFER,
        sourceAccountTransaction: {
          idAcctTransaction: '73467464',
          typeAcctTransaction: TypeAccount.SDA
        },
        additionalDataTransaction: null
      }
    };
    service.updateFavorite(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('PUT');
  });

  it('should to call fetchFavoriteDetail', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.favorites.detail);
    const mockData = {};
    service.fetchFavoriteDetail('8745745745').subscribe();
    const req = httpTestingController.expectOne(url + '/8745745745');
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
