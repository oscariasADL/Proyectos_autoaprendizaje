import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UpdateInstallmentsListComponent } from './update-installments-list.component';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { CreditMovementFactory } from '@testing/factories/credit-movements.factory';
import { TestingModule } from '@testing/testing.module';

describe('UpdateInstallmentsListComponent', () => {
  let component: UpdateInstallmentsListComponent;
  let fixture: ComponentFixture<UpdateInstallmentsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateInstallmentsListComponent],
      imports: [TestingModule, IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateInstallmentsListComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select movement', () => {
    const movement: CreditMovement = new CreditMovementFactory().create();
    component.selectMovement(movement);
    expect(component.control.value).toEqual(movement);
  });
});
