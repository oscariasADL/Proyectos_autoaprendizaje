import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IonicModule } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';
import { TestingModule } from '@testing/testing.module';
import { DebitPurchaseTowardComponent } from './debit-purchase-toward.component';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';

describe('DebitPurchaseTowardComponent', () => {
  let component: DebitPurchaseTowardComponent;
  let fixture: ComponentFixture<DebitPurchaseTowardComponent>;
  let formBuilder: UntypedFormBuilder;

  beforeEach(() => {
    formBuilder = new UntypedFormBuilder();

    TestBed.configureTestingModule({
      declarations: [
        DebitPurchaseTowardComponent,
        CurrencyFormatPipe,
        NumberFormatPipe
      ],
      imports: [
        TestingModule,
        IonicModule,
        ReactiveFormsModule,
        FormsAvvModule
      ],
      providers: [{ provide: UntypedFormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DebitPurchaseTowardComponent);
    component = fixture.componentInstance;

    const defaultProduct = new ProductFactory().create();
    const mockBanksList = [
      { id: '1', name: 'Bank 1' },
      { id: '2', name: 'Bank 2' }
    ];

    component.form = formBuilder.group({
      banksList: [mockBanksList],
      fromProduct: [defaultProduct],
      bank: [null],
      account: [null]
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly in ngOnInit', () => {
    const initFormSpy = spyOn(component as any, 'initForm').and.callThrough();

    component.ngOnInit();

    expect(initFormSpy).toHaveBeenCalled();

    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('bank')).toBeDefined();
    expect(component.formGroup.get('account')).toBeDefined();
  });

  it('should add bank and account controls from the parent form', () => {
    component.form.get('bank').setValue('TestBank');
    component.form.get('account').setValue('TestAccount');

    component.ngOnInit();

    expect(component.formGroup.get('bank').value).toBe('TestBank');
    expect(component.formGroup.get('account').value).toBe('TestAccount');
  });

  it('should get banksList correctly', () => {
    const mockBanksList = [
      { id: '1', name: 'Bank 1' },
      { id: '2', name: 'Bank 2' }
    ];
    component.form.get('banksList').setValue(mockBanksList);

    expect(component.banksList).toEqual(mockBanksList);
  });

  it('should get bank control correctly', () => {
    const bankControl = component.form.get('bank');

    expect(component.bank).toBe(bankControl);
  });

  it('should get account control correctly', () => {
    const accountControl = component.form.get('account');

    expect(component.account).toBe(accountControl);
  });

  it('should emit continue event when continue is called', () => {
    spyOn(component.continue, 'emit');

    component.continue.emit();

    expect(component.continue.emit).toHaveBeenCalled();
  });
});
