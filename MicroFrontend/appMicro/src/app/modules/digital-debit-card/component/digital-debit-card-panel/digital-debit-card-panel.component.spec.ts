import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { DigitalDebitCardPanelComponent } from './digital-debit-card-panel.component';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardFacadeMock } from '@testing/mocks/facade/digital-debit-card.facade.mock';
import { TestingModule } from '@testing/testing.module';

describe('DigitalDebitCardPanelComponent', () => {
  let component: DigitalDebitCardPanelComponent;
  let fixture: ComponentFixture<DigitalDebitCardPanelComponent>;
  const digitalDebitCardFacadeMock = new DigitalDebitCardFacadeMock();
  const navControlSpy = jasmine.createSpyObj('NavController', [
    'navigateForward'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(DigitalDebitCardPanelComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          { provide: NavController, useValue: navControlSpy },
          {
            provide: DigitalDebitCardFacade,
            useValue: digitalDebitCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalDebitCardPanelComponent);
    component = fixture.componentInstance;
    component.currentRoute = '/';
    component.product = { id: '983489438934jc' };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call activateDigitalDebitCard()', () => {
    const setActivateUrlBackToSpy = spyOn(
      digitalDebitCardFacadeMock,
      'setActivateUrlBackTo'
    );
    const setProductSelectedSpy = spyOn(
      digitalDebitCardFacadeMock,
      'setProductSelected'
    );
    component.activateDigitalDebitCard();
    expect(setActivateUrlBackToSpy).toHaveBeenCalled();
    expect(setProductSelectedSpy).toHaveBeenCalled();
  });

  it('should call digitalDebitCardDetail(product: DigitalDebitCard)', () => {
    const digitalDebitCardDetailSpy = spyOn(
      digitalDebitCardFacadeMock,
      'fetchDigitalDebitCardDetail'
    );
    const product: DigitalDebitCard = {
      relativeParentId: 'kdoru589jd9',
      numberProductParent: 'jf94iejwo',
      numberDigitalCard: '94984845859',
      name: 'Hulk Card',
      isNew: true
    };
    component.digitalDebitCardDetail(product);
    expect(digitalDebitCardDetailSpy).toHaveBeenCalled();
  });
});
