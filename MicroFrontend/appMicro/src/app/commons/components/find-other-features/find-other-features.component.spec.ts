import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FindOtherFeaturesFacade } from '@commons/components/find-other-features/find-other-features.facade';
import { IonicModule, NavController } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { FindOtherFeaturesFacadeMock } from '@testing/mocks/facade/find-other-features.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { Observable, of } from 'rxjs';

import { FindOtherFeaturesComponent } from './find-other-features.component';
import { AlertService } from '@commons/services/alert.service';
import { ProductFactory } from '@testing/factories/product.factory';
import { FindOtherFeaturesType } from '@commons/components/find-other-features/find-other-features.constants';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import {
  Balance,
  TypeProduct
} from '@app/commons/entities/product/balance.interface';

describe('FindOtherFeaturesComponent', () => {
  let component: FindOtherFeaturesComponent;
  let fixture: ComponentFixture<FindOtherFeaturesComponent>;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);
  const actions$ = new Observable<Action>();
  let findOtherFeaturesFacadeMock: FindOtherFeaturesFacadeMock;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FindOtherFeaturesComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        provideMockActions(() => actions$),
        {
          provide: FindOtherFeaturesFacade,
          useClass: FindOtherFeaturesFacadeMock
        },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FindOtherFeaturesComponent);
    component = fixture.componentInstance;
    component.type = FindOtherFeaturesType.transfers;
    findOtherFeaturesFacadeMock = TestBed.inject(
      FindOtherFeaturesFacade
    ) as FindOtherFeaturesFacadeMock;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirectProduct', () => {
    const product = new ProductFactory().create();
    expect((component as any).redirectProduct(product)).toBeUndefined();
  });

  it('should return FindOtherFeaturesType, get FindOtherFeaturesType()', () => {
    expect(component.findOtherFeaturesType).toBeDefined();
  });
  it('should redirect to CCA product with highest availablePurchasesBalance when multiple CCA products are available', async () => {
    const productFactory = new ProductFactory();
    const ccaProduct1 = productFactory.create({
      type: TypeAccount.CCA,
      availablePurchasesBalance: 50
    });
    const ccaProduct2 = productFactory.create({
      type: TypeAccount.CCA,
      availablePurchasesBalance: 100
    });
    const balance: Balance[] = [
      {
        typeProduct: TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS,
        name: 'Balances',
        description: 'Your balances',
        balanceTotal: 1000,
        quantity: 2,
        products: [ccaProduct1, ccaProduct2],
        pointsPerBank: []
      }
    ];
    findOtherFeaturesFacadeMock.balance$ = of(balance);
    alertServiceSpy.create.and.returnValue(Promise.resolve(0));

    await component.showMessage();

    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith(
      `/product-detail/CCA/${ccaProduct2.id}`
    );
  });
});
