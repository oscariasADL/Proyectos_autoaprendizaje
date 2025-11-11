import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { MediaActivationType } from '../../entities/security-media.interface';
import { ActivateProductSteps } from '../../store/security-media.state';
import { ActivateProductComponent } from './activate-product.component';
import { LinkKey } from '@app/commons/entities/parameters/links.entities';
import { HOME_PROMOTION_ALERT } from '@app/modules/home/constants/home.constants';

describe('ActivateProductComponent', () => {
  let component: ActivateProductComponent;
  let fixture: ComponentFixture<ActivateProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateProductComponent, ImageUrlPipe],
      imports: [
        IonicModule,
        TestingModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule
      ],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '' }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnDestroy and go home', () => {
    expect(component.ngOnDestroy()).toBeUndefined();
    fixture.ngZone.run(() => expect(component.goHome()).toBeUndefined());
  });

  it('should call nextStep', () => {
    component.message$.subscribe();
    component.successData$.subscribe();
    component.errorData$.subscribe();
    component.securityMediaType$.subscribe();
    component.passwordData$.subscribe();
    component.nextStep({
      step: '',
      data: { expirationDate: '09/24', cvc: '123' }
    });
    component.nextStep({ step: ActivateProductSteps.sendBlockProduct });
    component.nextStep({
      step: ActivateProductSteps.sendBlockTemporary,
      data: ''
    });
    expect(
      component.nextStep({
        step: ActivateProductSteps.activateProduct,
        data: {}
      })
    ).toBeUndefined();
  });

  it('should redirectHomePromotion', () => {
    expect((component as any).redirectHomePromotion()).toBeUndefined();
  });

  it('should get MediaActivationType', () => {
    expect(component.MediaActivationType.ActivateCard).toEqual(
      MediaActivationType.ActivateCard
    );
  });

  it('should call logout and redirectExternal when alertService returns a truthy confirm', fakeAsync(() => {
    spyOn(component['alertService'], 'create').and.returnValue(
      Promise.resolve(true)
    );
    // Setup spies on the facade's methods.
    spyOn((component as any).facade, 'logout');
    spyOn((component as any).facade, 'redirectExternal');
    component.redirectHomePromotion();
    tick();
    expect(component['alertService'].create).toHaveBeenCalledWith(
      HOME_PROMOTION_ALERT
    );
    expect((component as any).facade.logout).toHaveBeenCalled();
    expect((component as any).facade.redirectExternal).toHaveBeenCalledWith(
      LinkKey.linkPromotion
    );
  }));
});
