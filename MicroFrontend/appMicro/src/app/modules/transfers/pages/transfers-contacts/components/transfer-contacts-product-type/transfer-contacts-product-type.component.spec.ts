import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TransferType } from '@modules/transfers/entities/transfers.interface';
import { IonicModule } from '@ionic/angular';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { TransfersContactsFacadeMock } from '@testing/mocks/facade/transfers-contacts.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { TransferContactsProductTypeComponent } from './transfer-contacts-product-type.component';

describe('TransferContactsProductTypeComponent', () => {
  let component: TransferContactsProductTypeComponent;
  let fixture: ComponentFixture<TransferContactsProductTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransferContactsProductTypeComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: TransfersContactsFacade,
          useClass: TransfersContactsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferContactsProductTypeComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      amount: new UntypedFormControl(),
      transferType: new UntypedFormControl()
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
