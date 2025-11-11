import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { ConfigurationStepComponent } from './configuration-step.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { PocketConfigurationFormGroup } from '../../entities/create-pocket.interface';
import { PERIODICITY } from '@app/modules/pockets/entities/pockets.interface';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PocketsFacade } from '@app/modules/pockets/pockets.facade';
import { PocketsFacadeMock } from '@testing/mocks/facade/pockets.facade.mock';
import { valueNotGreaterThanProduct } from '../../validators/productValidator.validator';

describe('ConfigurationStepComponent', () => {
  let component: ConfigurationStepComponent;
  let fixture: ComponentFixture<ConfigurationStepComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let facade: PocketsFacadeMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationStepComponent],
      imports: [ReactiveFormsModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: PocketsFacade, useClass: PocketsFacadeMock }]
    });
    facade = TestBed.inject(PocketsFacade) as PocketsFacadeMock;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationStepComponent);
    component = fixture.componentInstance;
    component.form = formBuilder.group({
      product: [null],
      goal: [null],
      openAmount: [null],
      period: [null],
      periodicity: [null],
      quota: [null],
      renewPocket: [false],
      renewWithProfits: [false]
    }) as FormGroup<PocketConfigurationFormGroup>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call facade.openExternalLinks with the correct URL', () => {
    const url = 'https://example.com';
    spyOn(facade, 'openExternalLinks');
    component.openUrl(url);
    expect(facade.openExternalLinks).toHaveBeenCalledWith(url);
  });

  it('should initialize with correct default values', () => {
    expect(component.periodicityItems).toEqual(PERIODICITY);
    expect(component.toggleValues).toEqual([
      { label: 'Sí', value: true },
      { label: 'No', value: false }
    ]);
  });

  it('should emit continue event when form is valid and onSubmit is called', () => {
    spyOn(component.continue, 'emit');
    component.form.setErrors(null);
    component.onSubmit();
    expect(component.continue.emit).toHaveBeenCalled();
  });

  it('should not emit continue event when form is invalid and onSubmit is called', () => {
    spyOn(component.continue, 'emit');
    component.form.setErrors({ invalid: true });
    component.onSubmit();
    expect(component.continue.emit).not.toHaveBeenCalled();
  });

  it('should set renewWithProfits to false when renewPocket is set to false', fakeAsync(() => {
    component.form.patchValue({
      renewPocket: true,
      renewWithProfits: true
    });
    tick();

    component.form.patchValue({
      renewPocket: false
    });
    tick();

    expect(component.form.get('renewWithProfits')?.value).toBeFalse();
  }));

  describe('Form control getters', () => {
    it('should return correct form controls', () => {
      expect(component.renewal).toBe(component.form.get('renewal'));
      expect(component.goal).toBe(component.form.get('goal'));
      expect(component.openAmount).toBe(component.form.get('openAmount'));
      expect(component.period).toBe(component.form.get('period'));
      expect(component.periodicity).toBe(component.form.get('periodicity'));
      expect(component.quota).toBe(component.form.get('quota'));
      expect(component.renewPocket).toBe(component.form.get('renewPocket'));
      expect(component.renewWithProfits).toBe(
        component.form.get('renewWithProfits')
      );
    });
  });

  describe('Form value changes', () => {
    it('should maintain renewWithProfits value when renewPocket is true', fakeAsync(() => {
      component.form.patchValue({
        renewPocket: true,
        renewWithProfits: true
      });
      tick();

      expect(component.form.get('renewWithProfits')?.value).toBeTrue();
    }));
  });
  describe('valueNotGreaterThanProduct Validator', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = new FormGroup({
        product: new FormControl<any>({ availableBalance: 1000 }),
        openAmount: new FormControl(null)
      });
    });

    it('should return null when openAmount is less than availableBalance', () => {
      form.get('openAmount')?.setValue('500');
      const validator = valueNotGreaterThanProduct('product', 'openAmount', {
        openAmountExceedsBalance: true
      });
      const result = validator(form.get('openAmount'));

      expect(result).toBeNull();
    });

    it('should return validation error when openAmount exceeds availableBalance', () => {
      form.get('openAmount')?.setValue('1500');
      fixture.detectChanges();
      const validator = valueNotGreaterThanProduct('product', 'openAmount', {
        openAmountExceedsBalance: true
      });
      const result = validator(form.get('openAmount'));

      expect(result).toEqual({ openAmountExceedsBalance: true });
    });

    it('should return null if either value is null', () => {
      form.get('openAmount')?.setValue(null);
      const validator = valueNotGreaterThanProduct('product', 'openAmount', {
        openAmountExceedsBalance: true
      });
      const result = validator(form.get('openAmount'));

      expect(result).toBeNull();
    });
  });
});
