import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { SpiTransferConsentComponent } from './spi-transfer-consent.component';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { TranslateModule } from '@ngx-translate/core';

describe('SpiTransferConsentComponent', () => {
  let component: SpiTransferConsentComponent;
  let fixture: ComponentFixture<SpiTransferConsentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(SpiTransferConsentComponent, {
      add: {
        imports: [
          IonicModule,
          ReactiveFormsModule,
          CommonModule,
          FormsModule,
          TestingModule
        ],
        providers: [
          { provide: ModalController, useValue: ModalControllerMock },
          { provide: AppFacade, useValue: AppFacadeMock }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(SpiTransferConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call modalCtrl.dismiss() when acceptConditions is called', async () => {
    spyOn(component['modalCtrl'], 'dismiss');

    component.isSpiConsentAccepted = true;
    await component.acceptConditions();

    expect(component['modalCtrl'].dismiss).toHaveBeenCalledWith(true);
  });

  it('should call modalCtrl.dismiss() with false when closeModal is called', async () => {
    spyOn(component['modalCtrl'], 'dismiss');

    await component.closeModal();

    expect(component['modalCtrl'].dismiss).toHaveBeenCalledWith(false);
  });

  it('should set isSpiConsentAccepted to true and hide terms and conditions', () => {
    component.isSpiConsentAccepted = false;
    component.showTermsAndConditions = true;

    component.acceptTerms();

    expect(component.isSpiConsentAccepted).toBeTrue();
    expect(component.showTermsAndConditions).toBeFalse();
  });

  it('should hide terms and conditions', () => {
    component.showTermsAndConditions = true;

    component.closeTermsInformation();

    expect(component.showTermsAndConditions).toBeFalse();
  });
});
