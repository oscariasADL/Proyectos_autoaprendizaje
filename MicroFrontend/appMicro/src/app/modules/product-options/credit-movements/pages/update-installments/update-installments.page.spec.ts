import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { ProductFactory } from '@testing/factories/product.factory';
import { CreditMovementsFacadeMock } from '@testing/mocks/facade/credit-movements.facade.mock';
import { GenericStepperMockModule } from '@testing/mocks/modules/generic-stepper-mock.module';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { CreditMovementsFacade } from '../../credit-movements.facade';
import { UpdateInstallmentsPage } from './update-installments.page';

describe('UpdateInstallmentsPage', () => {
  let component: UpdateInstallmentsPage;
  let fixture: ComponentFixture<UpdateInstallmentsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateInstallmentsPage],
      imports: [IonicModule, GenericStepperMockModule],
      providers: [
        {
          provide: CreditMovementsFacade,
          useClass: CreditMovementsFacadeMock
        },
        { provide: AlertService, useClass: AlertServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateInstallmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showInformation and updateInstallments', () => {
    component.creditMovements$.subscribe(([mov]) => {
      const { date, values } = mov;
      const [value] = values;
      component.movement.setValue(value);
      component.installments.setValue(3);
      component.form.get('fromProduct').setValue(new ProductFactory().create());
      expect(component.showInformation()).toBeTruthy();
      expect((component as any).updateInstallments()).toBeUndefined();
    });
  });
});
