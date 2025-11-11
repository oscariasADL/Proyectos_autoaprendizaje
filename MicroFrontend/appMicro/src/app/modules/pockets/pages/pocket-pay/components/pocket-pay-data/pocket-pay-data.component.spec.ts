import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { PocketPayDataComponent } from './pocket-pay-data.component';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { TestingModule } from '@testing/testing.module';
import { PocketFactory } from '@testing/factories/pocket.factory';
import { ProductFactory } from '@testing/factories/product.factory';

describe('PocketPayDataComponent', () => {
  let component: PocketPayDataComponent;
  let fixture: ComponentFixture<PocketPayDataComponent>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['back']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PocketPayDataComponent, ImageUrlPipe],
      imports: [TestingModule],
      providers: [{ provide: NavController, useValue: navCtrlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketPayDataComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      targetPocket: new FormControl(),
      amount: new FormControl()
    });
    component.pocketDetail = new PocketFactory().create();
    component.product = new ProductFactory().create();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call backPage', () => {
    component.backPage();
    expect(navCtrlSpy.back).toHaveBeenCalled();
  });

  it('should be defined detailItems', () => {
    expect(component.detailItems).toBeDefined();
  });

  it('should be defined amount', () => {
    expect(component.amount).toBeDefined();
  });
});
