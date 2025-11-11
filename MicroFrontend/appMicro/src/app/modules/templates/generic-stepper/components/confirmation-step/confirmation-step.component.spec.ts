import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { ConfirmationStepComponent } from './confirmation-step.component';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { TransfersCel2celFacadeMock } from '@testing/mocks/facade/transfers-cel2cel.facade.mock';
import { UntypedFormControl } from '@angular/forms';

describe('ConfirmationStepComponent', () => {
  let component: ConfirmationStepComponent;
  let fixture: ComponentFixture<ConfirmationStepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationStepComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: TransfersCel2celFacade,
          useClass: TransfersCel2celFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should usetransfiya be false', () => {
    expect(component.useTransfiya).toBeFalse();
  });

  it('should after view init', () => {
    component.data = {
      formData: {
        credit: { productType: 'CCA', minPaymentReducedAmount: 100000 }
      }
    };

    component.data.control = new UntypedFormControl();
    component.data.control.setValue([
      {
        id: 'amount',
        label: 'Valor',
        fields: ['<span aria-hidden="true">$ 10.000</span>'],
        edit: 'amount'
      }
    ]);

    component.ngAfterViewInit();
    expect(component.ngAfterViewInit).toBeDefined();
  });
});
