import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { PocketTransferPage } from './pocket-transfer.page';
import { POCKET_TYPE_PARAM } from '@modules/pockets/constants/pockets.constants';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AlertService } from '@commons/services/alert.service';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  Pocket,
  PocketStatus,
  PocketTypeEnum
} from '../../entities/pockets.interface';
import {
  POCKETS_DETAIL,
  POCKETS_WITH_RETURNS_DETAIL
} from '@app/commons/constants/navigate.constants';
import { SlideType } from '@app/modules/forms-avv/entities/stepper.interface';

describe('PocketTransferPage', () => {
  let component: PocketTransferPage;
  let fixture: ComponentFixture<PocketTransferPage>;
  let pocketsFacadeStub: Partial<PocketsFacade>;
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create'], {
    alreadyPresent: false
  });
  const activatedRouteSpy = jasmine.createSpyObj(
    'ActivatedRoute',
    {},
    {
      snapshot: {
        paramMap: new Map([[POCKET_TYPE_PARAM, 'T']])
      }
    }
  );

  beforeEach(waitForAsync(() => {
    pocketsFacadeStub = {
      pockets$: of(null),
      pocket$: of({
        productTypeParent: TypeAccount.SDA,
        productIdParent: '232323',
        type: 'SPA',
        numberProduct: '23233'
      } as any),
      pocketWithReturns$: of({
        productTypeParent: TypeAccount.SDA,
        productIdParent: '232323',
        type: 'SPA',
        numberProduct: '23233'
      } as any),
      transferPocket() {
        return;
      },
      boundsByKey: () => 20
    };
    TestBed.configureTestingModule({
      declarations: [PocketTransferPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: AlertService,
          useValue: alertServiceSpy
        },
        {
          provide: PocketsFacade,
          useValue: pocketsFacadeStub
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call transferPocket', () => {
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    const transferPocketSpy = spyOn(pocketsFacadeStub, 'transferPocket');
    component.transferPocket();
    expect(transferPocketSpy).toHaveBeenCalled();
  });

  it('should to call confirmTransfer', () => {
    component['confirmTransfer']();
    expect(alertServiceSpy.create).toHaveBeenCalled();
  });

  it('should be defined backUrl$', () => {
    expect(component.backUrl$).toBeDefined();
  });

  it('should be defined pocket$', () => {
    expect(component.pocket$).toBeDefined();
  });

  it('should be defined pockets$', () => {
    expect(component.pockets$).toBeDefined();
  });

  it('should be defined amount', () => {
    expect(component.amount).toBeDefined();
  });
  it('should return pocketWithReturns$ when pocketTypeParam is not TraditionalPocket', () => {
    component.pocketTypeParam = PocketTypeEnum.PocketWithReturns;

    const result = component.pocket$;

    expect(result).toBe(pocketsFacadeStub.pocketWithReturns$);
  });
  it('should trigger backUrl when pocketTypeParam is not TraditionalPocket', () => {
    component.pocketTypeParam = PocketTypeEnum.PocketWithReturns;

    const result = component.pocket$;

    expect(result).toBe(pocketsFacadeStub.pocketWithReturns$);
  });
  it('should use POCKETS_DETAIL when pocketTypeParam is PocketWithReturns', (done) => {
    component.pocketTypeParam = PocketTypeEnum.PocketWithReturns;

    const testPocket: Pocket = {
      amountSaved: 1000,
      description: 'Test Pocket',
      elapsedDays: 30,
      elapsedMonths: 1,
      goal: 5000,
      instalmentAmount: 100,
      nickname: 'My Test Pocket',
      numberProduct: '23233',
      period: 'Monthly',
      pocketCategory: 1,
      pocketType: PocketTypeEnum.PocketWithReturns,
      productIdParent: '232323',
      productNumberParent: 'PN345678',
      productTypeParent: TypeAccount.SDA,
      productTypeParentDesc: 'Savings Account',
      progress: '20%',
      remainingInstalments: 40,
      startDate: '2023-01-01',
      status: PocketStatus.ACTIVE,
      statusClass: 'active',
      statusName: 'Active',
      targetDate: '2023-12-31',
      timeElapsed: '1 month',
      totalInstalments: '60',
      type: 'SPA',
      typeName: 'Traditional Pocket'
    };

    pocketsFacadeStub.pocket$ = of(testPocket);

    component.backUrl$.subscribe((result) => {
      expect(result[0]).toBe(POCKETS_WITH_RETURNS_DETAIL.toString());

      expect(result[1]).toBe(testPocket.productTypeParent);
      expect(result[2]).toBe(testPocket.productIdParent);
      expect(result[3]).toBe(testPocket.type);
      expect(result[4]).toBe(testPocket.numberProduct);

      done();
    });
  });
  it('should not transfer pocket when form is invalid', async () => {
    spyOnProperty(component.form, 'valid').and.returnValue(false);
    const transferPocketSpy = spyOn(pocketsFacadeStub, 'transferPocket');

    await component.transferPocket();

    expect(transferPocketSpy).not.toHaveBeenCalled();
  });
  it('should not transfer pocket when isPocketProfitability is true and confirmTransfer returns false', async () => {
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    spyOnProperty(component, 'isPocketProfitability').and.returnValue(true);
    spyOn(component as any, 'confirmTransfer').and.returnValue(
      Promise.resolve(false)
    );
    const transferPocketSpy = spyOn(pocketsFacadeStub, 'transferPocket');

    await component.transferPocket();

    expect(component['confirmTransfer']).toHaveBeenCalled();
    expect(transferPocketSpy).not.toHaveBeenCalled();
  });
  it('should set confirmation data and call nextStep', async () => {
    const nextStepSpy = spyOn(component as any, 'nextStep');
    component.form.controls.amount.setValue(500);
    await component['setConfirmationData']();
    expect(component.form.controls.confirmation.value).toBeDefined();
    expect(nextStepSpy).toHaveBeenCalledWith(SlideType.confirmation);
  });
});
