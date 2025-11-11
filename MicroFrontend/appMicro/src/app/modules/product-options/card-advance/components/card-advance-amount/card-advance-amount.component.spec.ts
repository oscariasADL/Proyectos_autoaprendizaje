import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { CardAdvanceAmountComponent } from './card-advance-amount.component';

describe('CardAdvanceAmountComponent', () => {
  let component: CardAdvanceAmountComponent;
  let fixture: ComponentFixture<CardAdvanceAmountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardAdvanceAmountComponent],
      imports: [TestingModule, IonicModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardAdvanceAmountComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormBuilder().group({
      amount: null,
      installments: null
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
