import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PocketEditPage } from '@modules/pockets/pages/pocket-edit/pocket-edit.page';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { of } from 'rxjs';
import {
  PERIODICITY,
  PERIODICITY_LABEL,
  Pocket,
  PocketsComplete,
  PocketStatus,
  PocketTypeEnum
} from '../../entities/pockets.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { mapPocketEditConfirm } from './mappers/pocket-edit-confirm.mapper';
import { PocketCreateSlide } from '../pocket-create/constants/pocket-create.constants';
import { SlideType } from '@app/modules/forms-avv/entities/stepper.interface';
import { VoucherItem } from '@app/commons/components/voucher/entities/voucher.entities';
import { DropdownList } from '@app/modules/forms-avv/entities/dropdown.interface';
import { PFMCategoryType } from '@app/modules/pfm/entities/pfm.interface';

describe('PocketEditPage', () => {
  let component: PocketEditPage;
  let fixture: ComponentFixture<PocketEditPage>;
  let facade: PocketsFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PocketEditPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: PocketsFacade,
          useClass: PocketsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketEditPage);
    component = fixture.componentInstance;
    facade = TestBed.inject(PocketsFacade);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editPocket', () => {
    expect(component.editPocket()).toBeUndefined();
  });
  it('should return pockets$ from facade', fakeAsync(() => {
    const pocketMock: Pocket[] = [
      {
        amountSaved: 500,
        description: 'Pocket 1',
        elapsedDays: 30,
        elapsedMonths: 1,
        goal: 1000,
        instalmentAmount: 100,
        nickname: 'My Pocket 1',
        numberProduct: '12345',
        period: 'monthly',
        pocketCategory: 1,
        pocketType: PocketTypeEnum.PocketWithReturns,
        productIdParent: 'p123',
        productNumberParent: 'n123',
        productTypeParent: TypeAccount.SDA,
        productTypeParentDesc: 'Credit Card',
        progress: '50%',
        remainingInstalments: 10,
        startDate: '2024-01-01',
        status: PocketStatus.ACTIVE,
        targetDate: '2024-12-31',
        timeElapsed: '1 month',
        totalInstalments: '12',
        type: 'savings',
        typeName: 'Personal Savings'
      },
      {
        amountSaved: 300,
        description: 'Pocket 2',
        elapsedDays: 15,
        elapsedMonths: 0,
        goal: 500,
        instalmentAmount: 50,
        nickname: 'My Pocket 2',
        numberProduct: '67890',
        period: 'weekly',
        pocketCategory: 2,
        pocketType: PocketTypeEnum.TraditionalPocket,
        productIdParent: 'p456',
        productNumberParent: 'n456',
        productTypeParent: TypeAccount.SDA,
        productTypeParentDesc: 'Debit Card',
        progress: '60%',
        remainingInstalments: 8,
        startDate: '2024-02-01',
        status: PocketStatus.INACTIVE,
        targetDate: '2024-08-01',
        timeElapsed: '0.5 months',
        totalInstalments: '8',
        type: 'investment',
        typeName: 'Long-term Investment'
      }
    ];

    spyOn(facade.pockets$, 'pipe').and.returnValue(of(pocketMock));

    let pockets: Pocket[] = [];
    component.pockets$.subscribe((result) => {
      pockets = result;
    });

    tick();

    expect(pockets).toEqual(pocketMock);
    expect(pockets[0].description).toBe('Pocket 1');
    expect(pockets[1].description).toBe('Pocket 2');
    expect(pockets[0].goal).toBe(1000);
    expect(pockets[1].goal).toBe(500);
  }));
  it('should initialize form with default category when pocket category does not match', fakeAsync(() => {
    const mockPocketCategories: DropdownList[] = [
      {
        value: '1',
        label: 'Category 1',
        index: '1',
        grupo: 'Grupo 1',
        icon: 'icon1',
        pfmCategoryColor: 'red',
        pfmCategoryType: PFMCategoryType.INCOME
      },
      {
        value: '2',
        label: 'Category 2',
        index: '2',
        grupo: 'Grupo 2',
        icon: 'icon2',
        pfmCategoryColor: 'blue',
        pfmCategoryType: PFMCategoryType.EXPENSE
      },
      {
        value: '3',
        label: 'Category 3',
        index: '3',
        grupo: 'Grupo 3',
        icon: 'icon3',
        pfmCategoryColor: 'green',
        pfmCategoryType: PFMCategoryType.INCOME
      }
    ];
    const mockPocket: Pocket = {
      pocketCategory: 4,
      period: 'monthly',
      amountSaved: 100,
      description: 'Test Pocket',
      goal: 1000,
      instalmentAmount: 100,
      typeName: 'Savings Pocket',
      type: 'savings'
    } as Pocket;

    spyOnProperty(component, 'pocket$', 'get').and.returnValue(of(mockPocket));
    spyOnProperty(component, 'pocketCategories$', 'get').and.returnValue(
      of(mockPocketCategories)
    );

    component.ngOnInit();
    tick();

    expect(component.form.controls['category'].value).toEqual(
      mockPocketCategories[0]
    );
  }));
});
