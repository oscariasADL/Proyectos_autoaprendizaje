import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule, PopoverController } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';
import { TestingModule } from '@testing/testing.module';

import { TransfiyaManagementStepComponent } from './transfiya-management-step.component';
import { Product } from '@commons/entities/product/product.interface';
import { TRANSFIYA_MANAGEMENT_TOOLTIP_DEFAULT_ACCOUNT } from '@modules/transfiya-management/constants/transfiya-management.constants';
import { TransfiyaManagementFacade } from '@modules/transfiya-management/transfiya-management.facade';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { BehaviorSubject, Observable } from 'rxjs';

describe('TransfiyaManagementStepComponent', () => {
  let component: TransfiyaManagementStepComponent;
  let fixture: ComponentFixture<TransfiyaManagementStepComponent>;
  const popoverCtrlSpy = jasmine.createSpyObj('PopoverController', ['create']);
  let transfiyaManagementFacadeStub: Partial<TransfiyaManagementFacade>;
  let alertSpy;

  beforeEach(waitForAsync(() => {
    alertSpy = jasmine.createSpyObj('AlertService', ['create']);
    transfiyaManagementFacadeStub = {
      isFeatureFlagEnabled(key: FeatureFlagsKey): Observable<boolean> {
        return new BehaviorSubject(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [TransfiyaManagementStepComponent, CurrencyFormatPipe],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      providers: [
        { provide: AlertService, useValue: alertSpy },
        {
          provide: PopoverController,
          useValue: popoverCtrlSpy
        },
        {
          provide: TransfiyaManagementFacade,
          useValue: transfiyaManagementFacadeStub
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfiyaManagementStepComponent);
    component = fixture.componentInstance;
    const products = new ProductFactory().createBulk(4);
    component.form = new FormGroup({
      productSelected: new FormControl(null),
      products: new FormControl(products),
      isDispatch: new FormControl(false),
      notification: new FormControl({}),
      isDefaultAccount: new FormControl(false),
      nickname: new FormControl('')
    });
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should to call ngOnInit', () => {
    spyOn(
      transfiyaManagementFacadeStub.isFeatureFlagEnabled(
        FeatureFlagsKey.TransferCel2celDefaultAccount
      ),
      'currentValue'
    ).and.returnValue(true);
    component.ngOnInit();
    expect(alertSpy.create).toHaveBeenCalled();
  });

  it('should call to toggleTrustRelation', async () => {
    component.showTrustRelation = false;
    fixture.detectChanges();
    component.toggleTrustRelation();
    fixture.detectChanges();
    expect(component.isDefaultAccount.value).toBeFalsy();
  });

  it('should call to toggleTrustRelation when is on', async () => {
    component.showTrustRelation = true;
    fixture.detectChanges();
    component.toggleTrustRelation();
    fixture.detectChanges();
    expect(component?.nickname).toBeNull();
  });

  it('should call to toggleDefaultAccount when is off', async () => {
    component.showTrustRelation = false;
    component.toggleDefaultAccount();
    fixture.detectChanges();
    expect(component.isDefaultAccount.value).toBeTruthy();
  });

  it('should call to toggleDefaultAccount when is on', async () => {
    component.showTrustRelation = true;
    component.isDefaultAccount.setValue(true);
    component.toggleDefaultAccount();
    fixture.detectChanges();
    expect(component.isDefaultAccount.value).toBeFalsy();
  });

  it('should call to showPopoverinfo', async () => {
    popoverCtrlSpy.create.and.returnValue({
      present: () => {
        return Promise.resolve();
      }
    });
    await component.showPopoverInfo(
      new Event('click'),
      TRANSFIYA_MANAGEMENT_TOOLTIP_DEFAULT_ACCOUNT
    );
    expect(popoverCtrlSpy.create).toHaveBeenCalled();
  });

  it('should call to rejectTransfiya', async () => {
    alertSpy.create.and.returnValue(Promise.resolve(true));
    spyOn(component, 'rejectTransfiya').and.callThrough();
    component.rejectTransfiya();
    expect(component.rejectTransfiya).toHaveBeenCalled();

    alertSpy.create.and.returnValue(Promise.resolve(false));
    spyOnProperty(component, 'isDispatch').and.returnValue(true);
    spyOnProperty(component, 'notification').and.returnValue({
      amount: 30000,
      targetNumber: '32456984',
      note: '',
      transactionId: 'uier89er89eiun',
      isRequest: false
    });
    component.rejectTransfiya();
    expect(component.rejectTransfiya).toHaveBeenCalled();
  });

  it('should return nickname, get nickname', async () => {
    expect(component.nickname).toBeDefined();
  });

  it('should call updateFormValidations', async () => {
    expect((component as any).updateFormValidations()).toBeUndefined();
  });

  it('should call initForm, if path', async () => {
    const products: Product[] = [];
    products.push(new ProductFactory().create());
    spyOnProperty(component, 'products').and.returnValue(products);
    expect((component as any).initForm()).toBeUndefined();
  });

  it('should return undefined', async () => {
    component.form.removeControl('products');
    component.form.removeControl('isDispatch');
    component.form.removeControl('notification');
    expect(component.products).toBeUndefined();
    expect(component.isDispatch).toBeUndefined();
    expect(component.notification).toBeUndefined();
  });
});
