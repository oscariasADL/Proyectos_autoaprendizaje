import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { DigitalDebitCardCancelComponent } from './digital-debit-card-cancel.component';
import { DigitalDebitCardFacadeMock } from '@testing/mocks/facade/digital-debit-card.facade.mock';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardFactory } from '@testing/factories/digital-debit-card.factory';

describe('DigitalDebitCardCancelComponent', () => {
  let component: DigitalDebitCardCancelComponent;
  let fixture: ComponentFixture<DigitalDebitCardCancelComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const digitalDebitCardFacadeMock = new DigitalDebitCardFacadeMock();

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(DigitalDebitCardCancelComponent, {
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

    fixture = TestBed.createComponent(DigitalDebitCardCancelComponent);
    component = fixture.componentInstance;
    component.relativeParentId = faker.finance.account(20);
    component.card = new DigitalDebitCardFactory().digitalDebitCardDetail();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cancelDigitalDebitCard', () => {
    const cancelDigitalDebitCardSpy = spyOn(
      digitalDebitCardFacadeMock,
      'cancelDigitalDebitCard'
    );
    component.cancelDigitalDebitCard();
    expect(cancelDigitalDebitCardSpy).toHaveBeenCalled();
  });

  it('should call close modal', async () => {
    modalCtrlSpy.dismiss.and.returnValue(Promise.resolve());
    await component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
