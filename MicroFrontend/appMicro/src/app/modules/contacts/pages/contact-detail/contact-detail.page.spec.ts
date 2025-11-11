import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ContactDetailFacade } from '@modules/contacts/pages/contact-detail/contact-detail.facade';
import { ContactDetailFacadeMock } from '@testing/mocks/facade/contact-detail.facade.mock';

import { ContactDetailPage } from './contact-detail.page';

describe('ContactDetailPage', () => {
  let component: ContactDetailPage;
  let fixture: ComponentFixture<ContactDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailPage],
      imports: [IonicModule, RouterTestingModule],
      providers: [
        { provide: ContactDetailFacade, useClass: ContactDetailFacadeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
