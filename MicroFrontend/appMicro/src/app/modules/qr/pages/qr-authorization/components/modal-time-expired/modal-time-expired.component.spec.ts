import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTimeExpiredComponent } from './modal-time-expired.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('ModalTimeExpiredComponent', () => {
  let component: ModalTimeExpiredComponent;
  let fixture: ComponentFixture<ModalTimeExpiredComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(ModalTimeExpiredComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [{ provide: ModalController, useValue: modalCtrlSpy }]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTimeExpiredComponent);
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
