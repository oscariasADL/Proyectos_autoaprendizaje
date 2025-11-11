import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TestingModule } from '@testing/testing.module';
import { ActivateVirtualCreditCardConfigComponent } from './activate-virtual-credit-card-config.component';
import { CommonsModule } from '@app/commons/commons.module';

describe('ActivateVirtualCreditCardConfigComponent', () => {
  let component: ActivateVirtualCreditCardConfigComponent;
  let fixture: ComponentFixture<ActivateVirtualCreditCardConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateVirtualCreditCardConfigComponent],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateVirtualCreditCardConfigComponent);
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
