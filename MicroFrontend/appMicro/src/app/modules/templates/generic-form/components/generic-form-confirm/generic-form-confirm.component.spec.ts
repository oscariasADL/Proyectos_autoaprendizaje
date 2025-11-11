import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { GenericFormConfirmComponent } from './generic-form-confirm.component';

describe('GenericFormConfirmComponent', () => {
  let component: GenericFormConfirmComponent;
  let fixture: ComponentFixture<GenericFormConfirmComponent>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.configureTestingModule({
      declarations: [GenericFormConfirmComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [{ provide: ModalController, useValue: modalCtrlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericFormConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal', async () => {
    expect(component.closeModal()).toBeUndefined();
  });
});
