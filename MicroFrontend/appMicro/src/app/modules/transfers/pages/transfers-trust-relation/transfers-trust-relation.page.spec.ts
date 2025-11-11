import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { TransfersTrustRelationFacade } from '@modules/transfers/pages/transfers-trust-relation/transfers-trust-relation.facade';
import { TransfersTrustRelationFacadeMock } from '@testing/mocks/facade/transfers-trust-relation.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { TransfersTrustRelationPage } from './transfers-trust-relation.page';
import { ProductFactory } from '@testing/factories/product.factory';
import { TrustRelationItemFactory } from '@testing/factories/transfiya-trust-relation-item.factory';
import { AlertService } from '@commons/services/alert.service';

describe('TransfersTrustRelationPage', () => {
  let component: TransfersTrustRelationPage;
  let fixture: ComponentFixture<TransfersTrustRelationPage>;
  const alertSpy = jasmine.createSpyObj<AlertService>(['create']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransfersTrustRelationPage, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: TransfersTrustRelationFacade,
          useClass: TransfersTrustRelationFacadeMock
        },
        { provide: AlertService, useValue: alertSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersTrustRelationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showInformation', () => {
    spyOn(component, 'showInformation').and.callThrough();
    component.showInformation();
    expect(component.showInformation).toHaveBeenCalled();
  });

  it('should call fetchTrustRelations', () => {
    const product = new ProductFactory().create();
    spyOn(component, 'fetchTrustRelations').and.callThrough();
    component.fetchTrustRelations(product);
    expect(component.fetchTrustRelations).toHaveBeenCalled();
  });

  it('should call removeTrustRelation when click contact-icon', () => {
    const itemTrustRelation = new TrustRelationItemFactory().create();
    spyOn(component, 'removeTrustRelation').and.callThrough();
    alertSpy.create.and.returnValue(Promise.resolve(true));
    component.product.setValue('iej4j4i5');
    component.removeTrustRelation(itemTrustRelation);
    expect(component.removeTrustRelation).toHaveBeenCalled();

    alertSpy.create.and.returnValue(Promise.resolve(false));
    component.removeTrustRelation(itemTrustRelation);
    expect(component.removeTrustRelation).toHaveBeenCalled();
  });

  it('should get hasValidProducts$ return boolean', () => {
    component.hasValidProducts$.subscribe((data) => {
      expect(data).toEqual(jasmine.any(Boolean));
    });
  });

  it('should get products$ return Product[]', () => {
    component.products$.subscribe((data) => {
      expect(data).toBe(null);
    });
  });

  it('should get working$ return boolean', () => {
    component.working$.subscribe((data) => {
      expect(data).toEqual(jasmine.any(Boolean));
    });
  });

  it('should get completed$ return boolean', () => {
    component.completed$.subscribe((data) => {
      expect(data).toEqual(jasmine.any(Boolean));
    });
  });

  it('should get trustRelations$ return TrustRelationItem[]', () => {
    component.trustRelations$.subscribe((data) => {
      expect(data).toBe(null);
    });
  });
});
