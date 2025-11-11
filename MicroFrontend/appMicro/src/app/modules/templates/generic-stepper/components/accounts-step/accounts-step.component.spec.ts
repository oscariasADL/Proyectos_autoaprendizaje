import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { AccountsStepFacade } from '@modules/templates/generic-stepper/components/accounts-step/accounts-step.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { TestingModule } from '@testing/testing.module';

import { AccountsStepComponent } from './accounts-step.component';
import { GenericStepperFacade } from '@modules/templates/generic-stepper/generic-stepper.facade';
import { GenericStepperFacadeMock } from '@testing/mocks/facade/generic-stepper.facade.mock';
import { of } from 'rxjs';

describe('AccountsStepComponent', () => {
  let component: AccountsStepComponent;
  let fixture: ComponentFixture<AccountsStepComponent>;
  let accountsStepFacadeStub: Partial<AccountsStepFacade>;

  beforeEach(waitForAsync(() => {
    accountsStepFacadeStub = {
      balance$: of([{ products: new ProductFactory().createBulk(2) }] as any),
      balanceWorking$: of(false)
    };
    TestBed.configureTestingModule({
      declarations: [AccountsStepComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: AccountsStepFacade,
          useValue: accountsStepFacadeStub
        },
        {
          provide: GenericStepperFacade,
          useClass: GenericStepperFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsStepComponent);
    component = fixture.componentInstance;
    component.data = {
      control: new UntypedFormControl(),
      accountFilters: null
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectProduct', () => {
    const product = new ProductFactory().create();
    spyOn(component, 'selectProduct').and.callThrough();
    component.selectProduct(product);
    expect(component.selectProduct).toHaveBeenCalled();
    spyOn(component, 'isDisabled').and.returnValue(true);
    component.selectProduct(product);
    expect(component.selectProduct).toHaveBeenCalled();
  });

  it('should call showInformation and closeStepper', () => {
    expect(component.showInformation()).toBeUndefined();
    expect(component.closeStepper()).toBeUndefined();
  });
});
