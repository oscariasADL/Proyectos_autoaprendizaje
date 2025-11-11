import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { DigitalDebitCardReissueComponent } from './digital-debit-card-reissue.component';
import { DigitalDebitCardFacadeMock } from '@testing/mocks/facade/digital-debit-card.facade.mock';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardFactory } from '@testing/factories/digital-debit-card.factory';

describe('DigitalDebitCardReissueComponent', () => {
  let component: DigitalDebitCardReissueComponent;
  let fixture: ComponentFixture<DigitalDebitCardReissueComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const digitalDebitCardFacadeMock = new DigitalDebitCardFacadeMock();

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(DigitalDebitCardReissueComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: DigitalDebitCardFacade,
            useValue: digitalDebitCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalDebitCardReissueComponent);
    component = fixture.componentInstance;
    component.relativeParentId = faker.finance.account(20);
    component.card = new DigitalDebitCardFactory().digitalDebitCardDetail();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reissueDigitalDebitCardFn', () => {
    const reissueDigitalDebitCardSpy = spyOn(
      digitalDebitCardFacadeMock,
      'reissueDigitalDebitCard'
    );
    component.reissueDigitalDebitCard();
    expect(reissueDigitalDebitCardSpy).toHaveBeenCalled();
  });

  it('should call close modal', async () => {
    await component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
