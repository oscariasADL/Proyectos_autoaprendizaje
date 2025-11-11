import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfersAvalKeyTowardComponent } from './transfers-aval-key-toward.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TransfersAvalKeyFacade } from '@modules/transfers/pages/transfers-aval-key/transfers-aval-key.facade';
import { TransfersAvalKeyFacadeMock } from '@testing/mocks/facade/transfers-aval-key.facade.mock';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { TransferAvalKeyForm } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';

describe('TransfersAvalKeyTowardComponent', () => {
  let component: TransfersAvalKeyTowardComponent;
  let fixture: ComponentFixture<TransfersAvalKeyTowardComponent>;
  let towardAvalKeyControl: FormControl;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersAvalKeyTowardComponent, NumberFormatPipe],
      imports: [IonicModule, TestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: TransfersAvalKeyFacade,
          useClass: TransfersAvalKeyFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersAvalKeyTowardComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup<TransferAvalKeyForm>({
      fromProduct: new FormControl(null),
      towardAvalKey: new FormControl('avjcp626'),
      towardProduct: new FormControl(null),
      contactName: new FormControl(null),
      amount: new FormControl(null),
      transferType: new FormControl(null),
      note: new FormControl(null),
      fee: new FormControl(null),
      confirmation: new FormControl(null)
    });
    towardAvalKeyControl = component.form.get('towardAvalKey') as FormControl;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call continueAction', () => {
    component.continueAction();
    expect(component.form.valid).toBeTruthy();
  });

  it('should be call get amountMax', () => {
    expect(component.amountMax).toBeDefined();
  });

  it('should be call get towardAvalKey', () => {
    expect(component.towardAvalKey).toBeDefined();
  });

  it('should be call get towardProduct', () => {
    expect(component.towardProduct).toBeDefined();
  });

  it('should be call get contactName', () => {
    expect(component.contactName).toBeDefined();
  });

  it('should be call get amount', () => {
    expect(component.amount).toBeDefined();
  });

  it('should be call get note', () => {
    expect(component.note).toBeDefined();
  });
  it('should trim and uppercase the towardAvalKey value on change', () => {
    towardAvalKeyControl.setValue('  avjcp626  ');
    expect(towardAvalKeyControl.value).toBe('AVJCP626');
  });

  it('should update the validity of towardAvalKey after value change', () => {
    spyOn(towardAvalKeyControl, 'updateValueAndValidity').and.callThrough();
    towardAvalKeyControl.setValue('  avjcp626  ');
    expect(towardAvalKeyControl.updateValueAndValidity).toHaveBeenCalled();
  });
});
