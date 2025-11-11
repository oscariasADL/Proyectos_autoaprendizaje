import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';

import { ContactBookComponent } from './contact-book.component';

describe('ContactBookComponent', () => {
  let component: ContactBookComponent;
  let fixture: ComponentFixture<ContactBookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContactBookComponent, ImageUrlPipe],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactBookComponent);
    component = fixture.componentInstance;
    component.contacts = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change searchControl', () => {
    component.searchControl.patchValue('Pepito');
    expect(component.searchControl.value).toEqual('Pepito');
  });

  it('should return true in visualControlContacts method', () => {
    component.contacts = [{ isFake: true }];
    expect(component.visualControlContacts).toBeTruthy();
  });

  it('should return false in visualControlContacts method', () => {
    component.contacts = [{ isFake: true }, {}];
    expect(component.visualControlContacts).toBeFalsy();
  });

  it('should return another false in visualControlContacts method', () => {
    component.contacts = [{}];
    expect(component.visualControlContacts).toBeFalsy();
  });

  it('should onContactClick', () => {
    expect(component.onContactClick).toBeDefined();
  });
});
