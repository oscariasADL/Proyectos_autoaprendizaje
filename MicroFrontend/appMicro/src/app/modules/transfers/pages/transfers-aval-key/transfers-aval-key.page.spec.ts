import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfersAvalKeyPage } from './transfers-aval-key.page';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InformationService } from '@commons/services/information.service';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { SpiConsentServiceMock } from '@testing/mocks/services/spi-consent.service.mock';

describe('TransfersAvalKeyPage', () => {
  let component: TransfersAvalKeyPage;
  let fixture: ComponentFixture<TransfersAvalKeyPage>;
  const informationServiceSpy = jasmine.createSpyObj('InformationService', [
    'showPanel',
    'showPanelIfNecessary'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersAvalKeyPage],
      imports: [IonicModule, TestingModule, GenericStepperMockModule],
      providers: [
        {
          provide: InformationService,
          useValue: informationServiceSpy
        },
        { provide: SpiConsentService, useClass: SpiConsentServiceMock },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersAvalKeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('transferType').setValue(TransferType.SEND_AVAL_KEY);
    fixture.detectChanges();
    expect(component.feePayload().accountId.toString()).toEqual(
      product.id.toString()
    );
  });

  it('should call transferAvalKey', () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('amount').setValue('10000');
    component.form.get('addenda').setValue({ note: '' });
    component.form.get('towardProduct').setValue({
      numberProduct: '8373733',
      type: 'SDA',
      bankCode: '0052'
    });
    component.form.updateValueAndValidity();
    fixture.detectChanges();

    component.transferAvalKey();
    expect(component.transferAvalKey()).toBeUndefined();
  });
});
