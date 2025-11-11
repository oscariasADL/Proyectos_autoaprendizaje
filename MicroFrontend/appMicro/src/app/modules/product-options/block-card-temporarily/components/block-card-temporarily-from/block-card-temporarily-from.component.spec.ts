import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { BlockCardTemporarilyFromComponent } from './block-card-temporarily-from.component';
import { FranchiseImagePipe } from '@commons/pipes/franchise-image.pipe';
import { TestingModule } from '@testing/testing.module';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { ActivationStatusDescription } from '@modules/security/security-media-activation/entities/security-media.interface';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';

describe('BlockCardTemporarilyFromComponent', () => {
  let component: BlockCardTemporarilyFromComponent;
  let fixture: ComponentFixture<BlockCardTemporarilyFromComponent>;
  let securityMediaActivationFacadeStub: Partial<SecurityMediaActivationFacade>;
  const mockProducts: any = [
    {
      id: '1',
      parentId: '1',
      status: ActivationStatusDescription.ACTIVE
    },
    {
      id: '2',
      parentId: '1',
      status: ActivationStatusDescription.TEMPORAL_BLOCK
    },
    {
      id: '3',
      parentId: '2',
      status: ActivationStatusDescription.ACTIVE
    }
  ];

  beforeEach(waitForAsync(() => {
    securityMediaActivationFacadeStub = {
      productList$: of(mockProducts),
      working$: of(false),
      digitalDebitCards$: of(null)
    };
    TestBed.configureTestingModule({
      declarations: [
        BlockCardTemporarilyFromComponent,
        FranchiseImagePipe,
        ImageUrlPipe
      ],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: SecurityMediaActivationFacade,
          useValue: securityMediaActivationFacadeStub
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockCardTemporarilyFromComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup<any>({
      activationProduct: new FormControl(null)
    });
    component.parentProductId = '1' as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the event continue when selecting a card', () => {
    spyOn(component.continue, 'emit');

    const mockProduct: any = {
      id: 1,
      parentId: 1,
      status: ActivationStatusDescription.ACTIVE
    };

    component.selectCard(mockProduct);

    expect(component.activationProduct.value).toEqual(mockProduct);
    expect(component.continue.emit).toHaveBeenCalled();
  });

  it('should emit the event unBlockProduct when selecting a card', () => {
    spyOn(component.unBlockProduct, 'emit');

    const mockProduct: any = {
      id: 1,
      parentId: 1,
      status: ActivationStatusDescription.TEMPORAL_BLOCK
    };

    component.selectCard(mockProduct);

    expect(component.activationProduct.value).toEqual(mockProduct);
    expect(component.unBlockProduct.emit).toHaveBeenCalled();
  });

  it('should filter the products correctly', () => {
    fixture.detectChanges();
    component.activationProducts.subscribe((products) => {
      expect(products.length).toBe(2);
    });
  });

  it('should return the value of workingSecurityMediaActivation', () => {
    component.workingSecurityMediaActivation$.subscribe((working) => {
      expect(working).toBeFalse();
    });
  });
});
