import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProductFacadeMock } from '@testing/mocks/facade/product.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ProductFacade } from '../../product.facade';
import { ProductToggleBalancesComponent } from './product-toggle-balances.component';
import { BehaviorSubject } from 'rxjs';

describe('ProductToggleBalancesComponent', () => {
  let component: ProductToggleBalancesComponent;
  let fixture: ComponentFixture<ProductToggleBalancesComponent>;
  let facade: ProductFacadeMock;
  let hiddenBalanceSubject: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    hiddenBalanceSubject = new BehaviorSubject<boolean>(false);

    TestBed.configureTestingModule({
      declarations: [ProductToggleBalancesComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ProductFacade,
          useValue: {
            hiddenBalance$: hiddenBalanceSubject,
            setHiddenBalance: jasmine.createSpy('setHiddenBalance')
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductToggleBalancesComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(ProductFacade) as unknown as ProductFacadeMock;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
