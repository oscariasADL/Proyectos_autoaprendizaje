import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransfersContactsFacadeMock } from '@testing/mocks/facade/transfers-contacts.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { TransferContactsOwnComponent } from './transfer-contacts-own.component';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('TransferContactsOwnComponent', () => {
  let component: TransferContactsOwnComponent;
  let fixture: ComponentFixture<TransferContactsOwnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransferContactsOwnComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: TransfersContactsFacade,
          useClass: TransfersContactsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferContactsOwnComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      fromProduct: new UntypedFormControl(new ProductFactory().create()),
      ownProduct: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectOwnProduct', () => {
    spyOn(component.continue, 'emit');
    component.selectOwnProduct(new ProductFactory().create());
    expect(component.continue.emit).toHaveBeenCalled();
  });
});
