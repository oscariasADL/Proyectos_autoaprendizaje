import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CustomizeAvalTagSelectComponent } from './customize-aval-tag-select.component';
import { TestingModule } from '@testing/testing.module';
import {
  ProductSpiUserKey,
  SpiKeyType,
  StatusDirectory
} from '@app/modules/product/entities/product-spi-user-key';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { RandomKeyPayload } from '../../entities/customize-aval-tag.interface';
import { getRandomKeyAction } from '../../store/customize-aval-tag.actions';

xdescribe('CustomizeAvalTagSelectComponent', () => {
  let component: CustomizeAvalTagSelectComponent;
  let fixture: ComponentFixture<CustomizeAvalTagSelectComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockAccount: ProductSpiUserKey = {
    accountId: '123456789',
    accountType: TypeAccount.SDA,
    numberProduct: '123456789',
    keyId: '213123',
    keyType: SpiKeyType.AlphanumericIdentifier,
    preferredIndicator: '123123',
    statusDesc: '2',
    effDt: 'sadas',
    statusDirectory: StatusDirectory.DICE
  };

  beforeEach(waitForAsync(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation']);

    TestBed.configureTestingModule({
      declarations: [CustomizeAvalTagSelectComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeAvalTagSelectComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Setup default store selectors
    mockStore.select.and.returnValue(of(null));

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.account).toBeNull();
    expect(component.selectedOption).toBeNull();
    expect(component.userCard).toEqual({
      id: 1,
      title: '',
      subtitle: 'CUSTOMIZE_AVAL_TAG.EDIT_SELECT.USER_SELECTED_TAG',
      value: '',
      tag: 'CUSTOMIZE_AVAL_TAG.EDIT_SELECT.HINT'
    });
  });

  it('should have randomKeyData$ observable', () => {
    expect(component.randomKeyData$).toBeDefined();
  });

  it('should have loading$ observable', () => {
    expect(component.loading$).toBeDefined();
  });

  it('should have error$ observable', () => {
    expect(component.error$).toBeDefined();
  });

  it('should have getProductType helper', () => {
    expect(component['getProductType']).toBeDefined();
  });

  it('should initializeComponent', () => {
    expect(component['initializeComponent']).toBeDefined();
  });

  it('should loadRandomKey', () => {
    expect(component['loadRandomKey']).toBeDefined();
  });

  it('should onRadioChange', () => {
    expect(component.onRadioChange).toBeDefined();
  });

  it('should confirmForm', () => {
    expect(component.confirmForm).toBeDefined();
  });

  it('should initialize component with navigation data', () => {
    const mockNavigation = {
      extras: {
        state: {
          account: mockAccount,
          new_key: 'test_key'
        }
      }
    };

    mockRouter.getCurrentNavigation.and.returnValue(mockNavigation as any);

    component['initializeComponent']();

    expect(component.account).toEqual(mockAccount);
    expect(component.userCard.title).toBe('TEST_KEY');
    expect(component.userCard.value).toBe('TEST_KEY');
  });

  it('should handle navigation without state', () => {
    mockRouter.getCurrentNavigation.and.returnValue({ extras: {} } as any);

    component['initializeComponent']();

    expect(component.account).toBeUndefined();
  });

  it('should dispatch getRandomKeyAction when account exists', () => {
    component.account = mockAccount;

    component['loadRandomKey']();

    const expectedPayload: RandomKeyPayload = {
      accountType: mockAccount.accountType,
      accountId: mockAccount.accountId
    };

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      getRandomKeyAction({ payload: expectedPayload })
    );
  });

  it('should not dispatch action when account is null', () => {
    component.account = null;

    component['loadRandomKey']();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should update selectedOption on radio change', () => {
    component.account = mockAccount;
    component.selectedOption = 'SELECTED_KEY';

    component.onRadioChange('NEW_VALUE');

    expect(component.selectedOption).toEqual({
      ...mockAccount,
      newKeyId: 'SELECTED_KEY'
    });
  });

  it('should handle radio change with null account', () => {
    component.account = null;

    expect(() => component.onRadioChange('TEST_VALUE')).not.toThrow();
  });

  it('should call confirmForm without errors', () => {
    expect(() => component.confirmForm()).not.toThrow();
  });

  it('should setup store selectors in constructor', () => {
    expect(mockStore.select).toHaveBeenCalledTimes(3);
  });

  it('should handle ngOnInit lifecycle', () => {
    spyOn(component as any, 'initializeComponent');
    spyOn(component as any, 'loadRandomKey');

    component.ngOnInit();

    expect(component['initializeComponent']).toHaveBeenCalled();
    expect(component['loadRandomKey']).toHaveBeenCalled();
  });
});
