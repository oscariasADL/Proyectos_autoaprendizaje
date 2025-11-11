import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TestingModule } from '@testing/testing.module';
import { ConfirmPocketWithReturnsComponent } from './confirm-pocket-with-returns.component';
import { EditPocketWithReturnsForm } from '../../entities/edit-pocket-with-returns.interface';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { CurrencyFormatPipe } from '@app/commons/pipes/currency-format.pipe';
import {
  PocketCategory,
  PocketTypeEnum,
  PocketWithReturns
} from '@app/modules/pockets/entities/pockets.interface';
import { TypeAccount } from '@app/commons/entities/product/type-account';

describe('ConfirmPocketWithReturnsComponent', () => {
  let component: ConfirmPocketWithReturnsComponent;
  let fixture: ComponentFixture<ConfirmPocketWithReturnsComponent>;
  const pocketMock: PocketWithReturns = {
    id: '1',
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
    pocketCategory: PocketCategory.EDUCATION,
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
    daysDue: false,
    accruedInterest: 589000.12,
    termOfPermanenceInDays: 10
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmPocketWithReturnsComponent,
        ImageUrlPipe,
        CurrencyFormatPipe
      ],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmPocketWithReturnsComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup<EditPocketWithReturnsForm>({
      name: new FormControl('Test Name'),
      quota: new FormControl(100),
      goal: new FormControl('100000'),
      category: new FormControl('Test Category'),
      period: new FormControl('Test Period'),
      pocket: new FormControl(pocketMock)
    }) as any;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize editPocketWithReturns on ngOnInit', () => {
    component.ngOnInit();

    expect(component.editPocketWithReturns).toEqual({
      name: 'Test Name',
      quota: 100,
      goal: '100000',
      category: 'Test Category',
      period: 'Test Period',
      pocket: pocketMock
    });
  });

  it('should emit confirm event when confirm is called', () => {
    spyOn(component.confirm, 'emit');

    component.confirm.emit();

    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should emit backStep event when backStep is called', () => {
    spyOn(component.backStep, 'emit');

    component.backStep.emit();

    expect(component.backStep.emit).toHaveBeenCalled();
  });

  it('should sanitize currency correctly', () => {
    const value = '1.000';
    const sanitizedValue = component.sanitizeCurrency(value);

    expect(sanitizedValue).toBe(1000);
  });
});
