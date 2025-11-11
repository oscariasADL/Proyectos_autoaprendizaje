import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { PocketTransferDataComponent } from './pocket-transfer-data.component';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PocketTransferType } from '@modules/pockets/pages/pocket-transfer/constants/pocket-transfer.constants';
import { FormControl, FormGroup } from '@angular/forms';
import { PocketFactory } from '@testing/factories/pocket.factory';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('PocketTransferDataComponent', () => {
  let component: PocketTransferDataComponent;
  let fixture: ComponentFixture<PocketTransferDataComponent>;
  const navCtrlSpy = jasmine.createSpyObj<NavController>(['back']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PocketTransferDataComponent, ImageUrlPipe],
      imports: [TestingModule],
      providers: [{ provide: NavController, useValue: navCtrlSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketTransferDataComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      targetPocket: new FormControl(),
      amount: new FormControl()
    });
    component.pocketDetail = new PocketFactory().create();
    component.pockets = new PocketFactory().createBulk(3);
    component.isPocketProfitability = true;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be changeActiveTransferType', () => {
    const mytype = PocketTransferType.otherPocket;
    component.changeActiveTransferType(mytype);
    expect(component.activeTransferType).toEqual(mytype);
  });

  it('should to call backPage', () => {
    component.backPage();
    expect(navCtrlSpy.back).toHaveBeenCalled();
  });

  it('should be defined detailItems', () => {
    expect(component.detailItems).toBeDefined();
  });

  it('should be defined and length 3 pocketsAllowed', () => {
    expect(component.pocketsAllowed).toBeDefined();
  });

  it('should be defined and length 3 pocketsAllowedList', () => {
    expect(component.pocketsAllowedList).toBeDefined();
  });

  it('should be defined pocketTransferType', () => {
    expect(component.pocketTransferType).toBeDefined();
  });
  it('should be defined notificationType', () => {
    expect(component.notificationType).toBeDefined();
  });

  it('should be defined targetPocket', () => {
    expect(component.targetPocket).toBeDefined();
  });

  it('should be defined amount', () => {
    expect(component.amount).toBeDefined();
  });
});
