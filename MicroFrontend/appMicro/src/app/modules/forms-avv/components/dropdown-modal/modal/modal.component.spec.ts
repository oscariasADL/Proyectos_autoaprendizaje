import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';

describe('ModalComponent', () => {
  let modalCtrl: ModalController;
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [IonicModule, TestingModule],
      providers: [{ provide: ModalController, useClass: ModalControllerMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    modalCtrl = TestBed.inject(ModalController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal and return item selected', () => {
    spyOn(modalCtrl, 'dismiss');
    component.onItemSelect(0);
    expect(modalCtrl.dismiss).toHaveBeenCalledWith(0, 'selected');
  });

  it('should close modal and return null', async () => {
    spyOn(modalCtrl, 'dismiss');
    await component.closeModal();
    expect(modalCtrl.dismiss).toHaveBeenCalledWith(null, 'close');
  });
});
