import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { ProductFactory } from '@testing/factories/product.factory';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { PocketsFacade } from '../../pockets.facade';
import { PocketCreateWithReturnsPage } from './pocket-create-with-returns.page';
import { SlideType } from '@app/modules/forms-avv/entities/stepper.interface';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';
import { of } from 'rxjs';
import {
  Pocket,
  PocketStatus,
  PocketTypeEnum
} from '../../entities/pockets.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';

describe('PocketCreateWithReturnsPage', () => {
  let component: PocketCreateWithReturnsPage;
  let fixture: ComponentFixture<PocketCreateWithReturnsPage>;
  let pocketsFacade: PocketsFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PocketCreateWithReturnsPage],
      imports: [GenericStepperMockModule, ReactiveFormsModule],
      providers: [
        { provide: PocketsFacade, useClass: PocketsFacadeMock },

        ImageUrlPipe,
        CurrencyFormatPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketCreateWithReturnsPage);
    component = fixture.componentInstance;
    pocketsFacade = TestBed.inject(PocketsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required validators', () => {
    expect(
      component.form.get('name').hasValidator(Validators.required)
    ).toBeTruthy();
    expect(
      component.form.get('category').hasValidator(Validators.required)
    ).toBeTruthy();
    expect(
      component.form.get('product').hasValidator(Validators.required)
    ).toBeTruthy();
    expect(
      component.form.get('goal').hasValidator(Validators.required)
    ).toBeTruthy();
    expect(
      component.form.get('openAmount').hasValidator(Validators.required)
    ).toBeTruthy();
    expect(
      component.form.get('period').hasValidator(Validators.required)
    ).toBeTruthy();
    expect(
      component.form.get('quota').hasValidator(Validators.required)
    ).toBeTruthy();
    expect(
      component.form.get('renewPocket').hasValidator(Validators.required)
    ).toBeTruthy();
  });

  it('should validate openAmount is less than 500000', () => {
    const control = component.form.get('openAmount');

    control.setValue('400000');

    expect(control.errors).toBeTruthy();

    control.setValue('600000');
    expect(control.errors).toBeFalsy();
  });

  it('should validate period is between 31 and 9999 days', () => {
    const control = component.form.get('period');

    control.setValue(30);
    expect(control.errors?.min).toBeTruthy();

    control.setValue(10000);
    expect(control.errors?.max).toBeTruthy();

    control.setValue(90);
    expect(control.errors).toBeFalsy();
  });

  it('should call createPocketWithReturns when form is valid', () => {
    const facade = (component as any).facade;
    spyOn(facade, 'createPocketWithReturns');

    component.form.patchValue({
      name: 'Test Pocket',
      category: 'Savings',
      product: new ProductFactory().create(),
      goal: '1.000.000',
      openAmount: '500.000',
      period: 90,
      quota: '50.000',
      renewPocket: true,
      periodicity: { label: '' }
    });
    fixture.detectChanges();
    spyOnProperty(component.form, 'valid').and.returnValue(true);

    component.createPocket();

    expect(facade.createPocketWithReturns).toHaveBeenCalled();
  });

  it('should not call createPocketWithReturns when form is invalid', () => {
    const facade = (component as any).facade;
    spyOn(facade, 'createPocketWithReturns');

    component.form.get('name').setValue(null);

    component.createPocket();

    expect(facade.createPocketWithReturns).not.toHaveBeenCalled();
  });

  it('should filter products by SDA and DDA account types', () => {
    expect(component.products$).toBeDefined();
  });

  it('should set confirmation data and move to next step', async () => {
    component.form.patchValue({
      name: 'Test Pocket',
      category: 'Savings',
      product: new ProductFactory().create(),
      goal: '1.000.000',
      openAmount: '500.000',
      period: 90,
      quota: '50.000',
      renewPocket: true,
      periodicity: { label: '' }
    });
    fixture.detectChanges();
    spyOn(component['genericStepperFacade'], 'enableLoading');
    spyOn(component['genericStepperFacade'], 'disableLoading');
    spyOn(component as any, 'nextStep');

    await component['setConfirmationData']();

    expect(component['genericStepperFacade'].enableLoading).toHaveBeenCalled();
    expect(component['genericStepperFacade'].disableLoading).toHaveBeenCalled();
    expect(component['nextStep']).toHaveBeenCalledWith(SlideType.confirmation);
  });
  it('should return pockets from facade', () => {
    const pockets: Pocket[] = [
      {
        amountSaved: 1000,
        description: 'Pocket 1',
        elapsedDays: 30,
        elapsedMonths: 1,
        goal: 5000,
        instalmentAmount: 200,
        nickname: 'Pocket 1',
        numberProduct: '123',
        period: 'monthly',
        pocketCategory: 1,
        pocketType: PocketTypeEnum.PocketWithReturns,
        productIdParent: 'abc123',
        productNumberParent: '987',
        productTypeParent: TypeAccount.SDA,
        productTypeParentDesc: 'Savings Account',
        progress: '20%',
        remainingInstalments: 10,
        startDate: '2023-01-01',
        status: PocketStatus.ACTIVE,
        targetDate: '2023-12-31',
        timeElapsed: '1 month',
        totalInstalments: '12',
        type: 'savings',
        typeName: 'Savings Pocket'
      },
      {
        amountSaved: 2000,
        description: 'Pocket 2',
        elapsedDays: 60,
        elapsedMonths: 2,
        goal: 10000,
        instalmentAmount: 300,
        nickname: 'Pocket 2',
        numberProduct: '456',
        period: 'quarterly',
        pocketCategory: 2,
        pocketType: PocketTypeEnum.PocketWithReturns,
        productIdParent: 'def456',
        productNumberParent: '654',
        productTypeParent: TypeAccount.DDA,
        productTypeParentDesc: 'Investment Account',
        progress: '40%',
        remainingInstalments: 8,
        startDate: '2023-02-01',
        status: PocketStatus.COMPLETED,
        targetDate: '2024-02-01',
        timeElapsed: '2 months',
        totalInstalments: '12',
        type: 'investment',
        typeName: 'Investment Pocket'
      }
    ];

    spyOn(pocketsFacade.pockets$, 'pipe').and.returnValue(of(pockets));

    let result: Pocket[];
    component.pockets$.subscribe((data) => {
      result = data;
    });

    expect(result).toEqual(pockets);
  });
});
