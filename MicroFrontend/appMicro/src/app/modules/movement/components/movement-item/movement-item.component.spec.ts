import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FilterMove,
  Movement
} from '@commons/entities/product/movement.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { TestingModule } from '@testing/testing.module';
import { MovementItemComponent } from './movement-item.component';
import { NumberFormatPipe } from '@commons/pipes/number-format.pipe';

describe('MovementItemComponent', () => {
  let movement: Movement;
  let component: MovementItemComponent;
  let fixture: ComponentFixture<MovementItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovementItemComponent,
        CapitalizePipe,
        CurrencyFormatPipe,
        NumberFormatPipe
      ],
      imports: [TestingModule],
      providers: [CurrencyPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MovementItemComponent);
    movement = {
      category: '',
      date: new Date(),
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
    };
    component = fixture.componentInstance;
    component.movement = movement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
