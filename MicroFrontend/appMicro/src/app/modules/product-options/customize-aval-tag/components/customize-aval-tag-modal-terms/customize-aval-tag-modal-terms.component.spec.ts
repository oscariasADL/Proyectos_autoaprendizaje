import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomizeAvalTagModalTermsComponent } from './customize-aval-tag-modal-terms.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { SafeHtmlPipe } from '@commons/pipes/safe-html.pipe';

describe('CustomizeAvalTagModalTermsComponent', () => {
  let component: CustomizeAvalTagModalTermsComponent;
  let fixture: ComponentFixture<CustomizeAvalTagModalTermsComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomizeAvalTagModalTermsComponent,
        ImageUrlPipe,
        SafeHtmlPipe
      ],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeAvalTagModalTermsComponent);
    component = fixture.componentInstance;
    component.termsAndConditions = {
      id: '',
      title: '',
      content: ''
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call closeModal', () => {
    expect(component.closeModal()).toBe(void 0);
  });
});
