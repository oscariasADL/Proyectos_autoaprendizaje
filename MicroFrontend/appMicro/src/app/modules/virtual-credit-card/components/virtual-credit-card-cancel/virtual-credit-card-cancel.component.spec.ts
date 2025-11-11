import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtualCreditCardCancelComponent } from './virtual-credit-card-cancel.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { TestingModule } from '@testing/testing.module';
import { CommonsModule } from '@app/commons/commons.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('VirtualCreditCardCancelComponent', () => {
  let component: VirtualCreditCardCancelComponent;
  let fixture: ComponentFixture<VirtualCreditCardCancelComponent>;
  let virtualCreditCardFacadeStub: Partial<VirtualCreditCardFacade>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    virtualCreditCardFacadeStub = {
      cancelVirtualCreditCard: jasmine.createSpy('cancelVirtualCreditCard')
    };

    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);

    TestBed.overrideComponent(VirtualCreditCardCancelComponent, {
      add: {
        imports: [IonicModule, GlobalPipesModule, TestingModule],
        providers: [
          {
            provide: VirtualCreditCardFacade,
            useValue: virtualCreditCardFacadeStub
          },
          { provide: ModalController, useValue: modalCtrlSpy }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [CommonsModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualCreditCardCancelComponent);
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

  it('should to call cancelVirtualCreditCard', () => {
    component.cancelVirtualCreditCard();
    expect(
      virtualCreditCardFacadeStub.cancelVirtualCreditCard
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
