import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { RegisteringDeviceErrorComponent } from './registering-device-error.component';

describe('RegisteringDeviceErrorComponent', () => {
  let component: RegisteringDeviceErrorComponent;
  let fixture: ComponentFixture<RegisteringDeviceErrorComponent>;
  let alertSpy;

  beforeEach(waitForAsync(() => {
    alertSpy = jasmine.createSpyObj('AlertService', ['create']);
    TestBed.configureTestingModule({
      declarations: [RegisteringDeviceErrorComponent, ImageUrlPipe],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: AlertService,
          useValue: alertSpy
        },
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteringDeviceErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToVirtualBanking()', () => {
    alertSpy.create.and.callFake(async () => true);
    window.open = () => window;
    fixture.ngZone.run(() =>
      expect(component.goToVirtualBanking()).toBeUndefined()
    );
  });
});
