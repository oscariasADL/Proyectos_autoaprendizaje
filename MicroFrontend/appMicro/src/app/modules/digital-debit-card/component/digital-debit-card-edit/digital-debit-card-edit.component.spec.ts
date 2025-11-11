import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { TestingModule } from '@testing/testing.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { DigitalDebitCardEditComponent } from './digital-debit-card-edit.component';
import { DigitalDebitCardFactory } from '@testing/factories/digital-debit-card.factory';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardFacadeMock } from '@testing/mocks/facade/digital-debit-card.facade.mock';
import { ReactiveFormsModule } from '@angular/forms';

describe('DigitalDebitCardEditComponent', () => {
  let component: DigitalDebitCardEditComponent;
  let fixture: ComponentFixture<DigitalDebitCardEditComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
  const digitalDebitCardFacadeMock = new DigitalDebitCardFacadeMock();

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(DigitalDebitCardEditComponent, {
      add: {
        imports: [IonicModule, TestingModule, ReactiveFormsModule],
        providers: [
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: DigitalDebitCardFacade,
            useValue: digitalDebitCardFacadeMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [FormsAvvModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalDebitCardEditComponent);
    component = fixture.componentInstance;
    component.relativeParentId = faker.finance.account(20);
    component.card = new DigitalDebitCardFactory().digitalDebitCardDetail();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should editDigitalDebitCard', () => {
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    const editDigitalDebitCardSpy = spyOn(
      digitalDebitCardFacadeMock,
      'editDigitalDebitCard'
    );
    component.editDigitalDebitCard();
    expect(editDigitalDebitCardSpy).toHaveBeenCalled();
  });

  it('should call close modal', async () => {
    await component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should get nickName', () => {
    expect(component.nickName.value).toBeDefined();
  });

  it('should get amount', () => {
    expect(component.amount.value).toBeDefined();
  });
});
