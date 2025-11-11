import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtualCreditCardEditComponent } from './virtual-credit-card-edit.component';
import { TestingModule } from '@testing/testing.module';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { VirtualCreditCardOperationPayload } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { CommonsModule } from '@app/commons/commons.module';

describe('VirtualCreditCardEditComponent', () => {
  let component: VirtualCreditCardEditComponent;
  let fixture: ComponentFixture<VirtualCreditCardEditComponent>;
  let virtualCreditCardFacadeStub: Partial<VirtualCreditCardFacade>;
  let modalCtrlSpy;

  beforeEach(() => {
    virtualCreditCardFacadeStub = {
      creditLimit$: of(900000),
      boundsByKey(key: string, parse: boolean = true): number {
        return 0;
      },
      boundsValue(key: ParameterKey): { value: string } {
        return { value: '0' };
      },
      editVirtualCreditCard: jasmine.createSpy('editVirtualCreditCard') // 👈 aquí está la solución
    };

    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

    TestBed.overrideComponent(VirtualCreditCardEditComponent, {
      add: {
        imports: [IonicModule, TestingModule, ReactiveFormsModule],
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

    fixture = TestBed.createComponent(VirtualCreditCardEditComponent);
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call editDigitalDebitCard', () => {
    spyOnProperty(component.form, 'valid').and.returnValue(true);
    component.editVirtualCreditCard();
    expect(
      virtualCreditCardFacadeStub.editVirtualCreditCard
    ).toHaveBeenCalled();
  });

  it('should to call to closeModal', () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should creditLimit$ defined', () => {
    expect(component.creditLimit$).toBeDefined();
  });

  it('should nickName defined', () => {
    expect(component.nickName).toBeDefined();
  });

  it('should amount defined', () => {
    expect(component.amount).toBeDefined();
  });
});
