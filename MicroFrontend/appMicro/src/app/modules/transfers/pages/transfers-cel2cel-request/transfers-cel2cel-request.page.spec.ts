import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfersCel2celRequestPage } from './transfers-cel2cel-request.page';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransferType } from '@modules/transfers/entities/transfers.interface';

describe('TransfersCel2celRequestPage', () => {
  let component: TransfersCel2celRequestPage;
  let fixture: ComponentFixture<TransfersCel2celRequestPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersCel2celRequestPage],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersCel2celRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feeCel2celPayload', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('transferType').setValue(TransferType.FAST_TRANSFER);
    expect(component.feeCel2celPayload().accountId.toString()).toEqual(
      product.id.toString()
    );
  });

  it('should call transferCel2celRequestMoney', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('phoneNumber').setValue('3114673456');
    component.form.get('amount').setValue('10000');
    component.form.get('addenda').setValue({ referenceId: '1234', note: '' });
    expect((component as any).transferCel2celRequestMoney()).toBeUndefined();
  });
});
