import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTimeExpiredSameDeviceComponent } from './modal-time-expired-same-device.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('ModalTimeExpiredComponent', () => {
  let component: ModalTimeExpiredSameDeviceComponent;
  let fixture: ComponentFixture<ModalTimeExpiredSameDeviceComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(ModalTimeExpiredSameDeviceComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [{ provide: ModalController, useValue: modalCtrlSpy }]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTimeExpiredSameDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call to closeModal', () => {
    spyOn(component, 'closeModal').and.callThrough();
    component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });
});
