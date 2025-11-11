import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { ProductDetailMovementsComponent } from './product-detail-movements.component';
import { FilterMove } from '@commons/entities/product/movement.interface';
import { TypeAccount } from '@commons/entities/product/type-account';

describe('ProductDetailMovementsComponent', () => {
  let component: ProductDetailMovementsComponent;
  let fixture: ComponentFixture<ProductDetailMovementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailMovementsComponent, ImageUrlPipe],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnchanges', () => {
    component.movements = [
      {
        category: '',
        date: '2024-08-03T01:24:08.000Z' as any,
        description: '',
        icon: '',
        instalmentsPaid: '',
        numberProduct: '',
        rate: '',
        state: FilterMove.All,
        totalInstalments: '',
        typeAccount: TypeAccount.CCA,
        typeName: '',
        valueMove: '30000',
        invoiceNumber: '',
        note: ''
      }
    ];
    component.ngOnChanges({
      movements: new SimpleChange(null, component.movements, true)
    });
    fixture.detectChanges();
    expect(component.groupedMovements?.length).toBeGreaterThan(0);
  });
});
