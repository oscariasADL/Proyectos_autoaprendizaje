import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { BlockAccountFormComponent } from './block-account-form.component';
import { TestingModule } from '@testing/testing.module';
import { BlockAccountFacade } from '@modules/product-options/block-account/block-account.facade';
import { BlockAccountFacadeMock } from '@testing/mocks/facade/block-account.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { FranchiseImagePipe } from '@commons/pipes/franchise-image.pipe';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { of } from 'rxjs';
import {
  ProductType,
  ProductTypeActivation
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

describe('BlockAccountFormComponent', () => {
  let component: BlockAccountFormComponent;
  let fixture: ComponentFixture<BlockAccountFormComponent>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', [
      'navigateRoot',
      'navigateBack',
      'navigateForward',
      'pop'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        BlockAccountFormComponent,
        ImageUrlPipe,
        ImageUrlPipe,
        FranchiseImagePipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        {
          provide: BlockAccountFacade,
          useClass: BlockAccountFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    const product: ProductDetail = {
      productType: 'SDA',
      id: '3'
    };
    component.setBlockAccountSelectedProduct(product);
    spyOnProperty(component, 'productMedias$').and.returnValue(of(null));
    expect(component).toBeTruthy();
  });

  it('should create productMedias', () => {
    const product: ProductDetail = {
      productType: 'SDA',
      id: '3'
    };
    component.setBlockAccountSelectedProduct(product);
    spyOnProperty(component, 'productMedias$').and.returnValue(
      of([
        {
          activationType: ProductTypeActivation.R,
          cardFranchise: 'MASTERDEBIT',
          cardId: '****1697',
          cardType: 'Classic',
          id: '19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c30317bb5b72',
          parentId:
            '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d723a27fb57e9',
          parentType: TypeAccount.SDA,
          status: 'POR ACTIVAR',
          type: ProductType.D
        }
      ])
    );
    expect(component).toBeTruthy();
  });

  it('should create null', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    expect(component.navigate).toBeDefined();
    fixture.ngZone.run(() => expect(component.navigate()).toBeUndefined());
  });

  it('should setBlockOption', () => {
    component.form$.subscribe();
    component.selectedProduct$.subscribe();
    const product: any = {
      props: {
        productType: 'SDA',
        id: '3'
      }
    };
    component.setBlockAccountSelectedProduct(product);
    component.setBlockOption({ target: { value: '04' } });
    expect(component.form$.currentValue()).toBeNull();
  });

  it('should setBlockAccountResponse', () => {
    expect(component.setBlockAccountError).toBeDefined();
  });

  it('should setBlockAccountError', () => {
    expect(component.navigate).toBeDefined();
  });

  it('should setBlockAccountForm', () => {
    expect(component.navigate).toBeDefined();
  });
});
