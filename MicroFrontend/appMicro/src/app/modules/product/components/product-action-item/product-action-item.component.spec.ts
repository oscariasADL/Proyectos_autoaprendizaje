import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { ProductActionType } from '../../entities/product-action.interface';
import { ProductActionItemComponent } from './product-action-item.component';

describe('ProductActionItemComponent', () => {
  let component: ProductActionItemComponent;
  let fixture: ComponentFixture<ProductActionItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductActionItemComponent, ImageUrlPipe],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionItemComponent);
    component = fixture.componentInstance;
    component.action = {
      type: ProductActionType.DebtPurchase,
      label: 'hello moto!',
      icon: 'billete.svg',
      id: '123'
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
