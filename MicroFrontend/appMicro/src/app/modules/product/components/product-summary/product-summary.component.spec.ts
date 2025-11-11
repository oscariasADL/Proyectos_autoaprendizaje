import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { POCKETS, PRODUCTS } from '@commons/constants/navigate.constants';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ProductFacade } from '../../product.facade';
import { ProductSummaryComponent } from './product-summary.component';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';

describe('ProductSummaryComponent', () => {
  let component: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSummaryComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ProductFacade, useClass: ProductFacadeMock },
        { provide: HomeFacade, useClass: HomeFacadeMock },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSummaryComponent);
    component = fixture.componentInstance;
    component.homeProduct = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to products with filter', inject(
    [Router],
    (router: Router) => {
      fixture.ngZone.run(() => {
        const spy = spyOn(router, 'navigateByUrl');
        spyOn(component, 'setProductFilter').and.callThrough();
        component.setProductFilter();

        const url = spy.calls.first().args[0];

        expect(url.toString()).toBe(PRODUCTS.toString());
        expect(component.setProductFilter).toHaveBeenCalled();
      });
    }
  ));

  it('should call redirectProductDetail', () => {
    fixture.ngZone.run(() => {
      spyOn(component, 'redirectProductDetail').and.callThrough();
      component.redirectProductDetail('');
      expect(component.redirectProductDetail).toHaveBeenCalled();
    });
  });

  it('should redirect to POCKETS', inject([Router], (router: Router) => {
    fixture.ngZone.run(() => {
      const spy = spyOn(router, 'navigateByUrl');
      component.navigateToPockets();
      const url = spy.calls.first().args[0];
      expect(url.toString()).toBe('/pockets?showMessage=true');
    });
  }));
});
