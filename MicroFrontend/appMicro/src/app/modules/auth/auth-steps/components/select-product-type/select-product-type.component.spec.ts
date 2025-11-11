import { SelectProductTypeComponent } from '@modules/auth/auth-steps/components/select-product-type/select-product-type.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TestingModule } from '@testing/testing.module';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SecureDataBriefProductType } from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('SelectProductTypeComponent', () => {
  let component: SelectProductTypeComponent;
  let fixture: ComponentFixture<SelectProductTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SelectProductTypeComponent, ImageUrlPipe],
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
                  title: 'Registro',
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

    fixture = TestBed.createComponent(SelectProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call run(typeProduct)', () => {
    expect(
      component.run(SecureDataBriefProductType.CREDIT_CARD)
    ).toBeUndefined();
  });
});
