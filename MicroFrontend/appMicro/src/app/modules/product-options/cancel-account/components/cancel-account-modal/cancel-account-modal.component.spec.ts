import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelAccountModalComponent } from './cancel-account-modal.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('CancelAccountModalComponent', () => {
  let component: CancelAccountModalComponent;
  let fixture: ComponentFixture<CancelAccountModalComponent>;
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CancelAccountModalComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelAccountModalComponent);
    component = fixture.componentInstance;
    component.hasDigitalDebitCard = false;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call closeModal()', async () => {
    expect(await component.closeModal()).toBe(void 0);
  });
});
