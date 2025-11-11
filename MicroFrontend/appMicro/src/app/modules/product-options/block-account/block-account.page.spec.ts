import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockAccountPage } from './block-account.page';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { BlockAccountFacadeMock } from '@testing/mocks/facade/block-account.facade.mock';
import { ProductDetailFacade } from '@modules/product-detail/product-detail.facade';
import { ProductDetailFacadeMock } from '@testing/mocks/facade/product-detail.facade.mock';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { HomeFacade } from '@modules/home/home.facade';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';

describe('BlockAccountPage', () => {
  let component: BlockAccountPage;
  let fixture: ComponentFixture<BlockAccountPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BlockAccountPage],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: BlockAccountFacade,
          useClass: BlockAccountFacadeMock
        },
        {
          provide: ProductDetailFacade,
          useClass: ProductDetailFacadeMock
        },
        {
          provide: HomeFacade,
          useClass: HomeFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    component.setProductDetail(null);
    expect(component.productDetail$.currentValue()).toEqual(null);
    expect(component).toBeTruthy();
  });

  it('should productDetail$', () => {
    expect(component.productDetail$.currentValue()).toEqual(null);
  });

  it('should setProductDetail', () => {
    expect(component.setProductDetail).toBeDefined();
  });

  it('should setBlockAccountSelectedProduct', () => {
    expect(component.setBlockAccountSelectedProduct).toBeDefined();
  });

  it('should setBlockAccountProductMedias', () => {
    expect(component.setBlockAccountProductMedias).toBeDefined();
  });

  it('should setBlockAccountForm', () => {
    expect(component.setBlockAccountForm).toBeDefined();
  });
});
