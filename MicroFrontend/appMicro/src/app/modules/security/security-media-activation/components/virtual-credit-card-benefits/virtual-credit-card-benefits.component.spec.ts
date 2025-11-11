import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { VirtualCreditCardBenefitsComponent } from './virtual-credit-card-benefits.component';

describe('VirtualCreditCardBenefitsComponent', () => {
  let component: VirtualCreditCardBenefitsComponent;
  let fixture: ComponentFixture<VirtualCreditCardBenefitsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualCreditCardBenefitsComponent],
      imports: [IonicModule, TestingModule],

      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualCreditCardBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
