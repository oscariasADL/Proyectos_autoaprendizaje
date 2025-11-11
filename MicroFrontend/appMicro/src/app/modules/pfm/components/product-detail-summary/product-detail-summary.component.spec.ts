import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductDetailSummaryComponent } from './product-detail-summary.component';
import { TestingModule } from '@testing/testing.module';

describe('ProductDetailSummaryComponent', () => {
  let component: ProductDetailSummaryComponent;
  let fixture: ComponentFixture<ProductDetailSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailSummaryComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailSummaryComponent);
    component = fixture.componentInstance;
    component.balancesSummary = [
      {
        accountNumber: '518500000000999',
        idProduct: '3',
        type: 'CA',
        incomes: 1550000.22,
        expenses: -445000,
        balance: 1105000.22,
        previousBalance: 0,
        overdraft: 0,
        totalIncomes: 1550000.22
      }
    ];
    component.balancesWorking = false;
    component.balancesCompleted = true;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle PFM summary', () => {
    component.isPFMSummaryOpened = false;
    component.togglePFMSummaryOpened();
    expect(component.isPFMSummaryOpened).toBeTruthy();
  });

  it('should be call balancesSummaryOne and return PFMBalance', () => {
    expect(component.balancesSummaryOne).not.toBeNull();
  });

  it('should be call currentMonth and return string value', () => {
    expect(component.currentMonth).toBeDefined();
  });
});
