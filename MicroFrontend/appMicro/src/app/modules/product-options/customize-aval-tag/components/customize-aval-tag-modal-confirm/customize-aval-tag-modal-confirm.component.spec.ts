import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomizeAvalTagModalConfirmComponent } from './customize-aval-tag-modal-confirm.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { CommonsModule } from '@app/commons/commons.module';

describe('CustomizeAvalTagConfirmComponent', () => {
  let component: CustomizeAvalTagModalConfirmComponent;
  let fixture: ComponentFixture<CustomizeAvalTagModalConfirmComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(CustomizeAvalTagModalConfirmComponent, {
      add: {
        imports: [TestingModule],
        providers: [
          {
            provide: ModalController,
            useValue: modalCtrlSpy
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      },
      remove: {
        imports: [CommonsModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeAvalTagModalConfirmComponent);
    component = fixture.componentInstance;
    component.id = 'customize-aval-tag-modal-confirm';
    component.avalTag = '@SARMIENTO';
    component.product = 'Cta. Ahorros 123456';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call closeModal', () => {
    component.closeModal(true);
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
