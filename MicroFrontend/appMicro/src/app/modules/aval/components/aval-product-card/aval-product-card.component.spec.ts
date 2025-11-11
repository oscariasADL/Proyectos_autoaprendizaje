import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { AvalProductCardComponent } from './aval-product-card.component';

describe('AvalProductCardComponent', () => {
  let component: AvalProductCardComponent;
  let fixture: ComponentFixture<AvalProductCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvalProductCardComponent, CurrencyFormatPipe],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AvalProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should equals false, isActive: boolean = false;', () => {
    expect(component.isActive).toBeFalse();
  });

  it('should toggle to active', () => {
    component.product = {
      icon: '',
      title: '',
      description: '',
      amount: 100,
      items: [
        {
          label: 'Item'
        }
      ],
      bankCode: '0052'
    };
    component.toggle(true);
    expect(component.isActive).toBeTrue();

    component.toggle();
    expect(component.isActive).toBeFalse();

    component.product = null;
    expect(component.toggle()).toBeUndefined();
  });
});
