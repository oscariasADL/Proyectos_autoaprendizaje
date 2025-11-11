import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { QrPayInstallmentsComponent } from './qr-pay-installments.component';

describe('QrPayInstallmentsComponent', () => {
  let component: QrPayInstallmentsComponent;
  let fixture: ComponentFixture<QrPayInstallmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QrPayInstallmentsComponent],
      imports: [IonicModule, TestingModule, FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(QrPayInstallmentsComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      installments: new UntypedFormControl(),
      fromProduct: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
