import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { TransfersContactsFacadeMock } from '@testing/mocks/facade/transfers-contacts.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TransfersContactsPage } from './transfers-contacts.page';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { SpiConsentServiceMock } from '@testing/mocks/services/spi-consent.service.mock';

describe('TransfersContactsPage', () => {
  let component: TransfersContactsPage;
  let fixture: ComponentFixture<TransfersContactsPage>;
  let facade: TransfersContactsFacade;
  const formMock = new FormBuilder().group({
    fromProduct: [new ProductFactory().create(), [Validators.required]],
    amount: ['23.443', [Validators.required]],
    contact: [{ identificationData: { id: '12133', idType: '2323' } }],
    contactProduct: [
      { type: { id: 'SDA' }, relativeId: '2872373247', bank: { id: '0052' } }
    ],
    ownProduct: [null],
    transferType: [TransferType.MY_CONTACTS],
    confirmation: [null],
    addenda: [{ note: '', referenceId: '' }],
    fee: [null],
    costGmf: [null]
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersContactsPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: TransfersContactsFacade,
          useClass: TransfersContactsFacadeMock
        },
        { provide: SpiConsentService, useClass: SpiConsentServiceMock },
        { provide: AlertService, useClass: AlertServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersContactsPage);
    component = fixture.componentInstance;
    facade = TestBed.inject(TransfersContactsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should feePayload', () => {
    const feePayload = component.feePayload();
    expect(feePayload).toBeDefined();
  });

  it('should be call transferContact', () => {
    component.form = formMock;
    fixture.detectChanges();
    spyOn(facade, 'transfer');
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    component.transferContact();
    expect(facade.transfer).toHaveBeenCalled();
  });
});
