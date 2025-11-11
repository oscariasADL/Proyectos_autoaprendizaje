import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollAdvanceTermsConditionsModalComponent } from './payroll-advance-terms-conditions-modal.component';
import { TestingModule } from '@testing/testing.module';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AppFacade } from '@app/app.facade';
import { ModalController } from '@commons/controllers/modal.controller';

describe('PayrollAdvanceTermsConditionsModalComponent', () => {
  let component: PayrollAdvanceTermsConditionsModalComponent;
  let fixture: ComponentFixture<PayrollAdvanceTermsConditionsModalComponent>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    const modalSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    modalSpy.dismiss.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [
        PayrollAdvanceTermsConditionsModalComponent,
        IonicModule,
        TestingModule
      ],
      providers: [
        { provide: ModalController, useValue: modalSpy },
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      PayrollAdvanceTermsConditionsModalComponent
    );
    component = fixture.componentInstance;
    modalCtrlSpy = TestBed.inject(
      ModalController
    ) as jasmine.SpyObj<ModalController>;
    fixture.detectChanges();
  });

  describe('closeModal', () => {
    beforeEach(() => {
      modalCtrlSpy.dismiss.calls.reset();
    });

    it('should call modalCtrl.dismiss with default value (false)', async () => {
      await component.closeModal();
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(false);
    });

    it('should call modalCtrl.dismiss with "true" when true', async () => {
      await component.closeModal(true);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(true);
    });

    it('should call modalCtrl.dismiss with "false" when false', async () => {
      await component.closeModal(false);
      expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith(false);
    });

    it('should return a promise', () => {
      expect(component.closeModal()).toBeInstanceOf(Promise);
    });
  });
});
