import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { HighlightPipe } from '@commons/pipes/highlight.pipe';
import { IonicModule } from '@ionic/angular';
import { ContactFactory } from '@testing/factories/contact.factory';
import { TestingModule } from '@testing/testing.module';

import { ContactItemComponent } from './contact-item.component';
import { StatusType } from '../../entities/contact.interface';

describe('ContactItemComponent', () => {
  let component: ContactItemComponent;
  let fixture: ComponentFixture<ContactItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContactItemComponent, HighlightPipe, CapitalizePipe],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create fake contact', () => {
    const contact = new ContactFactory().create();
    component.contact = { ...contact, isFake: true, status: StatusType.ACTIVE };
    component.keyWord = 'pepi';
    fixture.detectChanges();
    expect(component.contact?.status).toBeDefined();
    expect(component).toBeTruthy();
    expect(component.myId).toEqual('fake');
    expect(component.contactLetter).toEqual(
      contact.nickname.slice(0, 1).toUpperCase()
    );
  });

  it('should create not fake contact', () => {
    const contact = new ContactFactory().create();
    component.contact = { ...contact, isFake: false, status: StatusType.BLOCK };
    fixture.detectChanges();
    expect(component.myId).not.toEqual('fake');
    expect(component.contact.status).toBeDefined();
    expect(component.contactLetter).toEqual(
      contact.name.slice(0, 1).toUpperCase()
    );
  });

  it('should showPopover', () => {
    expect(component.showPopover).toBeDefined();
  });
});
