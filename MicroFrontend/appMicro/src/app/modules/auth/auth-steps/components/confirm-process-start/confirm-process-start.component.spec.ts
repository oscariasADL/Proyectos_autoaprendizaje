import { ConfirmProcessStartComponent } from '@modules/auth/auth-steps/components/confirm-process-start/confirm-process-start.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TestingModule } from '@testing/testing.module';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';

describe('ConfirmProcessStartComponent', () => {
  let component: ConfirmProcessStartComponent;
  let fixture: ComponentFixture<ConfirmProcessStartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmProcessStartComponent, ImageUrlPipe],
      imports: [ReactiveFormsModule, TestingModule, IonicModule],
      providers: [
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: {
                  title: 'Olvidé contraseña',
                  data: {
                    processId: 'e86ddf5e-0e68-41e7-88cb-3327fc62afd0'
                  },
                  method: () => {
                    return;
                  }
                }
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmProcessStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should run', () => {
    spyOn(component, 'run').and.callThrough();
    component.run(true);
    expect(component.data).toEqual({
      processId: 'e86ddf5e-0e68-41e7-88cb-3327fc62afd0'
    } as AuthStepResponse);
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
