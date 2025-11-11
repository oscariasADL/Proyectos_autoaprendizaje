import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { FavoritesEditPage } from '@modules/favorites/pages/favorites-edit/favorites-edit.page';
import { TestingModule } from '@testing/testing.module';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import {
  fakeFavorite,
  FavoritesFacadeMock
} from '@testing/mocks/facade/favorites.facade.mock';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { FavoritesDetailFacade } from '@modules/favorites/pages/favorites-detail/favorites-detail.facade';
import { FavoritesDetailFacadeMock } from '@testing/mocks/facade/favorites-detail.facade.mock';

describe('FavoritesEditPage', () => {
  let component: FavoritesEditPage;
  let fixture: ComponentFixture<FavoritesEditPage>;
  const fakeActivatedRoute = {
    paramMap: of(
      convertToParamMap({
        key_favorite: 'CC123456956875764'
      })
    )
  };
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', [
    'create',
    'dismiss'
  ]);
  const modalCtrlCreateMethodSpy = jasmine.createSpyObj('Modal', [
    'present',
    'onDidDismiss',
    'onWillDismiss'
  ]);
  modalCtrlCreateMethodSpy.onWillDismiss.and.callFake(() =>
    Promise.resolve({ name: 'La gran transferencia' })
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesEditPage, CurrencyFormatPipe, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute
        },
        {
          provide: NavController,
          useValue: navCtrlSpy
        },

        {
          provide: FavoritesFacade,
          useClass: FavoritesFacadeMock
        },
        {
          provide: FavoritesDetailFacade,
          useClass: FavoritesDetailFacadeMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        ChangeDetectorRef
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesEditPage);
    component = fixture.componentInstance;
    spyOnProperty(component, 'favorite$').and.returnValue(of(fakeFavorite));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should favorite$', () => {
    expect(component.favorite$).toBeTruthy();
  });

  it('should be call fetchFavorite', () => {
    expect(component.fetchFavorite()).toBeUndefined();
  });

  it('should bel call modifyField(typeField: string)', async () => {
    modalCtrlCreateMethodSpy.present.and.callFake(() => Promise.resolve());
    modalCtrlCreateMethodSpy.onWillDismiss.and.callFake(() =>
      Promise.resolve({ name: 'La gran transferencia' })
    );
    modalCtrlSpy.create.and.callFake(() => modalCtrlCreateMethodSpy);
    expect(await component.modifyField('title')).toBeUndefined();
  });

  it('should be call saveChanges', () => {
    expect(component.saveChanges()).toBeUndefined();
  });
});
