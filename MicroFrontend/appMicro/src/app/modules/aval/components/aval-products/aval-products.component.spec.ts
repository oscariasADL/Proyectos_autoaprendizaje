import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BANK_GROUP } from '@commons/constants/card.constants';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { AvalFacade } from '@modules/aval/aval.facade';
import {
  AVAL_PRODUCT_ICON,
  AVAL_PRODUCT_LABEL
} from '@modules/products/components/aval-products-panel/aval-products-panel.constants';
import { AvalFacadeMock } from '@testing/mocks/facade/aval.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { AvalProductsComponent } from './aval-products.component';

describe('AvalProductsComponent', () => {
  let component: AvalProductsComponent;
  let fixture: ComponentFixture<AvalProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvalProductsComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: AvalFacade,
          useClass: AvalFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { bank_code: BANK_GROUP.BOGOTA_CODE }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AvalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal', async () => {
    expect(component.closeModal()).toBeUndefined();
  });

  it('should call all gets', () => {
    component.avalProducts$.subscribe();
    expect(component.bankIcon).toEqual(AVAL_PRODUCT_ICON[component.bankCode]);
    expect(component.bankLabel).toEqual(AVAL_PRODUCT_LABEL[component.bankCode]);
    expect(component.isSpecialProduct).toBeFalse();
  });
});
