import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule, NavController } from '@ionic/angular';
import { ContactListFacade } from '@modules/contacts/pages/contact-list/contact-list.facade';
import { ContactFactory } from '@testing/factories/contact.factory';
import { ContactListFacadeMock } from '@testing/mocks/facade/contact-list.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ContactListPage } from './contact-list.page';

describe('ContactListPage', () => {
  let component: ContactListPage;
  let fixture: ComponentFixture<ContactListPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    TestBed.configureTestingModule({
      declarations: [ContactListPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: ContactListFacade,
          useClass: ContactListFacadeMock
        },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirectToContactDetail', () => {
    expect(
      component.redirectToContactDetail(new ContactFactory().create())
    ).toBeUndefined();
  });

  it('should call redirectToContactDetail', () => {
    expect(
      component.redirectToContactDetail(new ContactFactory().create())
    ).toBeUndefined();
  });

  it('should call setContactFilter', () => {
    component.filter$.subscribe();
    component.contacts$.subscribe();
    expect(component.setContactFilter('Pepito')).toBeUndefined();
  });
});
