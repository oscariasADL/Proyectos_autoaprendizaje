import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtualCreditCardReissueComponent } from './virtual-credit-card-reissue.component';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { VirtualCreditCardOperationPayload } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { TestingModule } from '@testing/testing.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { CommonsModule } from '@app/commons/commons.module';

describe('VirtualCreditCardReissueComponent', () => {
  let component: VirtualCreditCardReissueComponent;
  let fixture: ComponentFixture<VirtualCreditCardReissueComponent>;
  let virtualCreditCardFacadeStub: Partial<VirtualCreditCardFacade>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    virtualCreditCardFacadeStub = {
      reissueVirtualCreditCard: jasmine.createSpy('reissueVirtualCreditCard') // 👈 solución
    };
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.overrideComponent(VirtualCreditCardReissueComponent, {
      add: {
        imports: [IonicModule, TestingModule, GlobalPipesModule],
        providers: [
          {
            provide: VirtualCreditCardFacade,
            useValue: virtualCreditCardFacadeStub
          },
          { provide: ModalController, useValue: modalCtrlSpy }
        ]
      },
      remove: {
        imports: [CommonsModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualCreditCardReissueComponent);
    component = fixture.componentInstance;
    component.virtualCreditCardDetail = {
      maxAmtTCV: '100000',
      cvcTCV: '166',
      numberProductTCV: '46666666666666666',
      expDateTCV: '12/27',
      statusTCV: 'Activo',
      typeTCV: 'Na',
      nickname: 'TCV'
    };
    component.acctTypeParent = 'CCA';
    component.numberProductParent = '4111111111111111';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call reissueDigitalDebitCard', () => {
    component.reissueDigitalDebitCard();
    expect(
      virtualCreditCardFacadeStub.reissueVirtualCreditCard
    ).toHaveBeenCalled();
  });

  it('should to call to closeModal', () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should to be defined franchiseImage', () => {
    expect(component.franchiseImage).toBeDefined();
  });
});
