import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { StepEnrollmentType } from '@modules/auth/register/entities/register.interface';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { AuthStepsFacade } from '../../auth-steps.facade';
import { RegisteringDeviceComponent } from './registering-device.component';

describe('RegisteringDeviceComponent', () => {
  let component: RegisteringDeviceComponent;
  let fixture: ComponentFixture<RegisteringDeviceComponent>;
  let activatedRouteSpy;

  beforeEach(waitForAsync(() => {
    activatedRouteSpy = jasmine.createSpyObj(
      'ActivatedRoute',
      {},
      {
        snapshot: {
          data: {
            data: {
              data: {
                step: StepEnrollmentType.ONESPAN_ACTIVATE_LICENSE,
                enrollmentKey:
                  '0000C3E412D6878D9784177A00EB3F00253D2F2CFFAC67D2BFE8D34C1F82F38A69AE67D26F595ACCDC071013FBE0BC01A6621405DA64'
              },
              method: () => {
                return;
              }
            }
          }
        }
      }
    );

    TestBed.configureTestingModule({
      declarations: [RegisteringDeviceComponent, ImageUrlPipe],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteringDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call activateInstance()', () => {
    (
      Object.getOwnPropertyDescriptor(activatedRouteSpy, 'snapshot')?.get as any
    ).and.returnValue({
      data: {
        data: {
          data: {
            step: StepEnrollmentType.ONESPAN_ACTIVATE_INSTANCE,
            enrollmentKey:
              '0000C3E412D6878D9784177A00EB3F00253D2F2CFFAC67D2BFE8D34C1F82F38A69AE67D26F595ACCDC071013FBE0BC01A6621405DA64'
          },
          method: () => {
            return;
          }
        }
      }
    });
    expect(component.ngOnInit()).toBeUndefined();
  });
});
