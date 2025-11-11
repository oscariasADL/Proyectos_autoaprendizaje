import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { BreBTransfersPage } from './bre-b-transfers.page';
import { BreBTransfersFacade } from './bre-b-transfers.facade';
import { TestingModule } from '@testing/testing.module';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { ProductFactory } from '@testing/factories/product.factory';
import { AccountAvalKey } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { BreBTransfersSlide } from '@modules/transfers/pages/bre-b-transfers/constants/bre-b-transfers.constants';

describe('BreBTransfersPage', () => {
  let component: BreBTransfersPage;
  let fixture: ComponentFixture<BreBTransfersPage>;
  let facadeStub: Partial<BreBTransfersFacade>;
  const mockAccountKey: AccountAvalKey = {
    accountId: '1',
    accountType: 'SAVINGS',
    bankId: '001',
    identSerialNum: '1234567890',
    govIssueIdentType: 'CC',
    key: 'mockKey',
    type: 'typeX',
    name: 'Juan Perez',
    bankName: 'Banco Test',
    fullName: '',
    cameraReference: 'ENT',
    receiverCamera: 'ENT',
    personType: 'PJ',
    personCategory: '2'
  };

  beforeEach(waitForAsync(() => {
    facadeStub = {
      setAddSpiContactPayload() {
        void 0;
      },
      transfer() {
        void 0;
      },
      enableLoading() {
        void 0;
      },
      disableLoading() {
        void 0;
      },
      boundsByKey: () => void 0,
      isFeatureFlagEnabled: () => of(false),
      fetchAccount: () => void 0,
      breBSpiKeyData$: of(mockAccountKey),
      brebBAccountKeyCompleted$: of(true)
    };
    TestBed.configureTestingModule({
      declarations: [BreBTransfersPage],
      imports: [IonicModule, TestingModule, GenericStepperMockModule],
      providers: [
        { provide: BreBTransfersFacade, useValue: facadeStub },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(new Map().set('spiKey', '@sherlock'))
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BreBTransfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call transfer', () => {
    spyOn(facadeStub, 'transfer').and.callFake(() => void 0);
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('towardAvalKey').setValue('@AVVASDA12');
    component.form.get('amount').setValue('10000');
    component.form.get('addenda').setValue({ note: '' });
    component.form.get('towardProduct').setValue({
      numberProduct: '8373733',
      type: 'SDA',
      bankCode: '0052'
    });

    component.form.updateValueAndValidity();
    fixture.detectChanges();

    component.transfer();
    expect(facadeStub.transfer).toHaveBeenCalled();
  });

  it('should call nextStep', () => {
    spyOn(component.isFavoriteContactControl, 'setValue');
    spyOn(component.isSavedContactControl, 'setValue');
    component.nextStep(BreBTransfersSlide.key);
    expect(component.isFavoriteContactControl.setValue).toHaveBeenCalled();
    expect(component.isSavedContactControl.setValue).toHaveBeenCalled();
  });

  it('should call modifySpiKeyTransfer', () => {
    spyOn(component, 'nextStep');
    component.modifySpiKeyTransfer();
    expect(component.nextStep).toHaveBeenCalledWith(BreBTransfersSlide.key);
  });

  it('should call modifyDataTransfer', () => {
    spyOn(component, 'nextStep');
    component.modifyDataTransfer();
    expect(component.nextStep).toHaveBeenCalledWith(BreBTransfersSlide.data);
  });
});
