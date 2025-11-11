import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivateDigitalDebitCardConfigComponent } from './activate-digital-debit-card-config.component';
import { TestingModule } from '@testing/testing.module';
import { ActivateDigitalDebitCardForm } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { Product } from '@commons/entities/product/product.interface';

describe('ActivateDigitalDebitCardConfigComponent', () => {
  let component: ActivateDigitalDebitCardConfigComponent;
  let fixture: ComponentFixture<ActivateDigitalDebitCardConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateDigitalDebitCardConfigComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateDigitalDebitCardConfigComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup<ActivateDigitalDebitCardForm>({
      productOrigin: new FormControl({ id: '872376263' }),
      amount: new FormControl<string>(''),
      nickName: new FormControl<string>('')
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be call selectProduct', () => {
    const product: Product = { id: '23232323' };
    component.selectProduct(product);
    expect(component.form.get('productOrigin').value.id).toEqual('23232323');
  });
});
