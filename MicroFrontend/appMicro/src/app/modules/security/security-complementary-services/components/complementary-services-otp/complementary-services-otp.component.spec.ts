import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SecurityComplementaryServicesFacade } from '@modules/security/security-complementary-services/security-complementary-services.facade';
import { SecurityComplementaryServicesFacadeMock } from '@testing/mocks/facade/security-complementary-services.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { ComplementaryServicesOtpComponent } from './complementary-services-otp.component';

describe('ComplementaryServicesOtpComponent', () => {
  let component: ComplementaryServicesOtpComponent;
  let fixture: ComponentFixture<ComplementaryServicesOtpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComplementaryServicesOtpComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: SecurityComplementaryServicesFacade,
          useClass: SecurityComplementaryServicesFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementaryServicesOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the error message', (done) => {
    component.errorMessage$.subscribe((data) => {
      expect(data).toBeNull();
      done();
    });
  });
});
