import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { ContactFactory } from '@testing/factories/contact.factory';
import { TransfersContactsFacadeMock } from '@testing/mocks/facade/transfers-contacts.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { TransferContactsProductsComponent } from './transfer-contacts-products.component';

describe('TransferContactsProductsComponent', () => {
  let component: TransferContactsProductsComponent;
  let fixture: ComponentFixture<TransferContactsProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransferContactsProductsComponent,
        CapitalizePipe,
        ImageUrlPipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: TransfersContactsFacade,
          useClass: TransfersContactsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferContactsProductsComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      amount: new UntypedFormControl(),
      transferType: new UntypedFormControl(),
      contactProduct: new UntypedFormControl(),
      contact: new UntypedFormControl({
        identificationData: { id: '', idType: '' }
      })
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectContactProduct and selectPhoneNumber', () => {
    spyOn(component.continueSlide, 'emit');
    const product = new ContactFactory().createContactProduct();
    component.selectContactProduct(product);
    expect(component.contactProduct.value.id).toEqual(product.id);
    component.selectPhoneNumber();
    component.editContactSelected();
    expect(component.continueSlide.emit).toHaveBeenCalled();
  });

  it('should call all gets', () => {
    expect(component.exceedsTransferToPhoneMax).toBeFalse();
    expect(component.transferLessMinimum).toBeTrue();
  });

  it('should showPopover', () => {
    expect(component.showPopover).toBeDefined();
  });
});
