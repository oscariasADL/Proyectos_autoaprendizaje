import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MediaActivationType } from '@modules/security/security-media-activation/entities/security-media.interface';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { of } from 'rxjs';
import { SecurityMediaActivationFacade } from './security-media-activation.facade';
import { SecurityMediaActivationPage } from './security-media-activation.page';

describe('SecurityMediaActivationPage', () => {
  let component: SecurityMediaActivationPage;
  let fixture: ComponentFixture<SecurityMediaActivationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityMediaActivationPage],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityMediaActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should title be block temporary', (done) => {
    spyOnProperty(component, 'securityMediaType$').and.returnValue(
      of(MediaActivationType.BlockTemporary)
    );
    fixture.detectChanges();
    component.title$.subscribe((title) => {
      expect(title).toEqual('Bloquear temporalmente');
      done();
    });
  });

  it('should title be block card', (done) => {
    spyOnProperty(component, 'securityMediaType$').and.returnValue(
      of(MediaActivationType.BlockCard)
    );
    fixture.detectChanges();
    component.title$.subscribe((title) => {
      expect(title).toEqual('Bloqueo perdida o robo');
      done();
    });
  });

  it('should title be configure password', (done) => {
    spyOnProperty(component, 'securityMediaType$').and.returnValue(
      of(MediaActivationType.ConfigurePassword)
    );
    fixture.detectChanges();
    component.title$.subscribe((title) => {
      expect(title).toEqual('Configurar clave');
      done();
    });
  });

  it('should title be activate card', (done) => {
    spyOnProperty(component, 'securityMediaType$').and.returnValue(
      of(MediaActivationType.ActivateCard)
    );
    fixture.detectChanges();
    component.title$.subscribe((title) => {
      expect(title).toEqual('Configurar tarjetas');
      done();
    });
  });

  it('should title be temporary block', (done) => {
    spyOnProperty(component, 'securityMediaType$').and.returnValue(
      of(MediaActivationType.UnlockTemporary)
    );
    fixture.detectChanges();
    component.title$.subscribe((title) => {
      expect(title).toEqual('Bloqueo temporal');
      done();
    });
  });

  it('should title be preventative lock', (done) => {
    spyOnProperty(component, 'securityMediaType$').and.returnValue(
      of(MediaActivationType.UnlockPreventive)
    );
    fixture.detectChanges();
    component.title$.subscribe((title) => {
      expect(title).toEqual('Bloqueo preventivo');
      done();
    });
  });

  it('should title be unlock card', (done) => {
    spyOnProperty(component, 'securityMediaType$').and.returnValue(
      of(MediaActivationType.Unblock)
    );
    fixture.detectChanges();
    component.title$.subscribe((title) => {
      expect(title).toEqual('Desbloquear tarjeta');
      done();
    });
  });

  it('should return securityMediaType$', () => {
    expect(component.securityMediaType$).toBeDefined();
  });
});
