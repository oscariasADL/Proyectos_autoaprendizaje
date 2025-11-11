import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { PocketFactory } from '@testing/factories/pocket.factory';
import { ProductFactory } from '@testing/factories/product.factory';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { PERIODICITY } from '../../entities/pockets.interface';
import { PocketsFacade } from '../../pockets.facade';
import { PocketCreatePage } from './pocket-create.page';

describe('PocketCreatePage', () => {
  let component: PocketCreatePage;
  let fixture: ComponentFixture<PocketCreatePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocketCreatePage],
      imports: [GenericStepperMockModule],
      providers: [
        { provide: PocketsFacade, useClass: PocketsFacadeMock },
        ImageUrlPipe,
        CurrencyFormatPipe,
        CurrencyPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(PocketCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    const pocket = new PocketFactory().create();
    component.form.get('name').setValue(pocket.nickname);
    component.form.get('category').setValue(pocket.pocketCategory);
    component.form.get('openAmount').setValue(pocket.amountSaved);
    component.form.get('goal').setValue(pocket.goal);
    component.form.get('quota').setValue(pocket.instalmentAmount);

    const product = new ProductFactory().create();
    component.form.get('product').setValue({
      value: product,
      label: product.typeName
    });

    component.form.get('installments').setValue('Cuotas: 5');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be calculateInstallments and call get', () => {
    ['goal', 'quota', 'openAmount'].forEach((key) => {
      const control = component.form.get(key);
      control.patchValue(100);
      control.updateValueAndValidity();
    });
    expect(component.pockets$).toBeTruthy();
  });

  it('should call setConfirmationData', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.setConfirmationData()).toBeTruthy();
  });

  it('should call createPocket', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.createPocket()).toBeUndefined();
  });
});
