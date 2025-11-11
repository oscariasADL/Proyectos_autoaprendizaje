import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { EditPocketWithReturnsPage } from './edit-pocket-with-returns.page';
import { PocketDetailWithReturnsFacade } from '../pocket-detail-with-returns/pocket-detail-with-returns.facade';
import { of } from 'rxjs';
import {
  PocketCategory,
  PocketTypeEnum,
  PocketWithReturns
} from '../../entities/pockets.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { EditPocketWithReturnsFacade } from './store/edit-pocket-with-returns.facade';
import { AbstractControl } from '@angular/forms';

describe('EditPocketWithReturnsPage', () => {
  let component: EditPocketWithReturnsPage;
  let fixture: ComponentFixture<EditPocketWithReturnsPage>;
  let pocketDetailWithReturnsFacadeMock: jasmine.SpyObj<PocketDetailWithReturnsFacade>;
  let pocketsFacadeMock: jasmine.SpyObj<PocketsFacade>;
  let editPocketWithReturnsFacadeMock: jasmine.SpyObj<EditPocketWithReturnsFacade>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['back']);

  const mockPocket: PocketWithReturns = {
    daysDue: false,
    id: '',
    statusClass: '',
    nickname: '',
    statusName: '',
    pocketType: PocketTypeEnum.PocketWithReturns,
    type: 'SPA',
    typeName: 'Bolsillo de Ahorro',
    numberProduct: '10',
    description: 'NUEVO MODIFEX',
    progress: '20',
    goal: 1000000,
    timeElapsed: null,
    targetDate: null,
    amountSaved: 200000,
    period: 'Mensual',
    instalmentAmount: 100000,
    totalInstalments: '10',
    productTypeParent: TypeAccount.SDA,
    productTypeParentDesc: 'Bolsillo de Ahorro',
    productIdParent:
      '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
    productNumberParent: '8996550',
    pocketCategory: PocketCategory.HOLIDAYS_TRAVEL,
    status: 1,
    startDate: '05/11/2024',
    elapsedDays: 22,
    elapsedMonths: 1,
    remainingInstalments: 8,
    dayId: '02',
    renewAutomatically: true,
    renewProfits: false,
    liquidationMethod: 'C',
    renewDate: '20/01/2025',
    endDate: '31/12/2025',
    accruedInterest: 589000.12,
    termOfPermanenceInDays: 10
  };

  beforeEach(waitForAsync(() => {
    pocketDetailWithReturnsFacadeMock = jasmine.createSpyObj(
      'PocketDetailWithReturnsFacade',
      ['pocket$', 'product$', 'parameterByKey']
    );
    editPocketWithReturnsFacadeMock = jasmine.createSpyObj(
      'EditPocketWithReturnsFacade',
      ['updatePocketWithReturns']
    );

    pocketDetailWithReturnsFacadeMock.pocket$ = of(mockPocket);
    pocketDetailWithReturnsFacadeMock.product$ = of({
      id: 'product1',
      name: 'Test Product'
    });
    pocketDetailWithReturnsFacadeMock.parameterByKey = jasmine
      .createSpy()
      .and.returnValue(
        of([
          { value: 'category1', label: 'Category 1' },
          { value: 'category2', label: 'Category 2' }
        ])
      );

    pocketsFacadeMock = jasmine.createSpyObj('PocketsFacade', ['pockets$']);
    pocketsFacadeMock.pockets$ = of({
      totalActive: '1',
      totalPaused: '1',
      totalCompleted: '1',
      totalBalance: '1',
      profitabilityPockets: [mockPocket],
      traditionalPockets: [],
      pockets: []
    });

    TestBed.configureTestingModule({
      declarations: [EditPocketWithReturnsPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: PocketsFacade, useValue: pocketsFacadeMock },
        {
          provide: PocketDetailWithReturnsFacade,
          useValue: pocketDetailWithReturnsFacadeMock
        },
        {
          provide: EditPocketWithReturnsFacade,
          useValue: editPocketWithReturnsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPocketWithReturnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editPocket', () => {
    expect(component.editPocket()).toBeUndefined();
  });

  it('should to return number, get installments', () => {
    expect(component.installments).toEqual(jasmine.any(Number));
  });

  it('should initialize the form correctly', () => {
    expect(component.name).toBeDefined();
    expect(component.category).toBeDefined();
    expect(component.goal).toBeDefined();
    expect(component.quota).toBeDefined();
    expect(component.amount).toBeDefined();

    expect(component.name.value).toBe('NUEVO MODIFEX');
    expect(component.category.value).toEqual({
      value: 'category1',
      label: 'Category 1'
    });
    expect(component.goal.value).toBe(1000000);
    expect(component.quota.value).toBe(100000);
  });

  it('should get the correct form control value for category', () => {
    const categoryControl = component.category;
    expect(categoryControl.value).toEqual({
      value: 'category1',
      label: 'Category 1'
    });
    expect(categoryControl.valid).toBeTrue();
  });

  it('should get the correct form control value for quota', () => {
    const quotaControl = component.quota;
    expect(quotaControl.value).toBe(100000);
    expect(quotaControl.valid).toBeTrue();
  });

  it('should get the correct form control value for name', () => {
    const nameControl = component.name;
    expect(nameControl.value).toBe('NUEVO MODIFEX');
    expect(nameControl.valid).toBeTrue();
  });

  it('should get the correct form control value for goal', () => {
    const goalControl = component.goal;
    expect(goalControl.value).toBe(1000000);
    expect(goalControl.valid).toBeTrue();
  });

  it('should to call backPage', () => {
    component.backPage();
    expect(navCtrlSpy.back).toHaveBeenCalled();
  });
});
