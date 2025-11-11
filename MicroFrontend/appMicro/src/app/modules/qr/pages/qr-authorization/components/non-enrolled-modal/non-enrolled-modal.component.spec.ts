import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NonEnrolledModalComponent } from './non-enrolled-modal.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('NonEnrolledModalComponent', () => {
  let component: NonEnrolledModalComponent;
  let fixture: ComponentFixture<NonEnrolledModalComponent>;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;

  beforeEach(waitForAsync(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.configureTestingModule({
      declarations: [NonEnrolledModalComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [{ provide: ModalController, useValue: modalControllerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(NonEnrolledModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call closeModal', () => {
    component.closeModal();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });
});
