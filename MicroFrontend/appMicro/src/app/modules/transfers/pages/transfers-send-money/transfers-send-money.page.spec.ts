import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InformationService } from '@commons/services/information.service';
import { IonicModule } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { TransferType } from '../../entities/transfers.interface';
import { TransfersSendMoneyPage } from './transfers-send-money.page';

describe('TransfersSendMoneyPage', () => {
  let component: TransfersSendMoneyPage;
  let fixture: ComponentFixture<TransfersSendMoneyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersSendMoneyPage],
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

    fixture = TestBed.createComponent(TransfersSendMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('transferType').setValue(TransferType.SEND_TRANSFIYA);
    expect(component.feePayload().accountId.toString()).toEqual(
      product.id.toString()
    );
  });

  it('should call transferSendMoney', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('phoneNumber').setValue('3213223232');
    component.form.get('amount').setValue('10000');
    component.form.get('addenda').setValue({ referenceId: '1234', note: '' });
    expect((component as any).transferSendMoney()).toBeUndefined();
  });
});
