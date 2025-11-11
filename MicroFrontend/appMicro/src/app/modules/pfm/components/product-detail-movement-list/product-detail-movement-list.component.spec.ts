import { ShareFacadeMock } from '@testing/mocks/facade/share.facade.mock';
import { ShareFacade } from '@commons/components/share/share.facade';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductDetailMovementListComponent } from './product-detail-movement-list.component';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TestingModule } from '@testing/testing.module';
import {
  PFMCategory,
  PFMCategoryType,
  PFMMovement
} from '@modules/pfm/entities/pfm.interface';
import { PFMFacade } from '@modules/pfm/pfm.facade';
import { PFMFacadeMock } from '@testing/mocks/facade/pfm.facade.mock';
import { ModalController } from '@commons/controllers/modal.controller';

describe('ProductDetailMovementListComponent', () => {
  let component: ProductDetailMovementListComponent;
  let fixture: ComponentFixture<ProductDetailMovementListComponent>;
  const modalSpy = jasmine.createSpyObj('Modal', [
    'present',
    'onDidDismiss',
    'onWillDismiss'
  ]);
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', [
    'create',
    'dismiss'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailMovementListComponent, CurrencyFormatPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: ShareFacade,
          useClass: ShareFacadeMock
        },
        {
          provide: PFMFacade,
          useClass: PFMFacadeMock
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailMovementListComponent);
    component = fixture.componentInstance;
    component.filters = {
      id: '3',
      params: {
        startDate: '2022-05-04',
        endDate: '2022-05-31'
      }
    };
    component.groupedIncomeCategories = {
      total: 5365000.0,
      previousTotal: 0.0,
      categories: [
        {
          code: '610001',
          name: 'Acciones productos financieros',
          value: 1300000.0,
          color: '#710b79'
        }
      ]
    };
    component.groupedExpenseCategories = {
      total: 5365000.0,
      previousTotal: 0.0,
      categories: [
        {
          code: '10001',
          name: 'Alimentación',
          value: 2543029.0,
          color: '#fe8b25'
        }
      ]
    };
    component.categoriesOfMovementsWorking = false;
    component.categoriesOfMovementsCompleted = true;
    component.allMovementsByCategory = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call areMovementsWorking and return boolean', () => {
    expect(component.areMovementsWorking('849')).toBeTrue();
  });

  it('should be call fetchMovementsByCategory()', () => {
    const spy = spyOn(component.fetchMovementsByCategoryFn, 'emit');
    expect(
      component.fetchMovementsByCategory(
        new CustomEvent<PFMCategory>('', {
          detail: {
            code: '10001',
            name: 'Alimentación',
            color: '#fe8b25'
          }
        })
      )
    ).toBeUndefined();
    expect(spy).toHaveBeenCalledWith('10001');
  });

  it('should be call getMovementsByCategory and return PFMMovement[]', () => {
    expect(component.getMovementsByCategory('626')).toEqual([]);
  });

  it('should be call totalMovementsByCategory and return number', () => {
    expect(component.totalMovementsByCategory('626')).toBe(0);
  });

  it('should be call getPercentage and return number', () => {
    const rta = component.getPercentage(35, 200);
    expect(rta).toBe(rta.toString());
  });

  it('should be open change category modal', async () => {
    modalSpy.onWillDismiss.and.callFake(() => ({
      data: '9839'
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(
      await component.openChangeCategoryModal(
        new CustomEvent<PFMMovement[]>('', {
          detail: [
            {
              id: '310001_1',
              date: 1565758800000,
              description: '310001 - Depósitos 1',
              value: 1300000.0
            },
            {
              id: '310001_2',
              date: 1565931600000,
              description: '310001 - Depósitos 2',
              value: 6.0
            }
          ]
        }),
        '310001',
        PFMCategoryType.INCOME
      )
    ).toBeUndefined();
  });

  it('should be open change category modal (expense)', async () => {
    modalSpy.onWillDismiss.and.callFake(() => ({
      data: '9839'
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(
      await component.openChangeCategoryModal(
        new CustomEvent<PFMMovement[]>('', {
          detail: [
            {
              id: '310001_1',
              date: 1565758800000,
              description: '310001 - Retiros 1',
              value: 1300000.0
            },
            {
              id: '310001_2',
              date: 1565931600000,
              description: '310001 - Retiros 2',
              value: 6.0
            }
          ]
        }),
        '310001',
        PFMCategoryType.EXPENSE
      )
    ).toBeUndefined();
  });

  it('should call pfmCategoryType', () => {
    expect(typeof component.PFMCategoryType).toEqual(typeof PFMCategoryType);
  });
});
