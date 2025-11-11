import { TitleCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import { ContactFactory } from '@testing/factories/contact.factory';
import { ProductFactory } from '@testing/factories/product.factory';
import { TransfersContactsFacadeMock } from '@testing/mocks/facade/transfers-contacts.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { TransferContactsTowardComponent } from './transfer-contacts-toward.component';

describe('TransferContactsTowardComponent', () => {
  let component: TransferContactsTowardComponent;
  let fixture: ComponentFixture<TransferContactsTowardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TransferContactsTowardComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        TitleCasePipe,
        {
          provide: TransfersContactsFacade,
          useClass: TransfersContactsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferContactsTowardComponent);
    component = fixture.componentInstance;
    component.form = new UntypedFormGroup({
      amount: new UntypedFormControl(),
      contact: new UntypedFormControl(),
      transferType: new UntypedFormControl(),
      fromProduct: new UntypedFormControl()
    });
    component.fromProduct.setValue(new ProductFactory().create());
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be select a contact', () => {
    const contact = new ContactFactory().create();
    expect(
      component.selectContact({ ...contact, isFake: true })
    ).toBeUndefined();
    spyOn(component.continueSlide, 'emit');
    component.selectContact({ ...contact, isFake: false });
    expect(component.continueSlide.emit).toHaveBeenCalled();
  });

  it('should call listenSearch', () => {
    component.contactsFiltered$.subscribe();
    component.contactsWorking$.subscribe();
    component.basicData$.subscribe();
    const keyWord = 'tales';
    component.listenSearch(keyWord);
    expect(component.keyWord).toEqual(keyWord);
  });
});
