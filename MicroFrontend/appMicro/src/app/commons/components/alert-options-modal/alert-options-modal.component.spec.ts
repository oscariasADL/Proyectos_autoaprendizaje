import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertOptionsModalComponent } from './alert-options-modal.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('AlertOptionsModalComponent', () => {
  let component: AlertOptionsModalComponent;
  let fixture: ComponentFixture<AlertOptionsModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(AlertOptionsModalComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [{ provide: ModalController, useValue: modalCtrlSpy }]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AlertOptionsModalComponent);
    component = fixture.componentInstance;
    component.title = '';
    component.options = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be to closeModal', () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
