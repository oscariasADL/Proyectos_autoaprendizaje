import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { SecurityNotificationsConfirmComponent } from './security-notifications-confirm.component';

describe('SecurityNotificationsConfirmComponent', () => {
  let component: SecurityNotificationsConfirmComponent;
  let fixture: ComponentFixture<SecurityNotificationsConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityNotificationsConfirmComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityNotificationsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
