import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

import { ComplementaryServicesFailedComponent } from './complementary-services-failed.component';

describe('ComplementaryServicesFailedComponent', () => {
  let component: ComplementaryServicesFailedComponent;
  let fixture: ComponentFixture<ComplementaryServicesFailedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComplementaryServicesFailedComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementaryServicesFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
