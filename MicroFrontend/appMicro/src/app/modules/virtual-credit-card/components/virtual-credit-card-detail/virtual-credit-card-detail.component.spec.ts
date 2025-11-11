import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';

import { VirtualCreditCardDetailComponent } from './virtual-credit-card-detail.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VirtualCreditCardFacadeMock } from '@testing/mocks/facade/virtual-credit-card.facade.mock';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { ProductModule } from '@modules/product/product.module';
import { WalletProductDetailPanelComponent } from '@modules/wallets/components/wallet-product-detail-panel/wallet-product-detail-panel.component';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

describe('VirtualCreditCardDetailComponent', () => {
  let component: VirtualCreditCardDetailComponent;
  let fixture: ComponentFixture<VirtualCreditCardDetailComponent>;
  let virtualCreditCardFacadeMock: VirtualCreditCardFacadeMock;
  let modalCtrlSpy, platformReadySpy, platformSpy, backButton;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    platformReadySpy = Promise.resolve();
    backButton = {
      subscribeWithPriority: (priority, fn) => {
        fn();
      }
    };
    platformSpy = jasmine.createSpyObj(
      'Platform',
      {
        ready: platformReadySpy,
        backButton: platformReadySpy
      },
      { backButton }
    );
    virtualCreditCardFacadeMock = new VirtualCreditCardFacadeMock();
    TestBed.overrideComponent(VirtualCreditCardDetailComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          { provide: Platform, useValue: platformSpy },
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: VirtualCreditCardFacade,
            useValue: virtualCreditCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [
          ProductModule,
          WalletProductDetailPanelComponent,
          FeatureToggleDirective
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualCreditCardDetailComponent);
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

  it('should to call to closeModal', () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should call copyToClipboard copy', async () => {
    expect(await component.copyNumberToClipboard()).toBe(void 0);
  });

  it('should to call showFrequentQuestions', () => {
    spyOn(virtualCreditCardFacadeMock, 'showFrequentQuestions');
    component.showFrequentQuestions();
    expect(
      virtualCreditCardFacadeMock.showFrequentQuestions
    ).toHaveBeenCalled();
  });

  it('should to call showUse', () => {
    spyOn(virtualCreditCardFacadeMock, 'showVirtualCreditCardUse');
    component.showUse();
    expect(
      virtualCreditCardFacadeMock.showVirtualCreditCardUse
    ).toHaveBeenCalled();
  });

  it('should to be defined isPossibleCopyToClipboard', () => {
    expect(component.isPossibleCopyToClipboard).toBeDefined();
  });

  it('should to be defined franchiseImage', () => {
    expect(component.franchiseImage).toBeDefined();
  });

  it('should to be defined maxCardsLimit$', () => {
    expect(component.maxCardsLimit$).toBeDefined();
  });

  it('should to be defined totalCardsCreated$', () => {
    expect(component.totalCardsCreated$).toBeDefined();
  });
  it('should unsubscribe from the subscription on destroy when subscription is not null or undefined', () => {
    component['subscription'] = jasmine.createSpyObj('Subscription', [
      'unsubscribe'
    ]);
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should not throw error on destroy when subscription is null or undefined', () => {
    component['subscription'] = null;
    expect(() => component.ngOnDestroy()).not.toThrow();
    component['subscription'] = undefined;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
