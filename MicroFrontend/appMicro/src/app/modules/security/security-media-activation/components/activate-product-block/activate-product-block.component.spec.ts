import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FranchiseImagePipe } from '@commons/pipes/franchise-image.pipe';
import { IonicModule } from '@ionic/angular';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { ActivationProductFactory } from '@testing/factories/activation-product.factory';
import { SecurityMediaActivationFacadeMock } from '@testing/mocks/facade/security-media-activation.facade.mock';
import { ActivateProductBlockComponent } from './activate-product-block.component';
import { ShareFacade } from '@commons/components/share/share.facade';
import { ShareFacadeMock } from '@testing/mocks/facade/share.facade.mock';

describe('ActivateProductBlockComponent', () => {
  let component: ActivateProductBlockComponent;
  let fixture: ComponentFixture<ActivateProductBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateProductBlockComponent, FranchiseImagePipe],
      imports: [IonicModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useClass: SecurityMediaActivationFacadeMock
        },
        {
          provide: ShareFacade,
          useClass: ShareFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateProductBlockComponent);
    component = fixture.componentInstance;
    component.product = new ActivationProductFactory().create();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to call block product', () => {
    spyOn(component.continue, 'emit');
    component.blockProduct();
    expect(component.continue.emit).toHaveBeenCalled();
  });
});
