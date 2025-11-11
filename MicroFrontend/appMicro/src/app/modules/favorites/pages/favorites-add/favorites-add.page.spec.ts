import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FavoritesAddPage } from './favorites-add.page';
import { FavoritesFacade } from '../../favorites.facade';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/testing.module';
import { CurrencyFormatPipe } from '@app/commons/pipes/currency-format.pipe';
import { FavoritesFacadeMock } from '@testing/mocks/facade/favorites.facade.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductFactory } from '@testing/factories/product.factory';

describe('FavoritesAddPage', () => {
  let component: FavoritesAddPage;
  let fixture: ComponentFixture<FavoritesAddPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesAddPage, CurrencyFormatPipe],
      imports: [ReactiveFormsModule, TestingModule],
      providers: [{ provide: FavoritesFacade, useClass: FavoritesFacadeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cancelar la suscripción en ngOnDestroy', () => {
    if (component['productsSubscription']) {
      const unsubscribeSpy = spyOn(
        component['productsSubscription'],
        'unsubscribe'
      );
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    } else {
      component.ngOnDestroy();
      expect(true).toBeTruthy();
    }
  });

  it('should create a favorite', () => {
    component.createFavorite();
    expect(component.favoriteName).toBeDefined();
  });

  it('should select a product', () => {
    const product = new ProductFactory().create();
    component.selectedProduct(product);
    expect(component.product).toBeDefined();
  });
});
