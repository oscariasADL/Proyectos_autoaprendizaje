import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, BehaviorSubject } from 'rxjs';
import { ContactsFormComponent } from './contacts-form.component';
import { ContactListFacade } from '@app/modules/contacts/pages/contact-list/contact-list.facade';
import { TransfersContactsFacade } from '@app/modules/transfers/pages/transfers-contacts/transfers-contacts.facade';
import {
  Contact,
  ContactProduct,
  StatusType,
  StatusTypeProduct
} from '@app/modules/contacts/entities/contact.interface';
import {
  ContactProductActionType,
  TYPE_ACCOUNT_TRANSFER_ACCOUNTS
} from '@app/modules/contacts/entities/contact-product.interface';
import { UTAG_FOR_ADD_FAVORITE_CONTACTS } from '@app/modules/favorites/pages/constants/add-to-favorites.constants';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestingModule } from '@testing/testing.module';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';

describe('ContactsFormComponent', () => {
  let component: ContactsFormComponent;
  let fixture: ComponentFixture<ContactsFormComponent>;
  let mockContactListFacade: jasmine.SpyObj<ContactListFacade>;
  let mockTransfersContactsFacade: jasmine.SpyObj<TransfersContactsFacade>;

  const mockContact: Contact = {
    name: 'John Doe',
    nickname: 'Johnny',
    phoneNumber: '1234567890',
    email: 'john@example.com',
    status: StatusType.ACTIVE,
    identificationData: {
      id: '12345678',
      idType: 'CC'
    }
  };

  const mockContactProducts: ContactProduct[] = [
    {
      alias: 'Cuenta Ahorros',
      type: { id: TypeAccount.SDA, name: 'Cuenta de Ahorros' },
      number: '1234567890',
      bank: { name: 'Test Bank', id: '001' },
      status: StatusTypeProduct.ACTIVE,
      action: ContactProductActionType.transfer
    },
    {
      alias: 'Cuenta Corriente',
      type: { id: TypeAccount.DDA, name: 'Cuenta Corriente' },
      number: '0987654321',
      bank: { name: 'Test Bank', id: '001' },
      status: StatusTypeProduct.ACTIVE,
      action: ContactProductActionType.transfer
    },
    {
      alias: 'Tarjeta Crédito',
      type: { id: TypeAccount.CCA, name: 'Tarjeta de Crédito' },
      number: '1111222233334444',
      bank: { name: 'Test Bank', id: '001' },
      status: StatusTypeProduct.ACTIVE,
      action: ContactProductActionType.payment
    }
  ];

  const mockFormGroup = new FormGroup({
    favoriteName: new FormControl('Test Favorite')
  });

  beforeEach(async () => {
    mockContactListFacade = jasmine.createSpyObj(
      'ContactListFacade',
      ['setContactFilter', 'enableLoading', 'disableLoading'],
      {
        filter$: of(''),
        contacts$: of([mockContact])
      }
    );

    mockTransfersContactsFacade = jasmine.createSpyObj(
      'TransfersContactsFacade',
      ['fetchContacts', 'fetchContactProducts'],
      {
        contactProducts$: of(mockContactProducts)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ContactsFormComponent],
      imports: [TestingModule, IonicModule, ReactiveFormsModule],
      providers: [
        { provide: ContactListFacade, useValue: mockContactListFacade },
        {
          provide: TransfersContactsFacade,
          useValue: mockTransfersContactsFacade
        },

        provideMockStore({
          initialState: {
            contactListState: {
              working: false
            }
          }
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;
    component.form = mockFormGroup;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize utagForContacts correctly', () => {
      expect(component.utagForContacts).toEqual(UTAG_FOR_ADD_FAVORITE_CONTACTS);
    });

    it('should call fetchContacts on init', () => {
      expect(mockTransfersContactsFacade.fetchContacts).toHaveBeenCalled();
    });

    it('should initialize contact as undefined', () => {
      expect(component.contact).toBeUndefined();
    });
  });

  describe('Getters', () => {
    it('should return filter$ observable', () => {
      expect(component.filter$).toBe(mockContactListFacade.filter$);
    });

    it('should return contacts$ observable', (done) => {
      component.contacts$.subscribe((contacts) => {
        expect(contacts).toEqual([mockContact]);
        done();
      });
    });

    it('should return favoriteName form control', () => {
      expect(component.favoriteName).toBe(mockFormGroup.get('favoriteName'));
    });

    it('should return null if favoriteName control does not exist', () => {
      component.form = new FormGroup({});
      expect(component.favoriteName).toBeNull();
    });
  });

  describe('setContactFilter', () => {
    it('should reset contact and call facade method', () => {
      component.contact = mockContact;
      component.setContactFilter('John');
      expect(component.contact).toBeNull();
      expect(mockContactListFacade.setContactFilter).toHaveBeenCalledWith(
        'John'
      );
    });

    it('should handle empty string filter', () => {
      component.contact = mockContact;
      component.setContactFilter('');
      expect(component.contact).toBeNull();
      expect(mockContactListFacade.setContactFilter).toHaveBeenCalledWith('');
    });
  });

  describe('getContactInfo', () => {
    it('should set contact and fetch products', () => {
      component.getContactInfo(mockContact);
      expect(component.contact).toBe(mockContact);
      expect(
        mockTransfersContactsFacade.fetchContactProducts
      ).toHaveBeenCalledWith({
        id: '12345678',
        idType: 'CC'
      });
    });

    it('should throw error if identificationData is missing', () => {
      const invalidContact = {
        name: 'Test',
        identificationData: undefined
      } as Contact;
      expect(() => component.getContactInfo(invalidContact)).toThrow();
    });
  });

  describe('contactProducts$', () => {
    it('should filter only transfer account types', (done) => {
      const expected = mockContactProducts.filter((p) =>
        TYPE_ACCOUNT_TRANSFER_ACCOUNTS.includes(p.type.id)
      );

      component.contactProducts$.subscribe((products) => {
        expect(products).toEqual(expected);
        expect(products.length).toBe(2);
        done();
      });
    });
  });

  describe('Form Integration', () => {
    it('should update favoriteName value', () => {
      const newValue = 'Nuevo Favorito';
      component.form.get('favoriteName')?.setValue(newValue);
      expect(component.favoriteName?.value).toBe(newValue);
    });

    it('should validate favoriteName control', () => {
      component.form.get('favoriteName')?.setValue('');
      expect(component.favoriteName?.valid).toBeTrue();
    });
  });

  describe('Observable Integration', () => {
    it('should react to filter$ changes', (done) => {
      const filterSubject = new BehaviorSubject('');
      Object.defineProperty(mockContactListFacade, 'filter$', {
        get: () => filterSubject.asObservable()
      });

      component.filter$.subscribe((value) => {
        if (value === 'nuevo') {
          expect(value).toBe('nuevo');
          done();
        }
      });

      filterSubject.next('nuevo');
    });
  });

  describe('Integration Tests', () => {
    it('should complete contact selection workflow', (done) => {
      component.setContactFilter('John');
      expect(mockContactListFacade.setContactFilter).toHaveBeenCalledWith(
        'John'
      );
      expect(component.contact).toBeNull();

      component.getContactInfo(mockContact);
      expect(component.contact).toBe(mockContact);
      expect(
        mockTransfersContactsFacade.fetchContactProducts
      ).toHaveBeenCalledWith({
        id: '12345678',
        idType: 'CC'
      });

      component.contactProducts$.subscribe((products) => {
        expect(products.length).toBe(2);
        expect(
          products.every((p) =>
            TYPE_ACCOUNT_TRANSFER_ACCOUNTS.includes(p.type.id)
          )
        ).toBeTrue();
        done();
      });
    });
  });
});
