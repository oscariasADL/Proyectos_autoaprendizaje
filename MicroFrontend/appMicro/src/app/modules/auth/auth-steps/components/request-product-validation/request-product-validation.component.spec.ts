import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { AuthStepsFacade } from '../../auth-steps.facade';
import { RequestProductValidationComponent } from './request-product-validation.component';

describe('RequestProductValidationComponent', () => {
  let component: RequestProductValidationComponent;
  let fixture: ComponentFixture<RequestProductValidationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RequestProductValidationComponent],
      imports: [TestingModule, IonicModule, ReactiveFormsModule],
      providers: [
        { provide: AuthStepsFacade, useClass: AuthStepsFacadeMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: {
                  data: { type: '' },
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

    fixture = TestBed.createComponent(RequestProductValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to run', () => {
    expect(component.run(true)).toBeUndefined();
  });
});
