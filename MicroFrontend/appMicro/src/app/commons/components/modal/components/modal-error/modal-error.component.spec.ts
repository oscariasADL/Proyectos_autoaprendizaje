import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalErrorComponent } from './modal-error.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@app/commons/controllers/modal.controller';

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let fixture: ComponentFixture<ModalErrorComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(ModalErrorComponent, {
      add: {
        imports: [TestingModule],
        providers: [{ provide: ModalController, useValue: modalCtrlSpy }]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ModalErrorComponent);
    component = fixture.componentInstance;
    component.id = 'modal-error';
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
