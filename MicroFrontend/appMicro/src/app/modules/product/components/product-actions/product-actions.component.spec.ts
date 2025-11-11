import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { ProductDetailFactory } from '@testing/factories/product-detail.factory';
import { TestingModule } from '@testing/testing.module';
import { ProductActionsComponent } from './product-actions.component';

describe('ProductActionsComponent', () => {
  let component: ProductActionsComponent;
  let fixture: ComponentFixture<ProductActionsComponent>;
  let modalSpy;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [ProductActionsComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionsComponent);
    component = fixture.componentInstance;
    component.product = new ProductDetailFactory().create();
    component.productTypeDetailKey = null;
    component.ngOnChanges();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call moreActions', () => {
    modalSpy.onWillDismiss.and.callFake(async () => ({
      data: { action: null }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(component.moreActions()).toBeTruthy();
  });

  it('should call actionsTour', () => {
    modalSpy.onWillDismiss.and.callFake(async () => ({
      data: { action: null }
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    expect(component.actionsTour()).toBeTruthy();
  });
});
