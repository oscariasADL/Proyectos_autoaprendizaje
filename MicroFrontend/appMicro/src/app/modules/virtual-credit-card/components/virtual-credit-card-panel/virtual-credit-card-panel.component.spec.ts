import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { VirtualCreditCardPanelComponent } from './virtual-credit-card-panel.component';
import { TestingModule } from '@testing/testing.module';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { VirtualCreditCardFacadeMock } from '@testing/mocks/facade/virtual-credit-card.facade.mock';
import { VIRTUAL_CREDIT_CARD_ACTIVATE } from '@commons/constants/navigate.constants';
import { VirtualCreditCardModule } from '@modules/virtual-credit-card/virtual-credit-card.module';

describe('VirtualCreditCardPanelComponent', () => {
  let component: VirtualCreditCardPanelComponent;
  let fixture: ComponentFixture<VirtualCreditCardPanelComponent>;
  let virtualCreditCardFacadeMock: VirtualCreditCardFacadeMock;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    virtualCreditCardFacadeMock = new VirtualCreditCardFacadeMock();
    TestBed.overrideComponent(VirtualCreditCardPanelComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          { provide: NavController, useValue: navCtrlSpy },
          {
            provide: VirtualCreditCardFacade,
            useValue: virtualCreditCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [VirtualCreditCardModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualCreditCardPanelComponent);
    component = fixture.componentInstance;
    component.product = {
      id: '343434',
      type: 'CCA'
    };
    component.currentRoute = 'product-detail/';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to return true canAddVirtualCreditCard$', (done) => {
    component.canAddVirtualCreditCard$.subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should to call showVirtualCreditCardDetail', () => {
    spyOn(virtualCreditCardFacadeMock, 'fetchVirtualCreditCarDetail');
    component.modal.canDismiss = true;
    spyOn(component.modal, 'dismiss');
    component.showVirtualCreditCardDetail({} as any);
    expect(component.modal.dismiss).toHaveBeenCalled();
    expect(
      virtualCreditCardFacadeMock.fetchVirtualCreditCarDetail
    ).toHaveBeenCalled();
  });

  it('should to call activateVirtualCreditCard', () => {
    spyOn(virtualCreditCardFacadeMock, 'setProductSelectedDetail');
    spyOn(virtualCreditCardFacadeMock, 'setActivateUrlBackTo');
    component.activateVirtualCreditCard();
    expect(
      virtualCreditCardFacadeMock.setProductSelectedDetail
    ).toHaveBeenCalled();
    expect(virtualCreditCardFacadeMock.setActivateUrlBackTo).toHaveBeenCalled();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith(
      VIRTUAL_CREDIT_CARD_ACTIVATE
    );
  });

  it('should to call getSrcImgFranchise', () => {
    const numCard = '4111111111111111';
    expect(component.getSrcImgFranchise(numCard)).toEqual(
      './assets/img/visa-symbol.svg'
    );
  });

  it('should to call presente from modal object', () => {
    spyOn(component.modal, 'present');
    component.openModal();
    expect(component.modal.present).toHaveBeenCalled();
  });

  it('should to be defined cardList$', () => {
    expect(component.cardList$).toBeDefined();
  });

  it('should to be defined working$', () => {
    expect(component.working$).toBeDefined();
  });

  it('should to be defined completed$', () => {
    expect(component.completed$).toBeDefined();
  });
});
