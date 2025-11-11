import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomizeAvalTagModalErrorComponent } from './customize-aval-tag-modal-error.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('CustomizeAvalTagModalErrorComponent', () => {
  let component: CustomizeAvalTagModalErrorComponent;
  let fixture: ComponentFixture<CustomizeAvalTagModalErrorComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(CustomizeAvalTagModalErrorComponent, {
      add: {
        imports: [TestingModule],
        providers: [
          {
            provide: ModalController,
            useValue: modalCtrlSpy
          }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeAvalTagModalErrorComponent);
    component = fixture.componentInstance;
    component.avalTag = '@AVVJCP626';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal', async () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
