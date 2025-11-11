import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { TransfersCel2celSendPage } from './transfers-cel2cel-send.page';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { InformationService } from '@commons/services/information.service';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { TransfersFacadeMock } from '@testing/mocks/facade/transfers.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { TransfersCel2celFacadeMock } from '@testing/mocks/facade/transfers-cel2cel.facade.mock';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';

describe('TransfersCel2celSendPage', () => {
  let component: TransfersCel2celSendPage;
  let fixture: ComponentFixture<TransfersCel2celSendPage>;
  const informationServiceSpy = jasmine.createSpyObj('InformationService', [
    'showPanel',
    'showPanelIfNecessary'
  ]);
  const modalControllerMock = new ModalControllerMock();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersCel2celSendPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: InformationService,
          useValue: informationServiceSpy
        },
        {
          provide: ModalController,
          useValue: modalControllerMock
        },
        {
          provide: TransfersCel2celFacade,
          useClass: TransfersCel2celFacadeMock
        },
        {
          provide: TransfersFacade,
          useClass: TransfersFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersCel2celSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call feePayload', async () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('transferType').setValue(TransferType.SEND_CEL2CEL);
    expect(component.feePayload().accountId.toString()).toEqual(
      product.id.toString()
    );
  });

  it('should call transferSendCel2cel', async () => {
    const product = new ProductFactory().create();
    component.form.get('fromProduct').setValue(product);
    component.form.get('phoneNumber').setValue('3213223232');
    component.form.get('amount').setValue('10000');
    component.form.get('addenda').setValue({ referenceId: '1234', note: '' });
    component.form.get('towardProduct').setValue({
      personInfo: { name: 'To** Sta**' },
      bankName: 'Banco de Bogotá'
    });
    expect((component as any).transfersCel2cel()).toBeUndefined();
  });

  it('should call nextStep', async () => {
    const componentAny = component as any;

    informationServiceSpy.showPanelIfNecessary.and.callFake(() =>
      Promise.resolve(true)
    );
    spyOnProperty(componentAny, 'hasProductAval', 'get').and.returnValue(true);
    componentAny.form.get('transferType').setValue(TransferType.SEND_TRANSFIYA);
    fixture.detectChanges();
    await componentAny.nextStep('confirmation');
    expect(informationServiceSpy.showPanelIfNecessary).toHaveBeenCalled();

    informationServiceSpy.showPanelIfNecessary.and.callFake(() =>
      Promise.resolve(false)
    );
    await componentAny.nextStep('confirmation');
    expect(informationServiceSpy.showPanelIfNecessary).toHaveBeenCalled();
  });

  it('should get transfersCel2celTowardProducts', async () => {
    expect(component.transfersCel2celTowardProducts).toBeDefined();
  });

  it('should get hasProductAval', async () => {
    expect(component.hasProductAval).toBeFalsy();
  });
});
