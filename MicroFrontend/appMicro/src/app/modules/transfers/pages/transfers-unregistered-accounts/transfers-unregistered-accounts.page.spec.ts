import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InformationService } from '@commons/services/information.service';
import { IonicModule } from '@ionic/angular';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { TransferType } from '../../entities/transfers.interface';
import { TransfersUnregisteredAccountsPage } from './transfers-unregistered-accounts.page';

describe('TransfersUnregisteredAccountsPage', () => {
  let component: TransfersUnregisteredAccountsPage;
  let fixture: ComponentFixture<TransfersUnregisteredAccountsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersUnregisteredAccountsPage],
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

    fixture = TestBed.createComponent(TransfersUnregisteredAccountsPage);
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
    component.form.get('towardAccount').setValue('');
    component.form.get('amount').setValue('10000');
    component.form.get('addenda').setValue({ referenceId: '1234', note: '' });
    expect((component as any).transferUnregisterAccount()).toBeUndefined();
  });
});
