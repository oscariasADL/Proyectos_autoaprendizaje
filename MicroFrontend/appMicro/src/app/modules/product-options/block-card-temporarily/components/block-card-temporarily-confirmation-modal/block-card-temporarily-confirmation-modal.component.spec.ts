import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockCardTemporarilyConfirmationModalComponent } from './block-card-temporarily-confirmation-modal.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';

describe('BlockCardTemporarilyConfirmationModalComponent', () => {
  let component: BlockCardTemporarilyConfirmationModalComponent;
  let fixture: ComponentFixture<BlockCardTemporarilyConfirmationModalComponent>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.overrideComponent(BlockCardTemporarilyConfirmationModalComponent, {
      add: {
        imports: [IonicModule, TestingModule],
        providers: [{ provide: ModalController, useValue: modalCtrlSpy }]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(
      BlockCardTemporarilyConfirmationModalComponent
    );
    component = fixture.componentInstance;
    component.confirmationModalContent = {
      icon: 'icons/block-card.svg',
      title: '',
      description: '',
      confirmButtonText: '',
      cancelButtonText: ''
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call to closeModal', async () => {
    await component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
