import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { IonicModule, Platform } from '@ionic/angular';
import { ContactFactory } from '@testing/factories/contact.factory';
import { TestingModule } from '@testing/testing.module';
import { of } from 'rxjs';
import { CellPhoneContactsComponent } from './cell-phone-contacts.component';
import { AVV_CONTACTS_TAB } from './entities/cell-phone-contacts.entities';

describe('CellPhoneContactsComponent', () => {
  let component: CellPhoneContactsComponent;
  let fixture: ComponentFixture<CellPhoneContactsComponent>;
  let modalCtrlSpy, platformReadySpy, platformSpy, backButton;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    platformReadySpy = Promise.resolve();
    backButton = {
      subscribeWithPriority: (priority, fn) => {
        fn();
      }
    };
    platformSpy = jasmine.createSpyObj(
      'Platform',
      {
        ready: platformReadySpy,
        backButton: platformReadySpy
      },
      { backButton }
    );
    TestBed.configureTestingModule({
      declarations: [CellPhoneContactsComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CellPhoneContactsComponent);
    component = fixture.componentInstance;
    component.avvContacts$ = of(new ContactFactory().createBulk(3));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectCellPhoneContacts', () => {
    expect(component.selectCellPhoneContacts(null)).toBeUndefined();
  });

  it('should call selectContactFromAVV and closeClick', async () => {
    component.closeClick();
    component.avvContactsFiltered$.subscribe(([contact]) => {
      expect(component.selectContactFromAVV(contact)).toBeUndefined();
      expect(component.AVV_CONTACTS_TAB.AVV).toEqual(AVV_CONTACTS_TAB.AVV);
    });
  });
});
