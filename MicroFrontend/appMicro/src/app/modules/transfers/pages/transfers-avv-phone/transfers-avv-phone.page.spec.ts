import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InformationService } from '@commons/services/information.service';
import { IonicModule } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { TransferType } from '../../entities/transfers.interface';
import { TransfersAvvPhonePage } from './transfers-avv-phone.page';

describe('TransfersAvvPhonePage', () => {
  let component: TransfersAvvPhonePage;
  let fixture: ComponentFixture<TransfersAvvPhonePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersAvvPhonePage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: InformationService,
          useValue: {
            showPanelIfNecessary: async () => ''
          }
        },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersAvvPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('transferType').setValue(TransferType.FAST_TRANSFER);
    expect(component.feePayload().accountId.toString()).toEqual(
      product.id.toString()
    );
  });

  it('should call transferUnregisterAccount', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('phoneNumber').setValue('31227736625');
    component.form.get('amount').setValue('10000');
    component.form.get('addenda').setValue({ referenceId: '1234', note: '' });
    expect((component as any).transferAvvPhone()).toBeUndefined();
  });
});
