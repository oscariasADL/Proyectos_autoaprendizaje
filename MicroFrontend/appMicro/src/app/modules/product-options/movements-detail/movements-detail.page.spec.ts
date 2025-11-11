import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovementFacade } from '@modules/movement/movement.facade';
import { IonicModule } from '@ionic/angular';
import { MovementFacadeMock } from '@testing/mocks/facade/movement.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { MovementsDetailPage } from './movements-detail.page';
import { PFMFacade } from '@modules/pfm/pfm.facade';
import { PFMFacadeMock } from '@testing/mocks/facade/pfm.facade.mock';
import { PFMChangeCategoryPayload } from '@modules/pfm/entities/pfm.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { MovementsDetailPayload } from '@app/modules/movement/entities/movements-detail-payload.entity';

describe('MovementsDetailPage', () => {
  let component: MovementsDetailPage;
  let fixture: ComponentFixture<MovementsDetailPage>;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MovementsDetailPage],
      imports: [TestingModule, IonicModule],
      providers: [
        { provide: MovementFacade, useClass: MovementFacadeMock },
        { provide: PFMFacade, useClass: PFMFacadeMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '', type: '' }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(MovementsDetailPage);
    component = fixture.componentInstance;
    spyOnProperty(component, 'payload$').and.returnValue(
      of({
        id: '333',
        params: { startDate: '2022-04-13', endDate: '2022-04-30' }
      })
    );
    spyOnProperty(component, 'pfmBalancesSummary$').and.returnValue(
      of([
        {
          accountNumber: '518500000000999',
          idProduct: '3',
          type: 'CA',
          incomes: 1550000.22,
          expenses: -445000,
          balance: 1105000.22,
          previousBalance: 0,
          overdraft: 0,
          totalIncomes: 1550000.22
        }
      ])
    );
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ionViewDidEnter', () => {
    component.infiniteScroll = {
      complete: () => {
        return;
      },
      disabled: false
    } as any;
    expect(component.ionViewDidEnter()).toBeUndefined();
  });

  it('should be call lifecycles and others', () => {
    expect(component.ionViewDidLeave()).toBeUndefined();
    expect(component.loadData()).toBeUndefined();
    expect(component.fetchMovementsWithFilters(null)).toBeUndefined();
  });

  it('should be call scrolling', () => {
    component.content = {
      scrollToTop: async (a) => {
        return;
      }
    } as any;
    expect(component.scrollToTop()).toBeUndefined();
    expect(component.scrolling({ detail: { deltaY: 0 } })).toBeUndefined();
    component.showFab = false;
    expect(component.scrolling({ detail: { deltaY: 1 } })).toBeUndefined();
    component.showFab = true;
    expect(component.scrolling({ detail: { deltaY: -1 } })).toBeUndefined();
  });

  it('should get movementsFilters', () => {
    expect(component.movementsFilters.length).toEqual(3);
  });

  it('should be call fetchPFMMovementsByCategory', () => {
    expect(component.fetchPFMMovementsByCategory('626')).toBeUndefined();
  });

  it('should be call changePFMCategory', () => {
    const changeCategoryPayload: PFMChangeCategoryPayload = {
      productType: 'CA',
      idCategory: '10001',
      transactions: [
        {
          id: '10001_1'
        },
        {
          id: '10001_2'
        }
      ]
    };
    expect(component.changePFMCategory(changeCategoryPayload)).toBeUndefined();
  });

  it('should get completed$', () => {
    expect(component.completed$).toBeDefined();
  });

  it('should get allMovementsByCategory$', () => {
    expect(component.allMovementsByCategory$).toBeDefined();
  });

  it('should get payload$', () => {
    expect(component.payload$).toBeDefined();
    expect(component.payload$.currentValue()).toEqual({
      id: '333',
      params: { startDate: '2022-04-13', endDate: '2022-04-30' }
    });
  });

  it('should get pfmBalancesSummary$', () => {
    expect(component.pfmBalancesSummary$).toBeDefined();
    expect(component.pfmBalancesSummary$.currentValue()).toEqual([
      {
        accountNumber: '518500000000999',
        idProduct: '3',
        type: 'CA',
        incomes: 1550000.22,
        expenses: -445000,
        balance: 1105000.22,
        previousBalance: 0,
        overdraft: 0,
        totalIncomes: 1550000.22
      }
    ]);
  });
  it('should call both resetMovementsByCategory and fetchMovementsWithFilters if params has startDate and endDate', () => {
    const params = { startDate: '2022-01-01', endDate: '2022-12-31' };
    const resetSpy = spyOn(component['pfmFacade'], 'resetMovementsByCategory');
    const fetchSpy = spyOn(component['facade'], 'fetchMovementsWithFilters');
    component.fetchMovementsWithFilters(params);
    expect(resetSpy).toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledWith(params);
  });
  it('should call only fetchMovementsWithFilters and not resetMovementsByCategory when params is null', () => {
    const resetSpy = spyOn(component['pfmFacade'], 'resetMovementsByCategory');
    const fetchSpy = spyOn(component['facade'], 'fetchMovementsWithFilters');
    component.fetchMovementsWithFilters(null);
    expect(resetSpy).not.toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledWith(null);
  });
  it('should call only fetchMovementsWithFilters and not resetMovementsByCategory when params does not have startDate/endDate', () => {
    const params = { someOtherProp: 'value' } as any;
    const resetSpy = spyOn(component['pfmFacade'], 'resetMovementsByCategory');
    const fetchSpy = spyOn(component['facade'], 'fetchMovementsWithFilters');
    component.fetchMovementsWithFilters(params);
    expect(resetSpy).not.toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledWith(params);
  });
  it('should return 12 when credit is true (account type is CH)', () => {
    activatedRoute.snapshot.params.type = TypeAccount.CH;
    expect(component.monthsBackward).toBe(12);
  });
  it('should return 12 when credit is true (account type is DLA)', () => {
    activatedRoute.snapshot.params.type = TypeAccount.DLA;
    expect(component.monthsBackward).toBe(12);
  });
  it('should return 3 when credit is false (account type is not CH or DLA)', () => {
    activatedRoute.snapshot.params.type = 'CA';
    expect(component.monthsBackward).toBe(3);
  });
});
