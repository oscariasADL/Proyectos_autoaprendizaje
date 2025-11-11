import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivateVirtualCreditCardConfirmComponent } from './activate-virtual-credit-card-confirm.component';
import { TestingModule } from '@testing/testing.module';
import { FormControl, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActivateVirtualCreditCardInfoComponent', () => {
  let component: ActivateVirtualCreditCardConfirmComponent;
  let fixture: ComponentFixture<ActivateVirtualCreditCardConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateVirtualCreditCardConfirmComponent],
      imports: [TestingModule, IonicModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(
      ActivateVirtualCreditCardConfirmComponent
    );
    component = fixture.componentInstance;
    component.form = new FormGroup({
      amount: new FormControl(null)
    }) as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined amount control', () => {
    expect(component.amount).toBeDefined();
  });
});
