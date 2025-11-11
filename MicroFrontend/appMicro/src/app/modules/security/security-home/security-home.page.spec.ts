import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AVAL_PRODUCTS } from '@commons/constants/navigate.constants';
import { BiometricService } from '@commons/services/biometric.service';
import { IonicModule, NavController } from '@ionic/angular';
import { SecurityHomeFacade } from '@modules/security/security-home/security-home.facade';
import { SecurityHomeFacadeMock } from '@testing/mocks/facade/security-home.facade.mock';
import { BiometricServiceMock } from '@testing/mocks/services/biometric.service.mock';
import { TestingModule } from '@testing/testing.module';
import { SecurityHomePage } from './security-home.page';
import { of } from 'rxjs';

describe('SecurityHomePage', () => {
  let component: SecurityHomePage;
  let fixture: ComponentFixture<SecurityHomePage>;

  const navCtrlSpy = jasmine.createSpyObj<NavController>(['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityHomePage],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: NavController,
          useValue: navCtrlSpy
        },
        {
          provide: SecurityHomeFacade,
          useClass: SecurityHomeFacadeMock
        },
        {
          provide: BiometricService,
          useClass: BiometricServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateTo and all gets', () => {
    component.biometricIconClass$.subscribe();
    component.hasBiometricRegistered$.subscribe();
    component.biometricText$.subscribe();
    fixture.ngZone.run(() => expect(component.navigateTo([])).toBeUndefined());
    fixture.ngZone.run(() =>
      expect(component.NAVIGATE.AVAL_PRODUCTS).toEqual(AVAL_PRODUCTS)
    );
  });

  it('should navigateToComplementaryServices error', () => {
    spyOnProperty(component, 'complementaryServicesError$').and.returnValue(
      of(true)
    );
    component.navigateToComplementaryServices();
    expect(component.navigateToComplementaryServices).toBeDefined();
  });

  it('should navigateToComplementaryServices', () => {
    spyOnProperty(component, 'complementaryServicesError$').and.returnValue(
      of(false)
    );
    component.navigateToComplementaryServices();
    expect(component.navigateToComplementaryServices).toBeDefined();
  });

  it('should return "Desactivar" in biometricText$', () => {
    spyOnProperty(component, 'hasBiometricRegistered$').and.returnValue(
      of(true)
    );
    const biometricService = TestBed.inject(BiometricService);
    spyOnProperty(biometricService, 'biometricText$').and.returnValue(
      of('Biometría')
    );

    component.biometricText$.subscribe((text) => {
      expect(text).toBe('Desactivar Biometría');
    });
  });
});
