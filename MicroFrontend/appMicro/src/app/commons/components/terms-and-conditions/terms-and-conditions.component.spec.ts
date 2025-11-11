import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { HeadersModule } from '@commons/components/headers/headers.module';

describe('TermsAndConditionsComponent', () => {
  let component: TermsAndConditionsComponent;
  let fixture: ComponentFixture<TermsAndConditionsComponent>;
  const modalCtrlMock = new ModalControllerMock();

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(TermsAndConditionsComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [{ provide: ModalController, useValue: modalCtrlMock }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
      remove: {
        imports: [HeadersModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal ', async () => {
    const dismissModalCtrlSpy = spyOn(modalCtrlMock, 'dismiss');
    await component.closeModal();
    expect(dismissModalCtrlSpy).toHaveBeenCalled();
  });
});
