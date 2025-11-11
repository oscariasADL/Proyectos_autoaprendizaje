import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SecurityComplementaryServicesFacade } from '@modules/security/security-complementary-services/security-complementary-services.facade';
import { SecurityComplementaryServicesFacadeMock } from '@testing/mocks/facade/security-complementary-services.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { ComplementaryServicesType } from './entities/complementary-services.interface';
import { SecurityComplementaryServicesPage } from './security-complementary-services.page';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';

describe('SecurityComplementaryServicesPage', () => {
  let component: SecurityComplementaryServicesPage;
  let fixture: ComponentFixture<SecurityComplementaryServicesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityComplementaryServicesPage],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: SecurityComplementaryServicesFacade,
          useClass: SecurityComplementaryServicesFacadeMock
        },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityComplementaryServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change state', () => {
    expect(component.changeState(true)).toBeUndefined();
    expect(component.changeState(false)).toBeUndefined();
  });

  it('should call setComplementaryServicesStep', () => {
    expect(component.setComplementaryServicesStep(null)).toBeUndefined();
  });

  it('should call close and gets', () => {
    component.state$.subscribe();
    fixture.ngZone.run(() => expect(component.close()).toBeUndefined());
    expect(component.complementaryServicesType.ENABLE).toEqual(
      ComplementaryServicesType.ENABLE
    );
  });

  it('should toggleComplementaryServices', () => {
    expect(
      component.toggleComplementaryServices(ComplementaryServicesType.DISABLE)
    ).toBeDefined();
  });

  it('should toggleComplementaryServices enabled', () => {
    expect(
      component.toggleComplementaryServices(ComplementaryServicesType.ENABLE)
    ).toBeDefined();
  });

  it('should toggleComplementaryServices enabled otp', () => {
    expect(
      component.toggleComplementaryServices(
        ComplementaryServicesType.ENABLE,
        '234567890'
      )
    ).toBeDefined();
  });
});
