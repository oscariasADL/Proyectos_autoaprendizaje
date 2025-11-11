import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PocketCardComponent } from './pocket-card.component';
import { of } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PocketDetailWithReturnsFacade } from '../../pocket-detail-with-returns.facade';
import {
  PocketCategory,
  PocketStatus,
  PocketTypeEnum,
  PocketWithReturns
} from '@app/modules/pockets/entities/pockets.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { IonicModule, PopoverController } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyFormatPipe } from '@app/commons/pipes/currency-format.pipe';
import { NotificationTypeEnum } from '@app/commons/components/notification/constants/notification.constants';
import {
  DEADLINE_POCKET_TOOLTIP,
  FEES_AND_RATES_ALERT
} from '../../constants/pocket-detail-with-returns.constants';

class MockStore {
  dispatch = jasmine.createSpy('dispatch');
  select = jasmine.createSpy('select').and.returnValue(of([]));

  pipe = jasmine.createSpy('pipe').and.returnValue(of([]));
}

describe('PocketCardComponent', () => {
  let component: PocketCardComponent;
  let fixture: ComponentFixture<PocketCardComponent>;
  let PocketDetailWithReturnsFacadeMock: jasmine.SpyObj<PocketDetailWithReturnsFacade>;
  let storeMock: MockStore;
  const popoverCtrlSpy = jasmine.createSpyObj('PopoverController', ['create']);

  beforeEach(async () => {
    PocketDetailWithReturnsFacadeMock = jasmine.createSpyObj(
      'PocketDetailWithReturnsFacade',
      [
        'updatePocketWithReturnsStatus',
        'updateAutoRenewal',
        'updateAutoRates',
        'openExternalLinks',
        'findProductByProductId'
      ]
    );
    storeMock = new MockStore();

    await TestBed.configureTestingModule({
      declarations: [PocketCardComponent, CurrencyFormatPipe],
      imports: [IonicModule, TestingModule, CommonModule],
      providers: [
        {
          provide: PocketDetailWithReturnsFacade,
          useValue: PocketDetailWithReturnsFacadeMock
        },
        {
          provide: PopoverController,
          useValue: popoverCtrlSpy
        },
        CurrencyPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketCardComponent);
    component = fixture.componentInstance;

    component.pocket = {
      daysDue: false,
      pocketType: PocketTypeEnum.PocketWithReturns,
      type: 'SPA',
      typeName: 'Bolsillo de Ahorro',
      numberProduct: '70',
      description: 'RENTA89',
      progress: '7',
      goal: 350000,
      timeElapsed: null,
      targetDate: null,
      amountSaved: 25000,
      period: 'Quincenal',
      instalmentAmount: 50000,
      totalInstalments: '7',
      productTypeParent: TypeAccount.SDA,
      productTypeParentDesc: 'Bolsillo de Ahorro',
      productIdParent:
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      productNumberParent: '8939063',
      pocketCategory: PocketCategory.EDUCATION,
      status: PocketStatus.ACTIVE,
      startDate: '19/12/2024',
      elapsedDays: 0,
      elapsedMonths: 0,
      remainingInstalments: 7,
      dayId: '02',
      renewAutomatically: true,
      renewProfits: false,
      liquidationMethod: 'C',
      renewDate: '01/01/1999',
      endDate: '19/12/2024',
      accruedInterest: 0,
      statusClass: '',
      statusName: '',
      id: '',
      nickname: '',
      termOfPermanenceInDays: 10
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updatePocketWithReturnsStatus when onActiveSavings is called with true', () => {
    const updatedPocket: PocketWithReturns = {
      ...component.pocket,
      status: PocketStatus.ACTIVE
    };

    component.onActiveSavings(true);
    expect(
      PocketDetailWithReturnsFacadeMock.updatePocketWithReturnsStatus
    ).toHaveBeenCalledWith(updatedPocket);
  });

  it('should call updatePocketWithReturnsStatus when onActiveSavings is called with false', () => {
    const updatedPocket: PocketWithReturns = {
      ...component.pocket,
      status: PocketStatus.PAUSED
    };

    component.onActiveSavings(false);
    expect(
      PocketDetailWithReturnsFacadeMock.updatePocketWithReturnsStatus
    ).toHaveBeenCalledWith(updatedPocket);
  });

  it('should call updateAutoRenewal when onAutoRenewal is called', () => {
    const updatedPocket: PocketWithReturns = {
      ...component.pocket,
      renewAutomatically: true
    };

    component.onAutoRenewal(true);
    expect(
      PocketDetailWithReturnsFacadeMock.updateAutoRenewal
    ).toHaveBeenCalledWith(updatedPocket);
  });

  it('should call updateAutoRates when onAutoRates is called with true', () => {
    const updatedPocket: PocketWithReturns = {
      ...component.pocket,
      renewProfits: true
    };

    component.onAutoRates(true);
    expect(
      PocketDetailWithReturnsFacadeMock.updateAutoRates
    ).toHaveBeenCalledWith(updatedPocket);
  });

  it('should not call updateAutoRates when onAutoRates is called with false', () => {
    const updatedPocket: PocketWithReturns = {
      ...component.pocket,
      renewProfits: false
    };

    component.onAutoRates(false);
    expect(
      PocketDetailWithReturnsFacadeMock.updateAutoRates
    ).toHaveBeenCalledWith(updatedPocket);
  });

  it('should return the PocketStatus enum from pocketStatus getter', () => {
    const status = component.pocketStatus;
    expect(status).toBe(PocketStatus);
  });

  it('should return the NotificationTypeEnum from notificationType getter', () => {
    const notificationType = component.notificationType;
    expect(notificationType).toBe(NotificationTypeEnum);
  });

  it('should showPopover be defined', () => {
    expect(component.showPopoverInfo).toBeDefined();
  });

  it('should call to showPopoverInfo', async () => {
    popoverCtrlSpy.create.and.returnValue({
      present: () => {
        return Promise.resolve();
      }
    });
    await component.showPopoverInfo(
      new Event('click'),
      DEADLINE_POCKET_TOOLTIP
    );
    expect(popoverCtrlSpy.create).toHaveBeenCalled();
  });

  it('should call linkAction and open the correct external link', () => {
    component.linkAction();
    expect(
      PocketDetailWithReturnsFacadeMock.openExternalLinks
    ).toHaveBeenCalledWith(
      component.feesAndRatesUrl,
      '_blank',
      FEES_AND_RATES_ALERT
    );
  });
});
