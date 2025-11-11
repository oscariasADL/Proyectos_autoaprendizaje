import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { ComplementaryServicesRequestInfoComponent } from './complementary-services-request-info.component';

describe('ComplementaryServicesRequestInfoComponent', () => {
  let component: ComplementaryServicesRequestInfoComponent;
  let fixture: ComponentFixture<ComplementaryServicesRequestInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComplementaryServicesRequestInfoComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(
      ComplementaryServicesRequestInfoComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
