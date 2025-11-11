import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule } from '@ionic/angular';

import { ProductActionModalComponent } from './product-action-modal.component';
import { TestingModule } from '@testing/testing.module';

describe('ProductActionModalComponent', () => {
  let component: ProductActionModalComponent;
  let fixture: ComponentFixture<ProductActionModalComponent>;
  let modalSpy;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [ProductActionModalComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
  });

  it('should call closeModal', async () => {
    expect(component.closeModal(null)).toBeUndefined();
  });
});
