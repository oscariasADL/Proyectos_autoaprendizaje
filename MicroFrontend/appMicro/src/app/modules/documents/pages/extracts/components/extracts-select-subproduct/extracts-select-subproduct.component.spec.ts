import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { ExtractsSelectSubproductComponent } from './extracts-select-subproduct.component';
import { TestingModule } from '@testing/testing.module';
import { ExtractsFacade } from '@modules/documents/pages/extracts/extracts.facade';
import { ExtractsFacadeMock } from '@testing/mocks/facade/extracts.facade.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('ExtractsSelectSubproductComponent', () => {
  let component: ExtractsSelectSubproductComponent;
  let fixture: ComponentFixture<ExtractsSelectSubproductComponent>;
  const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractsSelectSubproductComponent],
      imports: [TestingModule, IonicModule],
      providers: [
        { provide: ExtractsFacade, useClass: ExtractsFacadeMock },
        {
          provide: NavController,
          useValue: navCtrlSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                typeProduct: '3'
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtractsSelectSubproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined products$', () => {
    expect(component.products$).toBeDefined();
  });

  it('should be defined params', () => {
    expect(component.params).toBeTruthy();
  });

  it('should be defined typeProductCategories', () => {
    expect(component.typeProductCategoriesTitles).toBeDefined();
  });
});
