import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { ComplementaryServicesInfoComponent } from './complementary-services-info.component';

describe('ComplementaryServicesInfoComponent', () => {
  let component: ComplementaryServicesInfoComponent;
  let fixture: ComponentFixture<ComplementaryServicesInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComplementaryServicesInfoComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: AlertService, useValue: { create: async () => true } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementaryServicesInfoComponent);
    component = fixture.componentInstance;
    component.state = true;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nextStep()', () => {
    expect(component.nextStep()).toBeUndefined();
    component.state = false;
    expect(component.nextStep()).toBeUndefined();
  });
});
